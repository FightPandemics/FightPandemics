const toJsonSchema = require("@openapi-contrib/openapi-schema-to-json-schema");
const yaml = require("js-yaml");
const fs = require("fs");

try {
  const spec = yaml.safeLoad(fs.readFileSync("./api_docs/api-v1.yaml", "utf8"));
  const fullSchema = toJsonSchema(spec);
  Object.entries(fullSchema.components.schemas).forEach(([name, schema]) => {
    fs.writeFileSync(
      `lib/endpoints/schema/${name}.json`,
      JSON.stringify(schema, null, 2),
    );
  });
} catch (error) {
  console.error({ error });
}
