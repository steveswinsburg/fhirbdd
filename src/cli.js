#!/usr/bin/env node
import { Command } from "commander";
import { run } from "./main.js";

const program = new Command();

program
  .name("fhirbdd")
  .description("Generate BDD feature files from FHIR Implementation Guides")
  .version("0.1.0")
  .option("--file <path>", "Path to local FHIR IG package .tgz file")
  .option('--url <url>', 'URL to remote FHIR IG package .tgz file')
  .option("--output <dir>", "Output directory for feature files")
  .action(run);

program.parse();
