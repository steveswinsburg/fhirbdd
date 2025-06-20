import fs from "fs";
import path from "path";

import { resolveLocalTgz, resolveRemoteTgz, extractTgz } from "./utils/FileUtils.js"
import { handle } from "./parsers/ParserHandler.js";

export async function run(options) {

  if (!options.file && !options.url) {
    console.error("Must provide either --file or --url");
    process.exit(1);
  }

  let tgzPath;
  if(options.file) {
    console.log("Using local FHIR IG package...");
    tgzPath = await resolveLocalTgz(options.file);
    console.log(`Using local file: ${tgzPath}`);
  }

  if(options.url) {
    console.log("Downloading remote FHIR IG package...");
    tgzPath = await resolveRemoteTgz(options.url);
    console.log(`Downloaded to: ${tgzPath}`);
  }

  console.log("Extracting IG package...");
  const tmpDir = extractTgz(tgzPath);

  console.log("Scanning files...");
  const packageDir = path.join(tmpDir.name, "package");
  const files = fs.readdirSync(packageDir);

  for (const file of files) {
    if (!file.endsWith(".json")) continue; // Only process .json files
    const fullPath = path.join(packageDir, file);
    handle(fullPath, options.output);
  }

  console.log("Processing finished.");
  tmpDir.removeCallback(); 

}
