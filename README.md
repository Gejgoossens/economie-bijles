# Economie vwo · Oefenwebsite

Interactieve oefenwebsite voor het centraal examen economie vwo 2026.

## Lokaal draaien (optioneel, om te testen)

```bash
npm install
npm run dev
```

Open vervolgens http://localhost:5173 in je browser.

## Online zetten via Vercel

Zie HANDLEIDING.md voor stap-voor-stap instructies.

## Vragen toevoegen

Open `src/App.jsx`. Bovenaan staat de array `QUESTIONS`. Voeg daar nieuwe
objecten aan toe volgens dit format:

**Meerkeuzevraag:**
```js
{
  id: 'uniek-id',
  domain: 'Markt',
  type: 'mc',
  difficulty: 2,
  question: 'De vraag hier...',
  options: ['Optie A', 'Optie B', 'Optie C', 'Optie D'],
  correct: 0,  // index van het juiste antwoord (0-3)
  explanation: 'Waarom dit het juiste antwoord is.'
}
```

**Open vraag:**
```js
{
  id: 'uniek-id',
  domain: 'Conjunctuur',
  type: 'open',
  difficulty: 3,
  question: 'De vraag hier...',
  modelAnswer: 'Het volledige modelantwoord.',
  keyPoints: ['punt 1', 'punt 2', 'punt 3']
}
```

Geldige domeinen: `Markt`, `Ruilen over de tijd`, `Samenwerken & onderhandelen`,
`Risico & informatie`, `Welvaart & groei`, `Conjunctuur`.

Push de wijziging naar GitHub en Vercel zet automatisch de nieuwe versie online.
