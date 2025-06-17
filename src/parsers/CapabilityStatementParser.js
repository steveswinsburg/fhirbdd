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
} from "../templates/capabilityStatementTemplates.js";

import {
  buildScenario,
  buildFeature,
  writeFeatureFile
} from "../utils/featureUtils.js";

function extractResourceExpectations(json, role, type) {
  const scenarios = [];
  const scenarioTemplate = type === "requester"
    ? resourceRequesterScenarioTemplate
    : resourceResponderScenarioTemplate;

  for (const rest of json.rest || []) {
    for (const resource of rest.resource || []) {
      const resourceType = resource.type;
      for (const ext of resource.extension || []) {
        if (ext.url === "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation") {
          const expectation = ext.valueCode;
          scenarios.push(
            buildScenario({
              template: scenarioTemplate,
              replacements: { ROLE: role, RESOURCE_TYPE: resourceType, EXPECTATION: expectation }
            })
          );
        }
      }
    }
  }

  return scenarios;
}

function extractInteractionExpectations(json, role, type) {
  const scenarios = [];
  const scenarioTemplate = type === "requester"
    ? interactionRequesterScenarioTemplate
    : interactionResponderScenarioTemplate;

  for (const rest of json.rest || []) {
    for (const resource of rest.resource || []) {
      const resourceType = resource.type;
      for (const interaction of resource.interaction || []) {
        for (const ext of interaction.extension || []) {
          if (ext.url === "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation") {
            const expectation = ext.valueCode;
            scenarios.push(
              buildScenario({
                template: scenarioTemplate,
                replacements: {
                  ROLE: role,
                  RESOURCE_TYPE: resourceType,
                  INTERACTION_TYPE: interaction.code,
                  EXPECTATION: expectation
                }
              })
            );
          }
        }
      }
    }
  }

  return scenarios;
}

function extractSearchParamExpectations(json, role, type) {
  const scenarios = [];
  const scenarioTemplate = type === "requester"
    ? searchParamRequesterScenarioTemplate
    : searchParamResponderScenarioTemplate;

  for (const rest of json.rest || []) {
    for (const resource of rest.resource || []) {
      const resourceType = resource.type;
      for (const param of resource.searchParam || []) {
        for (const ext of param.extension || []) {
          if (ext.url === "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation") {
            const expectation = ext.valueCode;
            scenarios.push(
              buildScenario({
                template: scenarioTemplate,
                replacements: {
                  ROLE: role,
                  RESOURCE_TYPE: resourceType,
                  SEARCH_PARAM: param.name,
                  EXPECTATION: expectation
                }
              })
            );
          }
        }
      }
    }
  }

  return scenarios;
}

export function parseCapabilityStatement(json, outputDir) {
  for (const rest of json.rest || []) {
    const role = capitalize.words(rest.mode);
    const resources = extractResourceExpectations(json, role, rest.mode);
    const interactions = extractInteractionExpectations(json, role, rest.mode);
    const searchParams = extractSearchParamExpectations(json, role, rest.mode);

    writeFeatureFile({
      content: buildFeature({ template: resourceFeatureTemplate, replacements: { ROLE: role }, scenarios: resources }),
      outputDir,
      fileName: `${role}-resources.feature`
    });

    writeFeatureFile({
      content: buildFeature({ template: interactionFeatureTemplate, replacements: { ROLE: role }, scenarios: interactions }),
      outputDir,
      fileName: `${role}-interactions.feature`
    });

    writeFeatureFile({
      content: buildFeature({ template: searchParamFeatureTemplate, replacements: { ROLE: role }, scenarios: searchParams }),
      outputDir,
      fileName: `${role}-search-params.feature`
    });
  }
}