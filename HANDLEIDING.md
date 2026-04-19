# Handleiding: oefenwebsite online zetten

Je hebt nu een complete projectmap. We gaan deze in 3 stappen online zetten,
zodat je student een normale link kan openen vanaf elk apparaat.

**Tijd:** ongeveer 15-20 minuten als je het voor het eerst doet.
**Kosten:** gratis.

---

## Wat heb je nodig?

- Een e-mailadres
- Een browser
- Geen technische voorkennis

---

## STAP 1 — Maak een GitHub-account (5 min)

GitHub is de plek waar je de code opslaat. Vercel haalt de code daar later op.

1. Ga naar **https://github.com/signup**
2. Vul een e-mailadres, wachtwoord en gebruikersnaam in (dit wordt onderdeel van je URL, dus kies iets nets)
3. Verifieer je e-mail
4. Klik na inloggen op het **`+`** icoon rechtsboven → **"New repository"**
5. Vul in:
   - **Repository name:** `economie-bijles`
   - **Public** of **Private** (Private is prima — Vercel kan ook bij private repos)
   - **NIET** "Add a README" aanvinken (we hebben al een README)
6. Klik **"Create repository"**

Je ziet nu een lege repository met instructies. Negeer die — we doen het anders.

---

## STAP 2 — Upload de code naar GitHub (5 min)

De makkelijkste manier zonder terminal-kennis:

1. Op de pagina van je nieuwe repository klik je op **"uploading an existing file"** (deze link staat tussen de instructies)
2. Open op je computer de map `economie-bijles` die ik je gegeven heb
3. **Selecteer ALLE bestanden en mappen** in die map (ook de `src` map)
4. **Sleep ze allemaal tegelijk** in het GitHub-uploadvak in je browser
5. Wacht tot alle bestanden zijn geüpload (zie de lijst onder het uploadvak)
6. Onderaan: bij "Commit changes" typ je iets als `eerste versie`
7. Klik **"Commit changes"**

Klaar. Refresh de pagina en je ziet alle bestanden in je repository staan.

> **Belangrijk:** upload de map `node_modules` NIET als die bij je staat.
> Die wordt automatisch aangemaakt door Vercel.

---

## STAP 3 — Zet het online via Vercel (5 min)

Vercel maakt van je code een werkende website.

1. Ga naar **https://vercel.com/signup**
2. Klik op **"Continue with GitHub"** (gebruikt je net gemaakte account)
3. Geef Vercel toestemming om je GitHub-repos te zien
4. Op het Vercel dashboard klik je op **"Add New..."** → **"Project"**
5. Je ziet je `economie-bijles` repository staan → klik **"Import"**
6. Vercel detecteert automatisch dat het een Vite-project is. Je hoeft niets aan te passen.
7. Klik **"Deploy"**
8. Wacht 1-2 minuten...
9. **Klaar!** Je ziet een feestje met confetti en een link zoals:
   `economie-bijles-xyz.vercel.app`

Klik op die link en je website is live. Werkt op telefoon, tablet, laptop, alles.

---

## Deel het met je student

Stuur haar simpelweg de link. Eventueel kan ze die op haar telefoon
toevoegen aan haar startscherm (in Safari/Chrome: deelknop → "Voeg toe aan
startscherm") zodat het voelt als een echte app.

**Let op:** voortgang wordt opgeslagen op het apparaat waarop ze oefent. Dus
als ze de ene keer op haar laptop oefent en de andere keer op haar telefoon,
zijn dat aparte voortgangen. Voor één apparaat per persoon is dit prima.

---

## Vragen toevoegen later

Stel: je wilt nieuwe vragen toevoegen.

1. Ga naar je repository op GitHub
2. Open de map `src` → klik op `App.jsx`
3. Klik op het **potlood-icoon** rechtsboven om te bewerken in de browser
4. Zoek de array `QUESTIONS` (helemaal bovenaan)
5. Voeg een nieuwe vraag toe (kopieer een bestaande als template)
6. Onderaan: bij "Commit changes" typ je `nieuwe vragen toegevoegd`
7. Klik **"Commit changes"**

Vercel detecteert de wijziging automatisch en zet binnen 1 minuut de nieuwe
versie online. Je student hoeft alleen de pagina te verversen.

---

## Hulp nodig bij een stap?

Als ergens iets niet werkt: vertel me bij welke stap je vastloopt en wat je
ziet (eventueel met screenshot), dan help ik je verder.
