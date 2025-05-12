import fs from "fs";
import path from "path";

interface FeatureBuildOptions {
  template: string;
  replacements: Record<string, string>;
  scenarios: string[];
}

interface ScenarioBuildOptions {
  template: string;
  replacements: Record<string, string>;
}

export function buildFeature({
  template,
  replacements,
  scenarios
}: FeatureBuildOptions): string {
  return Object.entries(replacements).reduce((acc, [key, val]) => {
    return acc.replace(new RegExp(`{{${key}}}`, "g"), val);
  }, template.replace(/{{SCENARIOS}}/g, scenarios.join("\n")));
}

export function buildScenario({
  template,
  replacements
}: ScenarioBuildOptions): string {
  return Object.entries(replacements).reduce((acc, [key, val]) => {
    return acc.replace(new RegExp(`{{${key}}}`, "g"), val);
  }, template);
}

export function writeFeatureFile({
  content,
  outputDir,
  fileName
}: {
  content: string;
  outputDir?: string;
  fileName: string;
}): void {
  const filePathOut = outputDir ? path.join(outputDir, fileName) : fileName;

  const dirPath = path.dirname(filePathOut);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(filePathOut, content, "utf-8");
  console.log(`Wrote feature file: ${filePathOut}`);
}

