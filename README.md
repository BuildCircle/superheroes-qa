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
| [Yarn](https://classic.yarnpkg.com) | 1.x (classic) | Optional. Install with `npm install -g yarn`. You can use `npm` instead, so you don't need both. |
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
```

You can use either **yarn** or **npm**, whichever you prefer. Just stick to one of them.

| Step | yarn | npm |
|---|---|---|
| Install dependencies | `yarn install` | `npm install` |
| Install the Playwright browser | `npx playwright install chromium` | `npx playwright install chromium` |
| Run the Playwright tests in `e2e/` | `yarn test` | `npm test` |
| Playwright UI mode (optional) | `yarn test:ui` | `npm run test:ui` |
| Run the app at http://localhost:5173 (optional) | `yarn start` | `npm start` |

## Tasks

1. Review the existing tests and share your feedback on how they are written. Tell us what you like and what you would change.
2. The tests (`yarn test` or `npm test`) don't pass cleanly. Find out why, and fix it.
3. Add some new tests.
4. If you find a bug in the app, write a bug report for it.

Please do not change the application code.
