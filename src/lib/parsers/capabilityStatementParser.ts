import fs from "fs";
import path from "path";
import capitalize from "capitalize";
import {
  resourceFeatureTemplate,
  resourceRequesterScenarioTemplate,
  resourceResponderScenarioTemplate,
  interactionFeatureTemplate,
  interactionRequesterScenarioTemplate,
  interactionResponderScenarioTemplate,
  searchParamFeatureTemplate,
  searchParamRequesterScenarioTemplate,
  searchParamResponderScenarioTemplate
} from "../templates/capabilityStatementTemplates";
import {
  buildScenario,
  buildFeature,
  writeFeatureFile
} from "../utils/featureUtils";

function extractResourceExpectations(json: any, role: string, type: "requester" | "responder"): string[] {
  const scenarios: string[] = [];
  const scenarioTemplate = type === "requester" ? resourceRequesterScenarioTemplate : resourceResponderScenarioTemplate;


  for (const rest of json.rest || []) {
    for (const resource of rest.resource || []) {
      const resourceType = resource.type;
      for (const ext of resource.extension || []) {
        if (ext.url === "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation") {
          const expectation = ext.valueCode;

          const scenario = buildScenario({
            template: scenarioTemplate,
            replacements: {
              ROLE: role,
              EXPECTATION: expectation,
              RESOURCE_TYPE: resourceType
            }
          });

          scenarios.push(scenario);
        }
      }
    }
  }

  return scenarios;
}

function extractInteractionExpectations(json: any, role: string, type: "requester" | "responder"): string[] {
  const scenarios: string[] = [];
  const scenarioTemplate = type === "requester" ? interactionRequesterScenarioTemplate : interactionResponderScenarioTemplate;

  for (const rest of json.rest || []) {
    for (const resource of rest.resource || []) {
      const resourceType = resource.type;
      for (const interaction of resource.interaction || []) {
        const expectationExtension = (interaction.extension || []).find(
          (ext: any) => ext.url === "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation"
        );

        if (expectationExtension && interaction.code) {
          const expectation = expectationExtension.valueCode;
          const interactionCode = interaction.code;

          const scenario = buildScenario({
            template: scenarioTemplate,
            replacements: {
              ROLE: role,
              EXPECTATION: expectation,
              INTERACTION_TYPE: interactionCode,
              RESOURCE_TYPE: resourceType
            }
          });

          scenarios.push(scenario);
        }
      }
    }
  }

  return scenarios;
}

function extractSearchParameterExpectations(json: any, role: string, type: "requester" | "responder"): string[] {
  const scenarios: string[] = [];
  const scenarioTemplate = type === "requester" ? searchParamRequesterScenarioTemplate : searchParamResponderScenarioTemplate;

  for (const rest of json.rest || []) {
    for (const resource of rest.resource || []) {
      const resourceType = resource.type;
      for (const param of resource.searchParam || []) {
        const ext = (param.extension || []).find(
          (e: any) => e.url === "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation"
        );

        if (ext && param.name) {
          const scenario = buildScenario({
            template: scenarioTemplate,
            replacements: {
              ROLE: role,
              EXPECTATION: ext.valueCode,
              RESOURCE_TYPE: resourceType,
              SEARCH_PARAM: param.name
            }
          });
          scenarios.push(scenario);
        }
      }
    }
  }

  return scenarios;
}

function generateAndWriteFeature({
  role,
  scenarios,
  template,
  outputDir,
  fileName
}: {
  role: string;
  scenarios: string[];
  template: string;
  outputDir?: string;
  fileName: string;
}): void {
  if (scenarios.length === 0) return;

  const feature = buildFeature({
    template,
    replacements: {
      ROLE: role
    },
    scenarios
  });

  writeFeatureFile({
    content: feature,
    outputDir,
    fileName
  });
}

export function parseCapabilityStatement(filePath: string, outputDir?: string): void {
  console.log(`📗 Parsing CapabilityStatement: ${filePath}`);
  const content = fs.readFileSync(filePath, "utf-8");
  const json = JSON.parse(content);
  const rawRole = filePath.includes("requester") ? "requester" : "responder";
  const role = capitalize(rawRole);
  const type = rawRole === "requester" ? "requester" : "responder";

  const resourceScenarios = extractResourceExpectations(json, role, type);
  const interactionScenarios = extractInteractionExpectations(json, role, type);
  const searchParamScenarios = extractSearchParameterExpectations(json, role, type);

  generateAndWriteFeature({
    role,
    scenarios: resourceScenarios,
    template: resourceFeatureTemplate,
    outputDir,
    fileName: `${role}_supports_resources.feature`.replace(/\s+/g, "_").toLowerCase()
  });

  generateAndWriteFeature({
    role,
    scenarios: interactionScenarios,
    template: interactionFeatureTemplate,
    outputDir,
    fileName: `${role}_supports_interactions.feature`.replace(/\s+/g, "_").toLowerCase()
  });

  generateAndWriteFeature({
    role,
    scenarios: searchParamScenarios,
    template: searchParamFeatureTemplate,
    outputDir,
    fileName: `${role}_supports_search_parameters.feature`.replace(/\s+/g, "_").toLowerCase()
  });
}
