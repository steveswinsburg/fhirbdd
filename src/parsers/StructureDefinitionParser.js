import { buildScenario, buildFeature, writeFeatureFile } from "../utils/featureUtils.js";
import {
  mustSupportFeatureTemplate,
  mustSupportScenarioTemplate
} from "../templates/structureDefinitionTemplates.js";

// to allow for additional IG support, we map actors to their readable names
const actorMap = {
  "http://hl7.org.au/fhir/core/ActorDefinition/au-core-actor-requester": "AU Core Requester",
  "http://hl7.org.au/fhir/core/ActorDefinition/au-core-actor-responder": "AU Core Responder"
};

export function parseStructureDefinition(json, outputDir) {

  // eg AllergyIntolerance, MedicationRequest
  const resource = json.type;
  
  const mustSupportScenarios = extractMustSupportElements(json);

  writeFeatureFile({
    content: buildFeature({ template: mustSupportFeatureTemplate, replacements: { RESOURCE: resource }, scenarios: mustSupportScenarios }),
    outputDir,
    fileName: `${resource}-must-support.feature`
  });

  console.log(`Parsed StructureDefinition: ${resource}`);
  console.log(`- Must Support Elements: ${mustSupportScenarios.length}`);
}

function extractMustSupportElements(structureDef) {
  const resource = structureDef?.type;
  const name = structureDef?.name;
  const elements = structureDef?.snapshot?.element || [];

  const scenarios = [];

  for (const el of elements) {
    if (!el.mustSupport) continue;

    const id = el.id;

    const obligations = (el.extension || []).filter(ext =>
      ext.url === "http://hl7.org/fhir/StructureDefinition/obligation"
    );

    const expectations = [];

    for (const obligation of obligations) {
      const actorExt = obligation.extension.find(e => e.url === "actor");
      const codeExt = obligation.extension.find(e => e.url === "code");

      if (actorExt && codeExt) {
        const actorCanonical = actorExt.valueCanonical;
        const actor = actorMap[actorCanonical] || actorCanonical;

        expectations.push({
          actor,
          expectation: codeExt.valueCode
        });
      }
    }

    if (expectations.length === 0) {
      expectations.push({ actor: "Server", expectation: "SHALL" });
    }

    for (const { actor, expectation } of expectations) {
      scenarios.push(
        buildScenario({
          template: mustSupportScenarioTemplate,
          replacements: {
            ACTOR: actor,
            ELEMENT_ID: id,
            RESOURCE: resource,
            EXPECTATION: expectation
          }
        })
      );
    }
  }

  return scenarios;

}