import fs from "fs";
import path from "path";

import { parseStructureDefinition } from "./StructureDefinitionParser.js";
import { parseCapabilityStatement } from "./CapabilityStatementParser.js";
import { parseSearchParameter } from "./SearchParameterParser.js";

export function handle(filePath, outputDir = ".") {
    
    console.log(`Parsing file: ${path.basename(filePath)}`);

    const content = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(content); 

    if (json.resourceType === "StructureDefinition") {
        parseStructureDefinition(json, outputDir);
    } else if (json.resourceType === "CapabilityStatement") {
        parseCapabilityStatement(json, outputDir);
    } else if (json.resourceType === "SearchParameter") {
        parseSearchParameter(json, outputDir);
    } else {
        //console.log(`Skipping unrelated file: ${file}`);
    }

}