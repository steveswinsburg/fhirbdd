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

// === Scenario Templates: Resource Expectations ===
export const resourceRequesterScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support {{RESOURCE_TYPE}}
    Given we are testing a {{ROLE}}
    Then it {{EXPECTATION}} support the {{RESOURCE_TYPE}} resource
`;

export const resourceResponderScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support {{RESOURCE_TYPE}}
    Given we are testing a {{ROLE}}
    Then it {{EXPECTATION}} support the {{RESOURCE_TYPE}} resource
`;

// === Scenario Templates: Interactions ===
export const interactionRequesterScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support interaction {{INTERACTION_TYPE}} on {{RESOURCE_TYPE}}
    Given the {{ROLE}} supports the {{RESOURCE_TYPE}} resource 
    Then it {{EXPECTATION}} support interaction {{INTERACTION_TYPE}} on {{RESOURCE_TYPE}}
`;

export const interactionResponderScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support interaction {{INTERACTION_TYPE}} on {{RESOURCE_TYPE}}
    Given the {{ROLE}} supports the {{RESOURCE_TYPE}} resource 
    Then it {{EXPECTATION}} support interaction {{INTERACTION_TYPE}} on {{RESOURCE_TYPE}}
`;

// === Scenario Templates: Search Parameters ===
export const searchParamRequesterScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support search parameter {{SEARCH_PARAM}} on {{RESOURCE_TYPE}}
    Given the {{ROLE}} supports the {{RESOURCE_TYPE}} resource 
    Then it {{EXPECTATION}} support the {{SEARCH_PARAM}} search parameter
`;

export const searchParamResponderScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support search parameter {{SEARCH_PARAM}} on {{RESOURCE_TYPE}}
    Given the {{ROLE}} supports the {{RESOURCE_TYPE}} resource 
    Then it {{EXPECTATION}} support the {{SEARCH_PARAM}} search parameter
`;