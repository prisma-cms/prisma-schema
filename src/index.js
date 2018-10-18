 

import fs from "fs";

const { parse, print } = require('graphql');

// const core = new CoreModule();


const generateSchema = function (schemaType, coreModule) {

  let schema;

  let basePath = process.cwd();

  // console.log("generateSchema basePath", basePath);

  switch (schemaType) {

    case "prisma":

      schema = coreModule.getSchema();
 

      const parsed = parse(schema);

      parsed.definitions = parsed.definitions.filter(
        n => n.kind !== "SchemaDefinition" && !(
          n.kind === "ObjectTypeDefinition" && ["Query", "Mutation", "Subscription"].indexOf(n.name.value) !== -1)
      );

      schema = print(parsed);

      fs.writeFileSync(basePath + "/src/schema/prisma/generated.graphql", schema);

      break;


    case "api":

      schema = coreModule.getApiSchema();

      fs.writeFileSync(basePath + "/src/schema/generated/api.graphql", schema);


      break;

    default: throw new Error("Env schemaType is wrong or not defined");

  }


  return schema;

}

export default generateSchema;
