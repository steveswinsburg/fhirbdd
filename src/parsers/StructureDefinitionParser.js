import { buildScenario, buildFeature, writeFeatureFile } from "../utils/featureUtils.js";
import {
  mustSupportFeatureTemplate,
  mustSupportScenarioWithObligationsTemplate,
  mustSupportScenarioWithoutObligationsTemplate
} from "../templates/structureDefinitionTemplates.js";

// Actor map used to convert canonical URLs to display names for actors
const actorMap = {
  "http://hl7.org.au/fhir/core/ActorDefinition/au-core-actor-requester": "AU Core Requester",
  "http://hl7.org.au/fhir/core/ActorDefinition/au-core-actor-responder": "AU Core Responder",
  "http://hl7.org/fhir/uv/ips/ActorDefinition/Producer": "AU PS Producer",
  "http://hl7.org/fhir/uv/ips/ActorDefinition/Consumer": "AU PS Consumer",
  "http://hl7.org.au/fhir/ereq/ActorDefinition/au-erequesting-actor-placer": "AU eRequesting Placer",
  "http://hl7.org.au/fhir/ereq/ActorDefinition/au-erequesting-actor-filler": "AU eRequesting Filler",
  "http://hl7.org.au/fhir/ereq/ActorDefinition/au-erequesting-actor-patient": "AU eRequesting Patient",
  "http://hl7.org.au/fhir/ereq/ActorDefinition/au-erequesting-actor-server": "AU eRequesting Server"
  // Add additional actors here
};

export function parseStructureDefinition(json, outputDir) {
  const name = json.name;
  const resource = json.type;
  const mustSupports = json?.snapshot?.element || [];

  console.log(`Parsing file: ${json.id}.json`);

  const scenarioGroups = extractMustSupportElements(mustSupports, resource);

  for (const [actor, scenarios] of Object.entries(scenarioGroups)) {
    const safeActorName = actor.replace(/[^a-zA-Z0-9_-]/g, "_");

    writeFeatureFile({
      content: buildFeature({
        template: mustSupportFeatureTemplate,
        replacements: { RESOURCE: name },
        scenarios
      }),
      outputDir,
      fileName: `${name}-${safeActorName}-must-support.feature`
    });

    console.log(`- ${actor} must supports: ${scenarios.length}`);
  }
}

function extractMustSupportElements(elements, resource) {
  const scenarioGroups = {}; // dynamic keys based on actor name

  for (const element of elements) {
    if (!element.mustSupport) continue;

    const id = element.id;
    const obligations = (element.extension || []).filter(
      (ext) => ext.url === "http://hl7.org/fhir/StructureDefinition/obligation"
    );

    let matched = false;

    for (const obligation of obligations) {
      const actorExt = obligation.extension.find((e) => e.url === "actor");
      const codeExt = obligation.extension.find((e) => e.url === "code");
      if (!actorExt || !codeExt) continue;

      const actorUrl = actorExt.valueCanonical;
      const actorName = actorMap[actorUrl] || actorUrl;

      const scenario = buildScenario({
        template: mustSupportScenarioWithObligationsTemplate,
        replacements: {
          ACTOR: actorName,
          ELEMENT_ID: id,
          RESOURCE: resource,
          OBLIGATION: codeExt.valueCode
        }
      });

      scenarioGroups[actorName] ??= [];
      scenarioGroups[actorName].push(scenario);
      matched = true;
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