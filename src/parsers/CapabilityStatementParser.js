import fhirpath from "fhirpath";
import { buildScenario, buildFeature, writeFeatureFile } from "../utils/featureUtils.js";
import {
  resourceFeatureTemplate,
  interactionFeatureTemplate,
  searchParamFeatureTemplate,
  systemInteractionFeatureTemplate,
  resourceScenarioTemplate,
  interactionScenarioTemplate,
  searchParamScenarioTemplate,
  searchParamCombinationScenarioTemplate,
  systemInteractionScenarioTemplate
} from "../templates/capabilityStatementTemplates.js";
import capitalize from "capitalize";

export function parseCapabilityStatement(json, outputDir) {
  for (const rest of json.rest || []) {
    const role = capitalize.words(rest.mode);

    const resourceScenarios = extractResourceExpectations(rest, role);
    const interactionScenarios = extractInteractionExpectations(rest, role);

    const searchParamScenarios = extractSearchParamExpectations(rest, role);
    const combinationSearchParamScenarios = extractCombinationSearchParamExpectations(rest, role);

    const systemInteractionScenarios = extractSystemInteractionExpectations(rest, role);

    // Resource features
    writeFeatureFile({
      content: buildFeature({ template: resourceFeatureTemplate, replacements: { ROLE: role }, scenarios: resourceScenarios }),
      outputDir,
      fileName: `${role}-resources.feature`
    });

    // Interaction features
    writeFeatureFile({
      content: buildFeature({ template: interactionFeatureTemplate, replacements: { ROLE: role }, scenarios: interactionScenarios }),
      outputDir,
      fileName: `${role}-interactions.feature`
    });

    // Search param features
    const allScenarios = [
      ...searchParamScenarios,
      ...combinationSearchParamScenarios
    ];

    writeFeatureFile({
      content: buildFeature({
        template: searchParamFeatureTemplate,
        replacements: { ROLE: role },
        scenarios: allScenarios
      }),
      outputDir,
      fileName: `${role}-search-params.feature`
    });

    // System interaction features
    writeFeatureFile({
      content: buildFeature({
        template: systemInteractionFeatureTemplate,
        replacements: { ROLE: role },
        scenarios: systemInteractionScenarios
      }),
      outputDir,
      fileName: `${role}-system-interactions.feature`
    });

    console.log(`Parsed ${role} capabilities:`);
    console.log(`- Resources: ${resourceScenarios.length}`);
    console.log(`- Interactions: ${interactionScenarios.length}`);
    console.log(`- Search Params: ${searchParamScenarios.length}`);
    console.log(`- Combination Search Params: ${combinationSearchParamScenarios.length}`);
    console.log(`- System Interactions: ${systemInteractionScenarios.length}`);

  }
}

function extractResourceExpectations(rest, role) {
  const scenarios = [];

  for (const resource of rest.resource || []) {
    const expectation = getExpectation(resource);
    if (!expectation) continue;

    const replacements = {
      ROLE: role,
      RESOURCE_TYPE: resource.type,
      EXPECTATION: expectation
    };
    scenarios.push(buildScenario({ template: resourceScenarioTemplate, replacements }));
  }

  return scenarios;
}

function extractInteractionExpectations(rest, role) {
  const scenarios = [];

  for (const resource of rest.resource || []) {
    for (const interaction of resource.interaction || []) {
      const expectation = getExpectation(interaction);
      if (!expectation) continue;

      const replacements = {
        ROLE: role,
        RESOURCE_TYPE: resource.type,
        INTERACTION_TYPE: interaction.code,
        EXPECTATION: expectation
      };
      scenarios.push(buildScenario({ template: interactionScenarioTemplate, replacements }));
    }
  }

  return scenarios;
}

function extractSearchParamExpectations(rest, role) {
  const scenarios = [];

  for (const resource of rest.resource || []) {
    for (const searchParam of resource.searchParam || []) {
      const expectation = getExpectation(searchParam);
      if (!expectation) continue;

      const replacements = {
        ROLE: role,
        RESOURCE_TYPE: resource.type,
        SEARCH_PARAM: searchParam.name,
        EXPECTATION: expectation
      };
      scenarios.push(buildScenario({ template: searchParamScenarioTemplate, replacements }));
    }
  }

  return scenarios;
}

function extractCombinationSearchParamExpectations(rest, role) {
  const scenarios = [];

  for (const resource of rest.resource || []) {
    
    const combinations = resource.extension?.filter(
      (ext) => ext.url === "http://hl7.org/fhir/StructureDefinition/capabilitystatement-search-parameter-combination"
    ) || [];

    for (const combo of combinations) {
      const expectation = combo.extension?.find(
        (e) => e.url === "http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation"
      )?.valueCode;

      if (!expectation) continue;

      const requiredParams = combo.extension
        .filter((e) => e.url === "required")
        .map((e) => e.valueString);

      const replacements = {
        ROLE: role,
        RESOURCE_TYPE: resource.type,
        EXPECTATION: expectation,
        COMBINED_PARAMS: requiredParams.join(", ")
      };

      scenarios.push(buildScenario({ template: searchParamCombinationScenarioTemplate, replacements }));
    }
  }

  return scenarios;
}

function extractSystemInteractionExpectations(rest, role) {
  const scenarios = [];

  for (const interaction of rest.interaction || []) {
    const expectation = getExpectation(interaction);
    if (!expectation) continue;

    const replacements = {
      ROLE: role,
      INTERACTION_TYPE: interaction.code,
      EXPECTATION: expectation
    };

    scenarios.push(buildScenario({
      template: systemInteractionScenarioTemplate,
      replacements
    }));
  }

  return scenarios;
}

function getExpectation(obj) {
  const result = fhirpath.evaluate(
    obj,
    "extension.where(url = 'http://hl7.org/fhir/StructureDefinition/capabilitystatement-expectation').valueCode"
  );
  return result.length > 0 ? result[0] : null;
}

