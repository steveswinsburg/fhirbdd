Feature: Requester supports Resources

  Scenario: Requester SHOULD support AllergyIntolerance
    Given a FHIR client is connected
    When the client reads capability statement for AllergyIntolerance
    Then it SHALL include support for AllergyIntolerance

  Scenario: Requester SHOULD support Condition
    Given a FHIR client is connected
    When the client reads capability statement for Condition
    Then it SHALL include support for Condition

  Scenario: Requester SHOULD support DiagnosticReport
    Given a FHIR client is connected
    When the client reads capability statement for DiagnosticReport
    Then it SHALL include support for DiagnosticReport

  Scenario: Requester SHOULD support DocumentReference
    Given a FHIR client is connected
    When the client reads capability statement for DocumentReference
    Then it SHALL include support for DocumentReference

  Scenario: Requester SHOULD support Encounter
    Given a FHIR client is connected
    When the client reads capability statement for Encounter
    Then it SHALL include support for Encounter

  Scenario: Requester SHOULD support Immunization
    Given a FHIR client is connected
    When the client reads capability statement for Immunization
    Then it SHALL include support for Immunization

  Scenario: Requester SHOULD support Location
    Given a FHIR client is connected
    When the client reads capability statement for Location
    Then it SHALL include support for Location

  Scenario: Requester SHOULD support Medication
    Given a FHIR client is connected
    When the client reads capability statement for Medication
    Then it SHALL include support for Medication

  Scenario: Requester SHOULD support MedicationRequest
    Given a FHIR client is connected
    When the client reads capability statement for MedicationRequest
    Then it SHALL include support for MedicationRequest

  Scenario: Requester SHOULD support MedicationStatement
    Given a FHIR client is connected
    When the client reads capability statement for MedicationStatement
    Then it SHALL include support for MedicationStatement

  Scenario: Requester SHOULD support Observation
    Given a FHIR client is connected
    When the client reads capability statement for Observation
    Then it SHALL include support for Observation

  Scenario: Requester SHOULD support Organization
    Given a FHIR client is connected
    When the client reads capability statement for Organization
    Then it SHALL include support for Organization

  Scenario: Requester SHALL support Patient
    Given a FHIR client is connected
    When the client reads capability statement for Patient
    Then it SHALL include support for Patient

  Scenario: Requester SHOULD support Practitioner
    Given a FHIR client is connected
    When the client reads capability statement for Practitioner
    Then it SHALL include support for Practitioner

  Scenario: Requester SHOULD support PractitionerRole
    Given a FHIR client is connected
    When the client reads capability statement for PractitionerRole
    Then it SHALL include support for PractitionerRole

  Scenario: Requester SHOULD support Procedure
    Given a FHIR client is connected
    When the client reads capability statement for Procedure
    Then it SHALL include support for Procedure

  Scenario: Requester SHOULD support RelatedPerson
    Given a FHIR client is connected
    When the client reads capability statement for RelatedPerson
    Then it SHALL include support for RelatedPerson

  Scenario: Requester SHOULD support Specimen
    Given a FHIR client is connected
    When the client reads capability statement for Specimen
    Then it SHALL include support for Specimen

