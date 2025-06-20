// === Feature Templates ===
export const resourceFeatureTemplate = `Feature: {{ROLE}} supports Resources

{{SCENARIOS}}
`;

export const interactionFeatureTemplate = `Feature: {{ROLE}} supports Interactions

{{SCENARIOS}}
`;

export const searchParamFeatureTemplate = `Feature: {{ROLE}} supports Search Parameters

{{SCENARIOS}}
`;

export const systemInteractionFeatureTemplate = `Feature: {{ROLE}} supports system-level interactions

{{SCENARIOS}}
`;

// === Scenario Templates ===
export const resourceScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support {{RESOURCE_TYPE}}
    Given we are testing a {{ROLE}}
    Then it {{EXPECTATION}} support the {{RESOURCE_TYPE}} resource
`;

export const interactionScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support interaction {{INTERACTION_TYPE}} on {{RESOURCE_TYPE}}
    Given the {{ROLE}} supports the {{RESOURCE_TYPE}} resource 
    Then it {{EXPECTATION}} support interaction {{INTERACTION_TYPE}} on {{RESOURCE_TYPE}}
`;

export const searchParamScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support search parameter {{SEARCH_PARAM}} on {{RESOURCE_TYPE}}
    Given the {{ROLE}} supports the {{RESOURCE_TYPE}} resource 
    Then it {{EXPECTATION}} support the {{SEARCH_PARAM}} search parameter
`;

export const searchParamCombinationScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support combined search parameters on {{RESOURCE_TYPE}}
    Given the {{ROLE}} supports the {{RESOURCE_TYPE}} resource
    Then it {{EXPECTATION}} support searching using the parameters: {{COMBINED_PARAMS}}
`;

export const systemInteractionScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support the {{INTERACTION_TYPE}} system-level interaction
    Given the {{ROLE}} system is conformant
    Then it {{EXPECTATION}} support the {{INTERACTION_TYPE}} interaction
`;