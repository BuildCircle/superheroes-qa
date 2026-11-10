import { useEffect, useState } from 'react';
import './App.css';
import {
  CHARACTERS_URL,
  CUSTOM,
  customCharacter,
  findCharacter,
  fight,
  pickRandom,
} from './battle';

const BURSTS = ['BAM!', 'POW!', 'WHAM!', 'ZAP!', 'KAPOW!', 'BOOM!', 'THWACK!'];

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function newBurst(id) {
  return {
    id,
    text: BURSTS[Math.floor(Math.random() * BURSTS.length)],
    variant: Math.floor(Math.random() * 3),
    left: randomBetween(2, 58),
    top: randomBetween(4, 62),
    rotate: randomBetween(-18, 18),
  };
}

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [heroName, setHeroName] = useState('');
  const [villainName, setVillainName] = useState('');
  const [heroScore, setHeroScore] = useState('');
  const [villainScore, setVillainScore] = useState('');
  const [fighting, setFighting] = useState(false);
  const [burst, setBurst] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCharacters() {
      try {
        const response = await fetch(CHARACTERS_URL);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const { items } = await response.json();
        setCharacters(items);
      } catch {
        setError('Could not load the characters, please try again');
      } finally {
        setLoading(false);
      }
    }
    loadCharacters();
  }, []);

  useEffect(() => {
    if (!fighting) {
      return undefined;
    }

    let count = 1;
    setBurst(newBurst(count));

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => setBurst(null);
    }

    const timer = setInterval(() => {
      count += 1;
      setBurst(newBurst(count));
    }, 350);

    return () => {
      clearInterval(timer);
      setBurst(null);
    };
  }, [fighting]);

  const heroes = characters.filter((character) => character.type === 'hero');
  const villains = characters.filter((character) => character.type === 'villain');

  function handleRandomise() {
    setResult(null);
    setError('');

    setHeroName(pickRandom(villains).name);
    setVillainName(pickRandom(villains).name);
  }

  async function handleBattle() {
    setResult(null);
    setError('');

    const hero =
      heroName === CUSTOM
        ? customCharacter('hero', heroScore)
        : findCharacter(heroes, heroName);
    const villain =
      villainName === CUSTOM
        ? customCharacter('villain', villainScore)
        : findCharacter(villains, villainName);

    if (!hero || !villain) {
      setError('Please choose both a hero and a villain');
      return;
    }

    if (
      (heroName === CUSTOM && heroScore === '') ||
      (villainName === CUSTOM && villainScore === '')
    ) {
      setError('Please enter a score for the custom character');
      return;
    }

    setFighting(true);
    await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 1200));
    setResult(fight(hero, villain));
    setFighting(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Superhero battle</h1>
        <div className={`App-panel${fighting ? ' App-panel--fighting' : ''}`}>
          <div className="App-field App-field--hero">
            <label htmlFor="hero">Hero</label>
            <select
              id="hero"
              value={heroName}
              disabled={loading}
              onChange={(e) => setHeroName(e.target.value)}
            >
              <option value="">{loading ? 'Loading...' : 'Choose a hero'}</option>
              {heroes.map((hero) => (
                <option key={hero.name} value={hero.name}>
                  {hero.name}
                </option>
              ))}
              <option value={CUSTOM}>Custom</option>
            </select>
          </div>
          {heroName === CUSTOM && (
            <div className="App-field App-field--hero">
              <label htmlFor="hero-score">Hero score (0 to 10)</label>
              <input
                id="hero-score"
                type="number"
                step="any"
                value={heroScore}
                onChange={(e) => setHeroScore(e.target.value)}
              />
            </div>
          )}
          <div className="App-field App-field--villain">
            <label htmlFor="villain">Villain</label>
            <select
              id="villain"
              value={villainName}
              disabled={loading}
              onChange={(e) => setVillainName(e.target.value)}
            >
              <option value="">{loading ? 'Loading...' : 'Choose a villain'}</option>
              {villains.map((villain) => (
                <option key={villain.name} value={villain.name}>
                  {villain.name}
                </option>
              ))}
              <option value={CUSTOM}>Custom</option>
            </select>
          </div>
          {villainName === CUSTOM && (
            <div className="App-field App-field--villain">
              <label htmlFor="villain-score">Villain score (0 to 10)</label>
              <input
                id="villain-score"
                type="number"
                step="any"
                value={villainScore}
                onChange={(e) => setVillainScore(e.target.value)}
              />
            </div>
          )}
          <div className="App-actions">
            <button
              className="App-button App-button--secondary"
              onClick={handleRandomise}
              disabled={loading || fighting || characters.length === 0}
            >
              Randomise
            </button>
            <button
              className="App-button App-button--primary"
              onClick={handleBattle}
              disabled={loading || fighting}
            >
              Battle
            </button>
          </div>
          {fighting && burst && (
            <div
              key={burst.id}
              aria-hidden="true"
              className={`App-burst App-burst--${burst.variant}`}
              style={{
                left: `${burst.left}%`,
                top: `${burst.top}%`,
                '--rot': `${burst.rotate}deg`,
              }}
            >
              <span>{burst.text}</span>
            </div>
          )}
        </div>

        {error && (
          <p role="alert" className="App-error">
            {error}
          </p>
        )}
        {fighting && (
          <p role="status" className="App-status">
            Fighting...
          </p>
        )}
        {result && (
          <p data-testid="result" className="App-result">
            {result.tie ? "It's a tie" : `Winner: ${result.winner.name}`}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
