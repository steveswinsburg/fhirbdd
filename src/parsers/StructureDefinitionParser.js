import { buildScenario, buildFeature, writeFeatureFile } from "../utils/featureUtils.js";
import {
  mustSupportFeatureTemplate,
  mustSupportScenarioWithObligationsTemplate,
  mustSupportScenarioWithoutObligationsTemplate
} from "../templates/structureDefinitionTemplates.js";

const actorMap = {
  "http://hl7.org.au/fhir/core/ActorDefinition/au-core-actor-requester": "Requester",
  "http://hl7.org.au/fhir/core/ActorDefinition/au-core-actor-responder": "Responder",
  "http://hl7.org/fhir/uv/ips/ActorDefinition/Producer": "Producer",
  "http://hl7.org/fhir/uv/ips/ActorDefinition/Consumer": "Consumer"
  // Add additional actors here
};

export function parseStructureDefinition(json, outputDir) {
  const name = json.name;
  const scenarioGroups = extractMustSupportElements(json);

  for (const [actor, scenarios] of Object.entries(scenarioGroups)) {
    writeFeatureFile({
      content: buildFeature({
        template: mustSupportFeatureTemplate,
        replacements: { RESOURCE: name },
        scenarios
      }),
      outputDir,
      fileName: `${name}-${actor.replace(/ /g, "_")}-must-support.feature`
    });

    console.log(`- ${actor} must supports: ${scenarios.length}`);
  }
}

function extractMustSupportElements(json) {
  const resource = json?.type;
  const elements = json?.snapshot?.element || [];

  const scenarioGroups = {}; // actor => [scenarios]

  for (const el of elements) {
    if (!el.mustSupport) continue;

    const id = el.id;
    const obligations = (el.extension || []).filter(
      (ext) => ext.url === "http://hl7.org/fhir/StructureDefinition/obligation"
    );

    let matched = false;

    for (const obligation of obligations) {
      const actorExt = obligation.extension.find((e) => e.url === "actor");
      const codeExt = obligation.extension.find((e) => e.url === "code");

      // Ensure both actor and code extensions are present  
      if (actorExt && codeExt) {
        const actorCanonical = actorExt.valueCanonical;
        const actor = actorMap[actorCanonical] || actorCanonical;

        const scenario = buildScenario({
          template: mustSupportScenarioWithObligationsTemplate,
          replacements: {
            ACTOR: actor,
            ELEMENT_ID: id,
            RESOURCE: resource,
            OBLIGATION: codeExt.valueCode
          }
        });

        scenarioGroups[actor] ??= [];
        scenarioGroups[actor].push(scenario);
        matched = true;
      }
    }

    // If no obligations matched, create a fallback scenario
    if (!matched && obligations.length === 0) {
      const fallbackActor = "System";
      const scenario = buildScenario({
        template: mustSupportScenarioWithoutObligationsTemplate,
        replacements: {
          ACTOR: fallbackActor,
          ELEMENT_ID: id,
          RESOURCE: resource
        }
      });

      scenarioGroups[fallbackActor] ??= [];
      scenarioGroups[fallbackActor].push(scenario);
    }
  }

  return scenarioGroups;
}
