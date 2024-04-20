# Playwright

A sample API test automation project in [TypeScript](https://www.typescriptlang.org/), using [Playwright](https://playwright.dev/).

## ReqRes

The API chosen for testing was ReqRes. It simulates how a real application behaves, is highly available and accessible from anywhere. For more information, visit their website [here](https://reqres.in/).

## How it works

The project uses Playwright as the test framework.  
A workflow is set up to install Node.js, install the required packages, run the tests, and publish the HTML report to GitHub Pages. The report can be viewed [here](https://kafziel4.github.io/playwright-api-tests/).

![report](./docs/report.png)

## How to run it

- Install [Node.js](https://nodejs.org/en/)
- Install the project packages: `npm install`
- Run the tests: `npm test`

![playwright](./docs/playwright.gif)
