# 🔥 FireBed

FireBed is a Cucumber test generator for FHIR Implementation Guides, powered by Behaviour Driven Development (BDD).

It takes your FHIR IG and turns it into ready-to-run, human-readable `.feature` files using Gherkin syntax. Designed for developers, testers, and standards authors who want to ensure conformance through clear, executable scenarios using a behaviour-driven testing appraoch.

## ✨ Features

- 🔁 Converts FHIR StructureDefinitions and CapabilityStatements into `.feature` files
- 🧪 Uses Gherkin syntax for human-readable, executable tests
- 🌍 Supports any FHIR IG, including AU Core, US Core, and custom packages
- ⚙️ CLI tool — great for CI/CD pipelines
- 📦 Easy to integrate into Cucumber-based test suites like [XBDD](https://github.com/steveswinsburg/XBDD)


## 🚀 Getting Started

### 📦 Install

Coming soon

### 🛠️ Usage

```
firebed generate \
  --ig ./packages/au.core.tgz \
  --output ./features
```

Options:
```
--ig - Path to your FHIR IG package (.tgz)
--output - Directory to save generated feature files
```

### 🧪 Example Output
```
Feature: Search for Patient by identifier

  Scenario: Server returns correct Patient for valid identifier
    Given a FHIR server is available
    When I search for Patient by identifier "12345"
    Then the response should contain a Patient resource with identifier "12345"
```

## 🤝 Contributing

PRs welcome! To contribute:
	1.	Fork the repo
	2.	Create a feature branch
	3.	Submit a pull request with a clear description

## 💬 Feedback

Found a bug or want a feature? Raise an issue to start the discussion.
