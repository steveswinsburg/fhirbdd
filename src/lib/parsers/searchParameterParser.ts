import fs from "fs";

export function parseSearchParameter(filePath: string): void {
  console.log(`🔍 Parsing SearchParameter: ${filePath}`);
  const content = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(content);
  // TODO: Process the SearchParameter JSON
}