import Airtable from "airtable";

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
});

const airtableBase = Airtable.base(process.env.REACT_APP_AIRTABLE_BASE);
const defaultTableOptions = {
  view: "Grid view",
};

export const getTable = (tableName, tableOptions = defaultTableOptions) => {
  return airtableBase(tableName).select(tableOptions);
};

export const getAirtableRecord = (searchKey, column, tableName = "Table 1") => {
  const tableOptions = {
    view: "Grid view",
    pageSize: 1,
    filterByFormula: `FIND("${searchKey}", {${column}})`,
  };

  const table = getTable(tableName, tableOptions);
  return new Promise((resolve, reject) => {
    table.firstPage((err, records) => {
      if (err) reject(new Error(err));
      resolve(records?.length ? records[0] : null);
    });
  });
};
