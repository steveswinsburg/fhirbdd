import { buildScenario, buildFeature, writeFeatureFile } from "../utils/featureUtils.js";
import {
  mustSupportFeatureTemplate,
  mustSupportScenarioWithObligationsTemplate,
  mustSupportScenarioWithoutObligationsTemplate
} from "../templates/structureDefinitionTemplates.js";

// to allow for additional IG support, we map actors to their readable names
const actorMap = {
  "http://hl7.org.au/fhir/core/ActorDefinition/au-core-actor-requester": "AU Core Requester",
  "http://hl7.org.au/fhir/core/ActorDefinition/au-core-actor-responder": "AU Core Responder"
};

export function parseStructureDefinition(json, outputDir) {

  const { requesterMustSupportScenarios, responderMustSupportScenarios, otherMustSupportScenarios } = extractMustSupportElements(json);

  // use this, not type as type might be Observation but name is a profile of that, ie AUCoreWaistCircumference
  const name = json.name;
  
  if (requesterMustSupportScenarios.length > 0) {
    writeFeatureFile({
      content: buildFeature({ template: mustSupportFeatureTemplate, replacements: { RESOURCE: name }, scenarios: requesterMustSupportScenarios }),
      outputDir,
      fileName: `${name}-Requester-must-support.feature`
    });
  }

  if (responderMustSupportScenarios.length > 0) {
    writeFeatureFile({
      content: buildFeature({ template: mustSupportFeatureTemplate, replacements: { RESOURCE: name }, scenarios: responderMustSupportScenarios }),
      outputDir,
      fileName: `${name}-Responder-must-support.feature`
    });
  }

  if (otherMustSupportScenarios.length > 0) {
    writeFeatureFile({
      content: buildFeature({ template: mustSupportFeatureTemplate, replacements: { RESOURCE: name }, scenarios: otherMustSupportScenarios }),
      outputDir,
      fileName: `${name}-must-support.feature`
    });
  }

  console.log(`Parsed ${name} must supports:`);
  console.log(`- Requester must supports: ${requesterMustSupportScenarios.length}`);
  console.log(`- Responder must supports: ${responderMustSupportScenarios.length}`);
  console.log(`- Other must supports: ${otherMustSupportScenarios.length}`);
  
}

function extractMustSupportElements(json) {
  const resource = json?.type;
  const name = json?.name;
  const elements = json?.snapshot?.element || [];

  const scenarioGroups = {
    requesterMustSupportScenarios: [],
    responderMustSupportScenarios: [],
    otherMustSupportScenarios: []
  };

  for (const el of elements) {
    if (!el.mustSupport) continue;

    const id = el.id;

    const obligations = (el.extension || []).filter(ext =>
      ext.url === "http://hl7.org/fhir/StructureDefinition/obligation"
    );

    let matched = false;

    // Create a scenario for must supports that have obligations
    for (const obligation of obligations) {
      const actorExt = obligation.extension.find(e => e.url === "actor");
      const codeExt = obligation.extension.find(e => e.url === "code");

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

        if (actor.includes("Requester")) {
          scenarioGroups.requesterMustSupportScenarios.push(scenario);
        } else if (actor.includes("Responder")) {
          scenarioGroups.responderMustSupportScenarios.push(scenario);
        } else {
          scenarioGroups.otherMustSupportScenarios.push(scenario);
        }

        matched = true;
      }
    }

    // If no obligations, we still want to create a scenario for the element
    if (!matched && obligations.length === 0) {
      const scenario = buildScenario({
        template: mustSupportScenarioWithoutObligationsTemplate,
        replacements: {
          ACTOR: "System",
          ELEMENT_ID: id,
          RESOURCE: resource
        }
      });
      scenarioGroups.otherMustSupportScenarios.push(scenario);
    }

  }

  return scenarioGroups;
}