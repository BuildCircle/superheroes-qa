# Superhero battle: QA technical test

Superheroes and villains are always battling it out. This small React app lets you pick a hero and a villain, and shows who wins.

The characters and their scores come from a public JSON file stored in AWS S3: https://s3.eu-west-2.amazonaws.com/build-circle/characters.json

## How the app works

- Choose a hero and a villain, then click **Battle**.
- **Randomise** picks a random hero and a random villain for you.
- Choose **Custom** in either dropdown to enter your own score for that character.
- The character with the **higher score wins**. Equal scores are a tie.
- Each hero may have a nemesis, captured in the `weakness` field. If a hero fights the villain named in their weakness, **the hero's score is reduced by 1 point** for that battle.
- The winner is shown on the page.

## Prerequisites

Please install these before the interview. Windows, macOS and Linux all work.

| Software | Version | Notes |
|---|---|---|
| [Node.js](https://nodejs.org) | 24 (see `.nvmrc`) | Includes `npm`. Check with `node -v`. |
| [Git](https://git-scm.com) | Any recent version | To clone this repository. |
| [Yarn](https://classic.yarnpkg.com) | 1.x (classic) | Optional. Install with `npm install -g yarn`. You can use `npm` instead. |
| A code editor | Any | For example [VS Code](https://code.visualstudio.com). |

You also need:

- **A Chromium browser for Playwright.** The setup commands below install it for you (about 150 MB). On a fresh Linux machine you may also need `npx playwright install-deps`.
- **An internet connection.** The app loads its data from the S3 URL above, and the first install downloads packages.
- **Port 5173 free.** The tests start the app there automatically.

## Getting started

The project uses [Vite](https://vite.dev) and [Playwright](https://playwright.dev) with TypeScript.

```
git clone https://github.com/BuildCircle/superheroes-qa
cd superheroes-qa
yarn install
npx playwright install chromium
yarn test         # run the Playwright tests in e2e/
yarn test:ui      # optional: Playwright UI mode
yarn start        # optional: run the app at http://localhost:5173
```

If you prefer npm, use `npm install`, `npm test`, `npm run test:ui` and `npm start` instead.

## Tasks

1. `yarn test` doesn't pass cleanly. Find out why, and fix it.
2. Add some new tests.
3. If you find a bug in the app, write a bug report for it.

Please do not change the application code.
