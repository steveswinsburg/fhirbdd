import fs from "fs";
import path from "path";
import tar from "tar";
import tmp from "tmp";

import { handle } from "./parsers/ParserHandler.js";


export function run({ ig: tgzPath, output: outputDir }) {

  if (!fs.existsSync(tgzPath)) {
    console.error(`Error: IG package not found at ${tgzPath}`);
    process.exit(1);
  }

  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  console.log("Extracting IG package...");

  tar.x({
    file: tgzPath,
    cwd: tmpDir.name,
    sync: true,
    strict: true,
  });

  console.log("Scanning files...");

  const packageDir = path.join(tmpDir.name, "package");
  const files = fs.readdirSync(packageDir);

  for (const file of files) {

    if (!file.endsWith(".json")) continue; // Only process .json files

    const fullPath = path.join(packageDir, file);
   
    handle(fullPath, outputDir);

  }

  console.log("Processing finished.");
}
