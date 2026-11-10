export const CHARACTERS_URL =
  'https://s3.eu-west-2.amazonaws.com/build-circle/characters.json';

export function findCharacter(characters, name) {
  return characters.find((character) => character.name === name);
}

export function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export const CUSTOM = 'custom';

export function customCharacter(type, score) {
  return { name: `Custom ${type}`, type, score: Number(score) };
}

// A hero is weakened by 1 point when fighting the villain named in their weakness field.
export function scoresFor(hero, villain) {
  const weakened = hero.weakness === villain.name;
  return {
    hero: weakened ? hero.score - 1 : hero.score,
    villain: villain.score,
  };
}

export function fight(hero, villain) {
  const scores = scoresFor(hero, villain);

  if (scores.hero === scores.villain) {
    return { tie: true };
  }
  return { tie: false, winner: scores.hero > scores.villain ? hero : villain };
}
