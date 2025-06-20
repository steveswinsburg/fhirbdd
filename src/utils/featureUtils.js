import fs from "fs";
import path from "path";

export function buildFeature({ template, replacements, scenarios }) {
  return Object.entries(replacements).reduce((acc, [key, val]) => {
    return acc.replace(new RegExp(`{{${key}}}`, "g"), val);
  }, template.replace(/{{SCENARIOS}}/g, scenarios.join("\n")));
}

export function buildScenario({ template, replacements }) {
  return Object.entries(replacements).reduce((acc, [key, val]) => {
    return acc.replace(new RegExp(`{{${key}}}`, "g"), val);
  }, template);
}

export function writeFeatureFile({ content, outputDir, fileName }) {
  const filePathOut = outputDir ? path.join(outputDir, fileName) : fileName;
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(filePathOut, content, { encoding: "utf-8" });
}