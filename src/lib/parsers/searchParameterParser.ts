import fs from "fs";
import path from "path";

export function parseSearchParameter(filePath: string): void {
    console.log(`Parsing SearchParameter: ${path.basename(filePath)}`);
  
  const content = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(content);
  // TODO: Process the SearchParameter JSON
}