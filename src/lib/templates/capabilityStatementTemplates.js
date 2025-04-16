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
    Given a FHIR client is connected
    When the client reads capability statement for {{RESOURCE_TYPE}}
    Then it {{EXPECTATION}} include support for {{RESOURCE_TYPE}}
`;

export const resourceResponderScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support {{RESOURCE_TYPE}}
    Given a FHIR server exposes a capability statement
    When I inspect support for {{RESOURCE_TYPE}}
    Then the server {{EXPECTATION}} declare support for {{RESOURCE_TYPE}}
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
    Given a FHIR client uses search parameter {{SEARCH_PARAM}} on {{RESOURCE_TYPE}}
    When reading the capability statement
    Then it {{EXPECTATION}} declare support for search parameter {{SEARCH_PARAM}} on {{RESOURCE_TYPE}}
`;

export const searchParamResponderScenarioTemplate = `  Scenario: {{ROLE}} {{EXPECTATION}} support search parameter {{SEARCH_PARAM}} on {{RESOURCE_TYPE}}
    Given a FHIR server supports search on {{RESOURCE_TYPE}}
    When checking the capability statement
    Then it {{EXPECTATION}} include {{SEARCH_PARAM}} as a supported search parameter
`;