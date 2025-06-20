// === Feature Templates ===
export const mustSupportFeatureTemplate = `Feature: {{RESOURCE}} must-support elements

{{SCENARIOS}}
`;

// === Scenario Templates ===
export const mustSupportScenarioWithObligationsTemplate = `  Scenario: {{ACTOR}} SHALL support element {{ELEMENT_ID}}
    Given the {{ACTOR}} supports the {{RESOURCE}} resource
    Then it SHALL support the must-support element {{ELEMENT_ID}} with obligation {{OBLIGATION}}
`;

export const mustSupportScenarioWithoutObligationsTemplate = `  Scenario: {{ACTOR}} SHALL support element {{ELEMENT_ID}}
    Given the {{ACTOR}} supports the {{RESOURCE}} resource
    Then it SHALL support the must-support element {{ELEMENT_ID}}
`;