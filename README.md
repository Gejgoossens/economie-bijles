# Economie vwo · Oefenwebsite

Interactieve oefenwebsite voor het centraal examen economie vwo 2026.

## Drie oefenmodi

1. **Vraag ontleden** — leer examenopgaven systematisch te analyseren in 4 stappen:
   lezen → relevante gegevens selecteren → economisch concept herkennen → antwoord formuleren.
   Gebaseerd op echte examenvragen uit 2023-2025.
2. **Slim oefenen** — spaced repetition met korte vragen per domein.
3. **Examen-modus** — 10 vragen onder tijdsdruk.

## Lokaal draaien (optioneel, om te testen)

```bash
npm install
npm run dev
```

Open vervolgens http://localhost:5173 in je browser.

## Online zetten via Vercel

Zie HANDLEIDING.md voor stap-voor-stap instructies.

## Korte vragen toevoegen

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
  correct: 0,
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

## Examenvragen (Vraag ontleden) toevoegen

In dezelfde file staat de array `EXAM_QUESTIONS`. Deze vragen hebben een langere
casus en drie extra velden. Voorbeeld:

```js
{
  id: 'exam-nieuw',
  source: 'VWO Economie 2024 tijdvak 1, opgave 2',
  domain: 'Markt',
  context: 'De lange casus met alle context en gegevens...',
  question: 'De concrete vraag die beantwoord moet worden.',

  // Welke gegevens uit de casus zijn wel/niet relevant?
  dataItems: [
    { text: 'Gegeven 1', relevant: true, explanation: 'Waarom wel/niet nodig.' },
    { text: 'Gegeven 2', relevant: false, explanation: 'Waarom wel/niet nodig.' },
    // minstens 4-6 items, mix van relevant en afleiders
  ],

  // Welk concept/model hoort hierbij?
  concepts: [
    { text: 'Concept A', correct: true, explanation: 'Waarom dit past.' },
    { text: 'Concept B', correct: false, explanation: 'Waarom dit niet past.' },
    // minstens 4-5 opties, mix van juist en afleiders
  ],

  modelAnswer: 'Het complete modelantwoord.',
  keyPoints: ['kernpunt 1', 'kernpunt 2']
}
```

Geldige domeinen: `Markt`, `Ruilen over de tijd`, `Samenwerken & onderhandelen`,
`Risico & informatie`, `Welvaart & groei`, `Conjunctuur`.

Push de wijziging naar GitHub en Vercel zet automatisch de nieuwe versie online.

## Tip voor meer examenvragen

Haal echte examens en correctievoorschriften van https://www.alleexamens.nl/examens/VWO/Economie/
Kies recente examens (2023-2025) omdat het examenprogramma sinds 2023 vernieuwd is.

