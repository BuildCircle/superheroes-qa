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

## Getting started

Node 24 (see `.nvmrc`), [Vite](https://vite.dev) and [Playwright](https://playwright.dev) with TypeScript.

```
yarn install
npx playwright install chromium
yarn test         # run the Playwright tests in e2e/
yarn test:ui      # optional: Playwright UI mode
yarn start        # optional: run the app at http://localhost:5173
```

## Tasks

1. `yarn test` doesn't pass cleanly. Find out why, and fix it.
2. Add some new tests.
3. If you find a bug in the app, write a bug report for it.

Please do not change the application code.
