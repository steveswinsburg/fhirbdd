#!/usr/bin/env node
import { Command } from "commander";
import { run } from "./index";

const program = new Command();

program
  .name("firebed")
  .description("Generate BDD tests from FHIR Implementation Guides")
  .version("0.1.0")
  .option("--ig <path>", "Path to FHIR IG package (.tgz file)")
  .option("--output <dir>", "Output directory for feature files")
  .action((opts) => {
    run(opts);
  });

program.parse(process.argv);
