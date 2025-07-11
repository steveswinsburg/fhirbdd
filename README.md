# 🔥 FhirBdd

FhirBdd is a Cucumber test generator for FHIR® Implementation Guides, powered by Behaviour Driven Development (BDD).

It takes your FHIR IG and turns it into ready-to-run, human-readable `.feature` files using Gherkin syntax. Designed for developers, testers, and standards authors who want to ensure conformance through clear, executable scenarios using a behaviour-driven testing approach.

[![Node.js CI](https://github.com/steveswinsburg/fhirbdd/actions/workflows/node.js.yml/badge.svg)](https://github.com/steveswinsburg/fhirbdd/actions/workflows/node.js.yml)

## ✨ Features

- 🔁 Converts FHIR StructureDefinitions and CapabilityStatements into `.feature` files
- 🧪 Uses Gherkin syntax for human-readable, executable tests
- 🌍 Supports any FHIR IG, including AU Core, US Core, and custom packages
- ⚙️ CLI tool - great for CI/CD pipelines
- 📦 Easy to integrate into Cucumber-based test suites like [StepRunner](https://github.com/steveswinsburg/steprunner)

## 🚀 Getting Started

### 📦 Install
```
npm install
npm link
```

### 🛠️ Usage

You can generate feature files from either a *local* or *remote* FHIR IG .tgz package.

#### 👉 Local .tgz file

Download your FHIR IG .tgz file (from your IG build page), then run:

```
fhirbdd \
  --file /path/to/package.tgz \
  --output ./features
```

#### 🌐 Remote .tgz file
If your IG is published and hosted online:
```
fhirbdd \
  --url https://example.org/path/to/package.tgz \
  --output ./features
```

#### 🧩 Options:
```
--file - Path to a local FHIR IG .tgz file
--url - URL to a remote FHIR IG .tgz file
--output - Directory to save the generated feature files
```

### 🧪 Example Output
```
Feature: Search for Patient by identifier

  Scenario: Server returns correct Patient for valid identifier
    Given a FHIR server is available
    When I search for Patient by identifier "12345"
    Then the response should contain a Patient resource with identifier "12345"
```

### 🙋🏻‍♂️ Now what?

Now that you have a set of `.feature` files, you can do quite a lot with them 🎉

#### Run them manually
You can run through the features and scenarios manually and check your system is conformant. Simply open the feature file and run through each line.

#### Execute them
You can load these feature files into a feature file visualisation / execution tool and run each step using a UI. I wrote one specifically for this purpose called [StepRunner](https://github.com/steveswinsburg/steprunner).
Check it out here: https://steprunner-abc1f.web.app/.

#### Automate them
You can write automated tests based on the steps in the scenarios and execute these via [Cucumber](https://cucumber.io/docs/cucumber/step-definitions), [Selenium](https://cucumber.io/docs/guides/browser-automation/), or many other testing libraries that support feature files.

## 🤝 Contributing

PRs welcome! To contribute:
1. Fork the repo
2. Create a feature branch
3. Submit a pull request with a clear description

## 💬 Feedback

Found a bug or want a feature? Raise an issue to start the discussion.

## 🤓 Developers

```
npm install
npm link (as needed)
npm unlink (as needed)
```

---
FHIR® and the flame icon are the registered trademark of HL7 and are used with the permission of HL7. Use of the FHIR trademark does not constitute endorsement of the contents of this website by HL7.
