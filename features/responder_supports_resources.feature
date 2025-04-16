Feature: Responder supports Resources

  Scenario: Responder SHOULD support AllergyIntolerance
    Given a FHIR server exposes a capability statement
    When I inspect support for AllergyIntolerance
    Then the server SHALL declare support for AllergyIntolerance

  Scenario: Responder SHOULD support Condition
    Given a FHIR server exposes a capability statement
    When I inspect support for Condition
    Then the server SHALL declare support for Condition

  Scenario: Responder SHOULD support DiagnosticReport
    Given a FHIR server exposes a capability statement
    When I inspect support for DiagnosticReport
    Then the server SHALL declare support for DiagnosticReport

  Scenario: Responder SHOULD support DocumentReference
    Given a FHIR server exposes a capability statement
    When I inspect support for DocumentReference
    Then the server SHALL declare support for DocumentReference

  Scenario: Responder SHOULD support Encounter
    Given a FHIR server exposes a capability statement
    When I inspect support for Encounter
    Then the server SHALL declare support for Encounter

  Scenario: Responder SHOULD support Immunization
    Given a FHIR server exposes a capability statement
    When I inspect support for Immunization
    Then the server SHALL declare support for Immunization

  Scenario: Responder SHOULD support Location
    Given a FHIR server exposes a capability statement
    When I inspect support for Location
    Then the server SHALL declare support for Location

  Scenario: Responder SHOULD support Medication
    Given a FHIR server exposes a capability statement
    When I inspect support for Medication
    Then the server SHALL declare support for Medication

  Scenario: Responder SHOULD support MedicationRequest
    Given a FHIR server exposes a capability statement
    When I inspect support for MedicationRequest
    Then the server SHALL declare support for MedicationRequest

  Scenario: Responder SHOULD support MedicationStatement
    Given a FHIR server exposes a capability statement
    When I inspect support for MedicationStatement
    Then the server SHALL declare support for MedicationStatement

  Scenario: Responder SHOULD support Observation
    Given a FHIR server exposes a capability statement
    When I inspect support for Observation
    Then the server SHALL declare support for Observation

  Scenario: Responder SHOULD support Organization
    Given a FHIR server exposes a capability statement
    When I inspect support for Organization
    Then the server SHALL declare support for Organization

  Scenario: Responder SHALL support Patient
    Given a FHIR server exposes a capability statement
    When I inspect support for Patient
    Then the server SHALL declare support for Patient

  Scenario: Responder SHOULD support Practitioner
    Given a FHIR server exposes a capability statement
    When I inspect support for Practitioner
    Then the server SHALL declare support for Practitioner

  Scenario: Responder SHOULD support PractitionerRole
    Given a FHIR server exposes a capability statement
    When I inspect support for PractitionerRole
    Then the server SHALL declare support for PractitionerRole

  Scenario: Responder SHOULD support Procedure
    Given a FHIR server exposes a capability statement
    When I inspect support for Procedure
    Then the server SHALL declare support for Procedure

  Scenario: Responder SHOULD support RelatedPerson
    Given a FHIR server exposes a capability statement
    When I inspect support for RelatedPerson
    Then the server SHALL declare support for RelatedPerson

  Scenario: Responder SHOULD support Specimen
    Given a FHIR server exposes a capability statement
    When I inspect support for Specimen
    Then the server SHALL declare support for Specimen

