const toJsonSchema = require("@openapi-contrib/openapi-schema-to-json-schema");
const fs = require("fs");

const spec = require("./api_docs/api-v1.json");

const fullSchema = toJsonSchema(spec);

Object.entries(fullSchema.components.schemas).forEach(([name, schema]) => {
  fs.writeFileSync(
    `lib/endpoints/schema/${name}.json`,
    JSON.stringify(schema, null, 2),
  );
});
