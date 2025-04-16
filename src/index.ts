import fs from "fs";
import path from "path";
import tar from "tar";
import tmp from "tmp";
import { parseStructureDefinition } from "./lib/parsers/structureDefinitionParser";
import { parseCapabilityStatement } from "./lib/parsers/capabilityStatementParser";
import { parseSearchParameter } from "./lib/parsers/searchParameterParser";

export function run(options: { ig?: string; output?: string }) {
  if (!options.ig) {
    console.error("Error: --ig <path> is required.");
    process.exit(1);
  }

  const tgzPath = path.resolve(options.ig);
  if (!fs.existsSync(tgzPath)) {
    console.error(`Error: file not found at ${tgzPath}`);
    process.exit(1);
  }

  const tmpDir = tmp.dirSync({ unsafeCleanup: true });
  console.log(`📦 Extracting IG package to: ${tmpDir.name}`);

  tar.x({
    file: tgzPath,
    cwd: tmpDir.name,
    sync: true,
    strict: true
  });

  console.log("✅ Extraction complete. Scanning files...");

  const packageDir = path.join(tmpDir.name, "package");
  const files = fs.readdirSync(packageDir);

  for (const file of files) {
    const filePath = path.join(packageDir, file);
    if (file.startsWith("StructureDefinition") && file.endsWith(".json")) {
      parseStructureDefinition(filePath);
    } else if (file.startsWith("CapabilityStatement") && file.endsWith(".json")) {
      parseCapabilityStatement(filePath, options.output);
    } else if (file.startsWith("SearchParameter") && file.endsWith(".json")) {
      parseSearchParameter(filePath);
    } else {
      console.log(`⏩ Skipping unrelated file: ${file}`);
    }
  }
}