/* eslint-disable no-console */

const mongoose = require("mongoose");
const Airtable = require("airtable");
require("dotenv").config();

const {
  config: { mongo, airtable },
} = require("../../config");
const { schema: postSchema } = require("../../lib/models/Post");
const mapAirtableData = require("./map-airtable-data");
const initSourcedByFpUsers = require("./init-sourced-by-fp-users");

const POSTS_AIRTABLE_NAME = "Posts";
const DEFAULT_MAX_RECORDS = 100;

/* TODO: consider library (commander, yargs)
  For now single positional arg to control records fetched:
    a) all records: 'npm run import-posts -- -1';
    b) specify X >= 1: 'npm run import-posts -- X';
    c) default: 'npm run import-posts' */
const parseMaxRecordsArg = () => {
  const maxRecordsArg = process.argv[2];
  return parseInt(maxRecordsArg, 10) || DEFAULT_MAX_RECORDS;
};

const importPostsFromAirtable = async (connection, fpOrgsByType) => {
  const start = Date.now();

  const base = new Airtable({
    apiKey: airtable.apiKey,
  }).base(airtable.baseId);

  const Post = connection.model("Post", postSchema);
  let failedPosts = 0;

  const selectOptions = { maxRecords: parseMaxRecordsArg() };
  const records = await base(POSTS_AIRTABLE_NAME).select(selectOptions).all(); // ~8-9s to get from Airtable ~2500 posts; ~2-3s to bulk write to mongo (locally on docker network)

  const bulkOps = [];
  const postsUpdatedAt = new Date(); // for consistent timestamp
  records.forEach((record) => {
    try {
      const postData = mapAirtableData(record._rawJson, fpOrgsByType);
      postData.updatedAt = postsUpdatedAt;

      // bulk write does not perform validation; only include posts that pass validate
      const validationError = new Post(postData).validateSync();
      if (validationError) {
        throw new Error(JSON.stringify(validationError.errors));
      }

      bulkOps.push({
        updateOne: {
          filter: { airtableId: record.id },
          setDefaultsOnInsert: true, // to set likes empty array etc
          update: postData,
          upsert: true,
        },
      });
    } catch (err) {
      failedPosts += 1;
      console.error(
        `${record.id} failed mapping/validation. Error message: ${
          err.message
        }. Record fields: ${JSON.stringify(record._rawJson.fields)}.`,
      );
    }
  });

  try {
    const bulkWriteOpResult = await Post.bulkWrite(bulkOps);
    const { nUpserted, nModified } = bulkWriteOpResult;
    const end = Date.now();
    console.log(
      `Imported ${nUpserted + nModified} from Airtable in ${
        (end - start) / 1000
      }s. Inserted ${nUpserted} new posts; updated ${nModified} existing posts. ${failedPosts} posts failed to import.`,
    );
  } catch (err) {
    console.error(`Bulk write failed. Error message: ${err.message}`);
  }
};

(async () => {
  const connection = await mongoose.createConnection(mongo.uri, mongo.params);
  try {
    const fpOrgsByType = await initSourcedByFpUsers(connection);
    await importPostsFromAirtable(connection, fpOrgsByType);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
