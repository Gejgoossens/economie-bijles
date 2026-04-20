import React, { useState, useEffect } from 'react';
import { BookOpen, Target, Clock, Flag, ChevronRight, Check, X, RotateCcw, TrendingUp, AlertCircle, Award, Calendar, Home, BarChart3, Search, FileText, Lightbulb } from 'lucide-react';

// ============================================
// EXAMENVRAGEN MET CASUS - voor "Vraag ontleden" modus
// Gebaseerd op stijl van recente vwo economie examens (2023-2025)
// ============================================
const EXAM_QUESTIONS = [
  {
    id: 'exam-duurzaamheid',
    source: 'Gebaseerd op VWO Economie 2024 tijdvak 1, opgave 1',
    domain: 'Markt',
    context: `De overheid van een land heeft met andere landen afgesproken de CO₂-uitstoot te verminderen. Een politicus stelt een combinatie van maatregelen voor: het instellen van een heffing op vervuilende productie (markt A) en het subsidiëren van schone productie (markt B). Een econoom onderzoekt deze twee markten van volkomen concurrentie.

Op markt A geldt zonder heffing een evenwichtsprijs van €40 bij een hoeveelheid van 800 eenheden. Na invoering van een heffing van €10 per eenheid daalt de hoeveelheid naar 600 eenheden en stijgt de consumentenprijs naar €46.

Op markt B geldt zonder subsidie een evenwichtsprijs van €25 bij een hoeveelheid van 500 eenheden. Na invoering van een subsidie van €6 per eenheid stijgt de hoeveelheid naar 700 eenheden en daalt de consumentenprijs naar €21.`,
    question: 'Leg uit of de consumenten of de producenten op markt A het grootste deel van de heffing dragen.',

    // Gegevens-identificatie (stap 1): welke feiten uit de tekst zijn relevant?
    dataItems: [
      { text: 'Evenwichtsprijs markt A zonder heffing: €40', relevant: true, explanation: 'Nodig om prijsverandering voor consument te berekenen.' },
      { text: 'Evenwichtsprijs markt A na heffing: €46 (consumentenprijs)', relevant: true, explanation: 'Consumenten betalen €6 meer (46-40).' },
      { text: 'Heffing: €10 per eenheid', relevant: true, explanation: 'Het totaalbedrag dat verdeeld moet worden tussen producent en consument.' },
      { text: 'Hoeveelheid op markt A daalt van 800 naar 600', relevant: false, explanation: 'Relevante informatie maar niet nodig om wie de heffing draagt te bepalen.' },
      { text: 'Gegevens over markt B (subsidie, prijs €25)', relevant: false, explanation: 'Markt B gaat over subsidie, niet over de heffing op markt A.' },
      { text: 'De afspraak is gemaakt met andere landen', relevant: false, explanation: 'Context, niet nodig voor de berekening.' }
    ],

    // Concept-identificatie (stap 2): welk economisch concept/model is relevant?
    concepts: [
      { text: 'Belastingincidentie / lastverdeling bij een heffing', correct: true, explanation: 'Deze vraag gaat precies over hoe de heffing verdeeld wordt over consument en producent.' },
      { text: 'Elasticiteit van vraag en aanbod', correct: true, explanation: 'De relatieve elasticiteit bepaalt wie de grootste last draagt (de minst elastische kant draagt het meest).' },
      { text: 'Monopolie en marktmacht', correct: false, explanation: 'De markt is volkomen concurrentie, niet een monopolie.' },
      { text: 'Speltheorie / Nash-evenwicht', correct: false, explanation: 'Er is geen strategische interactie tussen een beperkt aantal spelers.' },
      { text: 'Conjunctuurcyclus', correct: false, explanation: 'Dit is een microeconomische vraag over één markt, niet over de conjunctuur.' }
    ],

    // Het uiteindelijke antwoord
    modelAnswer: 'Van de heffing van €10 dragen de consumenten €6 (de consumentenprijs stijgt van €40 naar €46) en dragen de producenten €4 (zij ontvangen netto €46 − €10 = €36, dus €4 minder dan de oorspronkelijke €40). De consumenten dragen dus het grootste deel. Dit betekent dat het aanbod op deze markt elastischer is dan de vraag: de partij met de minst elastische curve draagt de grootste last.',
    keyPoints: ['consumenten dragen €6 (46-40)', 'producenten dragen €4 (40-36)', 'consumenten dragen grootste deel', 'conclusie: vraag minder elastisch dan aanbod']
  },

  {
    id: 'exam-kartel',
    source: 'Gebaseerd op VWO Economie 2024 tijdvak 1, opgave over visserij',
    domain: 'Samenwerken & onderhandelen',
    context: `Op de vismarkt in een regio zijn drie visserijen actief: Dirdam, Nednol en Syrap. Dirdam en Nednol domineren samen de markt. Na enkele jaren vormen Dirdam en Nednol een kartel en spreken een hoge kartelprijs van €12 per kilo af. Syrap overweegt toe te treden tot de markt en kan kiezen: een lagere prijs van €9 per kilo vragen, of meekomen met de kartelprijs van €12.

Bij toetreding van Syrap met een lagere prijs verwachten de kartelleden dat zij marktaandeel verliezen en hun winst daalt naar €4 miljoen per kartellid. Als Syrap meekomt met de kartelprijs, behalen alle drie de bedrijven een winst van €8 miljoen. Zonder toetreding van Syrap blijft de winst van het kartel €10 miljoen per lid.

Syrap zelf behaalt bij lagere prijs een winst van €6 miljoen, bij kartelprijs €5 miljoen, en zonder toetreding €0.`,
    question: 'Leg uit welke keuze Syrap rationeel gezien zal maken en wat dit betekent voor de stabiliteit van het kartel.',

    dataItems: [
      { text: 'Syrap: winst €6 miljoen bij lagere prijs', relevant: true, explanation: 'Nodig om Syraps dominante strategie te bepalen.' },
      { text: 'Syrap: winst €5 miljoen bij kartelprijs', relevant: true, explanation: 'Nodig om Syraps opties te vergelijken.' },
      { text: 'Syrap: winst €0 zonder toetreding', relevant: true, explanation: 'Toetreden is altijd beter dan niet toetreden.' },
      { text: 'Kartelprijs €12, lagere prijs €9', relevant: false, explanation: 'Dit is context, maar voor Syraps rationele keuze tellen alleen de winsten.' },
      { text: 'Dirdam en Nednol winst €4 mln bij toetreding met lagere prijs', relevant: false, explanation: 'Niet relevant voor Syraps eigen beslissing (Syrap kijkt alleen naar eigen winst).' },
      { text: 'Drie visserijen op de markt', relevant: false, explanation: 'Context, niet nodig voor de analyse.' }
    ],

    concepts: [
      { text: 'Speltheorie / dominante strategie', correct: true, explanation: 'Syrap heeft een dominante strategie: lagere prijs geeft altijd hogere winst.' },
      { text: 'Kartelstabiliteit / prikkel tot afwijken', correct: true, explanation: 'De vraag gaat over of het kartel stand houdt onder toetreding.' },
      { text: 'Oligopolie', correct: true, explanation: 'Een markt met enkele grote spelers is een oligopolie.' },
      { text: 'Elasticiteit', correct: false, explanation: 'Geen vraag over hoeveelheden bij prijsveranderingen.' },
      { text: 'Monetair beleid', correct: false, explanation: 'Niet relevant — het gaat over marktgedrag op een vismarkt.' }
    ],

    modelAnswer: 'Syrap kiest rationeel voor de lagere prijs. Bij lagere prijs is de winst €6 miljoen, bij kartelprijs €5 miljoen en zonder toetreding €0. Lagere prijs geeft altijd de hoogste winst voor Syrap — dit is dus Syraps dominante strategie. Hierdoor wordt het kartel minder stabiel: de kartelleden Dirdam en Nednol zien hun winst dalen van €10 naar €4 miljoen. De komst van een nieuwe toetreder die onder de kartelprijs duikt ondergraaft de kartelafspraak, omdat het kartel de hoge prijs niet meer kan handhaven.',
    keyPoints: ['Syrap kiest lagere prijs (€6 > €5 > €0)', 'dominante strategie', 'kartel wordt instabiel', 'winst kartelleden daalt van €10 naar €4 mln']
  },

  {
    id: 'exam-bbp-reeel',
    source: 'Gebaseerd op stijl VWO Economie 2023 tijdvak 1',
    domain: 'Welvaart & groei',
    context: `In land Eco bedroeg het bbp in 2020 €500 miljard (tegen prijzen van 2020). In 2023 bedroeg het bbp €580 miljard (tegen prijzen van 2023). De consumentenprijsindex (CPI) was 100 in 2020 en 115 in 2023. De bevolking groeide van 10 miljoen naar 10,5 miljoen personen.

De minister van Economische Zaken beweert dat "de welvaart in ons land de afgelopen drie jaar flink is gestegen, want het bbp is met 16% gegroeid".`,
    question: 'Beoordeel met een berekening of de bewering van de minister over de welvaartsstijging klopt. Bereken het reële bbp per hoofd in beide jaren.',

    dataItems: [
      { text: 'Nominaal bbp 2020: €500 miljard', relevant: true, explanation: 'Startpunt voor de berekening van het reële bbp.' },
      { text: 'Nominaal bbp 2023: €580 miljard', relevant: true, explanation: 'Dit moet gecorrigeerd worden voor inflatie.' },
      { text: 'CPI 2020 = 100, CPI 2023 = 115', relevant: true, explanation: 'Nodig om het reële bbp te berekenen (prijzen gestegen met 15%).' },
      { text: 'Bevolking: 10 mln (2020) en 10,5 mln (2023)', relevant: true, explanation: 'Nodig om het reële bbp per hoofd te berekenen.' },
      { text: 'De bewering van de minister van 16% groei', relevant: false, explanation: 'Dit is de bewering die we moeten beoordelen, geen gegeven voor de berekening zelf.' },
      { text: 'De minister heet Economische Zaken', relevant: false, explanation: 'Niet relevant voor de economische analyse.' }
    ],

    concepts: [
      { text: 'Reëel vs. nominaal bbp (inflatiecorrectie)', correct: true, explanation: 'De kern: je moet corrigeren voor prijsstijgingen.' },
      { text: 'Bbp per hoofd (welvaartsmaat)', correct: true, explanation: 'Voor welvaart moet je ook rekening houden met bevolkingsgroei.' },
      { text: 'Consumentenprijsindex / inflatie', correct: true, explanation: 'De CPI wordt gebruikt om te defleren.' },
      { text: 'Lorenz-curve en Gini-coëfficiënt', correct: false, explanation: 'Dit gaat over inkomensverdeling, niet over welvaartsgroei.' },
      { text: 'Multipliereffect', correct: false, explanation: 'Niet relevant — geen overheidsuitgaven of conjunctuuranalyse.' }
    ],

    modelAnswer: 'Reëel bbp 2023 = €580 mld × (100/115) = €504,3 mld (in prijzen van 2020). Reëel bbp per hoofd 2020 = 500/10 = €50.000. Reëel bbp per hoofd 2023 = 504,3/10,5 = €48.029. Het reële bbp per hoofd is dus gedaald met ongeveer 3,9%. De bewering van de minister klopt niet: de nominale groei van 16% is volledig verklaarbaar door prijsstijgingen (15%) en bevolkingsgroei (5%). De materiële welvaart per persoon is juist licht gedaald.',
    keyPoints: ['reëel bbp 2023 = 580 × 100/115 = €504 mld', 'reëel bbp per hoofd 2020: €50.000', 'reëel bbp per hoofd 2023: €48.029', 'lichte DALING per hoofd', 'bewering minister onjuist']
  },

  {
    id: 'exam-monetair',
    source: 'Gebaseerd op stijl VWO Economie 2024 tijdvak 1 (IS-MB-GA model)',
    domain: 'Conjunctuur',
    context: `Land Monetaria kent een open economie. De centrale bank heeft als doel prijsstabiliteit (inflatie rond 2%). In het afgelopen jaar is de inflatie opgelopen tot 5%, vooral doordat de binnenlandse vraag hoog blijft en de arbeidsmarkt krap is (werkloosheid 3%, onder het natuurlijke niveau van 5%).

Een econoom analyseert de situatie met het IS-MB-GA model. De IS-curve geeft de relatie tussen rente en output (Y), de MB-curve geeft het monetair beleid van de centrale bank, en de GA-curve geeft het kortetermijnaanbod (Phillips-curve).

De centrale bank verhoogt de beleidsrente van 2% naar 4%.`,
    question: 'Leg met behulp van het IS-MB-GA model uit wat er gebeurt met de output (Y) en de inflatie (π) op korte en middellange termijn.',

    dataItems: [
      { text: 'Inflatie is 5%, doel is 2%', relevant: true, explanation: 'Oorzaak van het restrictieve beleid.' },
      { text: 'Beleidsrente verhoogd van 2% naar 4%', relevant: true, explanation: 'De beleidsmaatregel die geanalyseerd moet worden.' },
      { text: 'Werkloosheid 3%, natuurlijk niveau 5%', relevant: true, explanation: 'Geeft aan dat de economie oververhit is; druk op lonen en prijzen.' },
      { text: 'Hoge binnenlandse vraag', relevant: true, explanation: 'Kernreden voor de inflatie — beleid beïnvloedt juist deze vraag.' },
      { text: 'Land Monetaria is een open economie', relevant: false, explanation: 'Wordt niet expliciet gebruikt in de basisanalyse met IS-MB-GA.' },
      { text: 'De centrale bank heet zo', relevant: false, explanation: 'Niet relevant voor de analyse.' }
    ],

    concepts: [
      { text: 'IS-MB-GA model (restrictief monetair beleid)', correct: true, explanation: 'De expliciet gevraagde analytische tool.' },
      { text: 'Phillipscurve (inflatie ↔ werkloosheid)', correct: true, explanation: 'De GA-curve komt hiervan — relatie output gap en inflatie.' },
      { text: 'Transmissiemechanisme monetair beleid', correct: true, explanation: 'Via hogere rente → minder C en I → lagere Y → lagere π.' },
      { text: 'Lorenz-curve', correct: false, explanation: 'Gaat over inkomensverdeling, niet conjunctuur.' },
      { text: 'Marktvormen / oligopolie', correct: false, explanation: 'Microeconomisch; de vraag is macro.' }
    ],

    modelAnswer: 'Op de korte termijn: de MB-curve verschuift naar boven (hogere rente bij elk inflatieniveau). Op de IS-curve leidt de hogere rente tot minder investeringen (I) en consumptie (C) op krediet, waardoor de output Y daalt. Door de lagere Y ontstaat een negatievere output gap: de druk op de arbeidsmarkt en grondstoffenmarkt neemt af. Via de GA-curve (Phillips-curve) daalt hierdoor ook de inflatie π. Op middellange termijn keert Y terug naar het natuurlijke niveau, terwijl de inflatie op het nieuwe, lagere niveau stabiliseert — het doel van de centrale bank.',
    keyPoints: ['MB-curve omhoog', 'IS: hogere rente → lagere C en I → lagere Y', 'negatievere output gap → minder druk', 'GA: lagere Y → lagere π', 'middellange termijn: Y terug naar natuurlijk niveau, π lager']
  },

  {
    id: 'exam-verzekering',
    source: 'Gebaseerd op stijl VWO Economie 2023 (Risico & informatie)',
    domain: 'Risico & informatie',
    context: `Verzekeraar Zekura biedt een nieuwe fietsverzekering aan. Bij het bepalen van de premie weet Zekura niet hoe risicovol iedere aanvrager is. Er zijn twee types fietsers: "voorzichtig" (kans op diefstal 5%) en "roekeloos" (kans op diefstal 25%). De gemiddelde waarde van een fiets is €800.

Zekura baseert de premie op het gemiddelde risico van de populatie (15% × €800 = €120 per jaar). Na een jaar blijkt dat vooral roekeloze fietsers de verzekering hebben afgesloten — de werkelijke claimkans onder de verzekerden is 22%. Zekura moet de premie verhogen, waardoor nog meer voorzichtige fietsers afhaken.`,
    question: 'Leg uit welk economisch verschijnsel hier speelt en waarom de verzekeringsmarkt hierdoor kan instorten.',

    dataItems: [
      { text: 'Twee types: voorzichtig (5%) en roekeloos (25%)', relevant: true, explanation: 'Verschil in risicoprofiel is de kern van het probleem.' },
      { text: 'Zekura kent het type van aanvrager niet', relevant: true, explanation: 'Dit is exact asymmetrische informatie.' },
      { text: 'Premie gebaseerd op gemiddelde: €120', relevant: true, explanation: 'Relevant: voor voorzichtige mensen is dit te duur.' },
      { text: 'Claimkans verzekerden: 22% (hoger dan gemiddeld)', relevant: true, explanation: 'Bewijs dat vooral hoge-risico klanten zich verzekeren.' },
      { text: 'Gemiddelde fietswaarde €800', relevant: false, explanation: 'Nodig voor premieberekening maar niet voor de uitleg van het verschijnsel zelf.' },
      { text: 'De verzekering heet fietsverzekering', relevant: false, explanation: 'Context, niet relevant voor het concept.' }
    ],

    concepts: [
      { text: 'Averechtse selectie (adverse selection)', correct: true, explanation: 'Dit is precies wat er beschreven wordt.' },
      { text: 'Asymmetrische informatie', correct: true, explanation: 'De onderliggende oorzaak: verzekeraar weet minder dan klant.' },
      { text: 'Moral hazard', correct: false, explanation: 'Moral hazard speelt ná afsluiten (gedragsverandering), hier gaat het om selectie vooraf.' },
      { text: 'Externaliteiten', correct: false, explanation: 'Geen kosten die op derden afgewenteld worden.' },
      { text: 'Speltheorie', correct: false, explanation: 'Geen strategische interactie tussen spelers.' }
    ],

    modelAnswer: 'Er is sprake van averechtse selectie, veroorzaakt door asymmetrische informatie. De verzekeraar kan voorzichtige en roekeloze fietsers niet onderscheiden en zet daarom de premie op het gemiddelde. Voor voorzichtige fietsers (risico 5%) is deze premie te hoog — zij haken af. Roekeloze fietsers (risico 25%) blijven, want voor hen is de premie juist gunstig. Het risicoprofiel van de verzekerden wordt steeds ongunstiger, de premie moet verder omhoog, waardoor nog meer voorzichtige mensen afhaken. Deze spiraal kan de markt laten instorten: uiteindelijk is verzekering niet meer rendabel aan te bieden.',
    keyPoints: ['averechtse selectie', 'asymmetrische informatie', 'voorzichtige klanten haken af', 'premie moet steeds omhoog', 'spiraal → markt kan instorten']
  }
];



// ============================================
// VRAGENBANK - Geordend per domein (vwo 2026)
// Domeinen D-I van de syllabus
// ============================================
const QUESTIONS = [
  // DOMEIN D - MARKT
  {
    id: 'd1',
    domain: 'Markt',
    type: 'mc',
    difficulty: 2,
    question: 'De prijselasticiteit van de vraag naar luxe horloges is -2,5. Wat betekent dit?',
    options: [
      'Bij een prijsdaling van 1% stijgt de gevraagde hoeveelheid met 2,5%',
      'Bij een prijsstijging van 1% stijgt de gevraagde hoeveelheid met 2,5%',
      'Bij een prijsdaling van 2,5% stijgt de gevraagde hoeveelheid met 1%',
      'De vraag is inelastisch'
    ],
    correct: 0,
    explanation: 'Een prijselasticiteit van -2,5 betekent: %verandering hoeveelheid / %verandering prijs = -2,5. Bij een prijsdaling van 1% (negatief) stijgt de hoeveelheid met 2,5% (positief). Het minteken geeft de tegengestelde richting aan, de absolute waarde >1 betekent elastische vraag — typisch voor luxegoederen.'
  },
  {
    id: 'd2',
    domain: 'Markt',
    type: 'open',
    difficulty: 3,
    question: 'Leg uit waarom een monopolist een lagere productie en hogere prijs kiest dan zou ontstaan bij volkomen concurrentie.',
    modelAnswer: 'Een monopolist maximaliseert winst waar MO = MK. Omdat de monopolist de hele marktvraag bedient, ligt zijn MO-curve onder de vraagcurve (om meer te verkopen moet hij de prijs voor alle eenheden verlagen). Het snijpunt MO=MK ligt daardoor bij een lagere hoeveelheid. Bij die lagere hoeveelheid hoort op de vraagcurve een hogere prijs. Bij volkomen concurrentie geldt P = MO = MK, wat leidt tot een grotere productie en lagere evenwichtsprijs.',
    keyPoints: ['MO=MK regel', 'MO-curve onder vraagcurve', 'lagere Q dus hogere P', 'vergelijking met P=MK bij volkomen concurrentie']
  },
  {
    id: 'd3',
    domain: 'Markt',
    type: 'mc',
    difficulty: 1,
    question: 'Welke marktvorm kenmerkt zich door veel aanbieders en een homogeen product?',
    options: ['Monopolie', 'Oligopolie', 'Monopolistische concurrentie', 'Volkomen concurrentie'],
    correct: 3,
    explanation: 'Volkomen concurrentie kent veel aanbieders, een homogeen product, vrije toetreding en volledige transparantie. Geen enkele aanbieder kan de prijs beïnvloeden — ze zijn allemaal prijsnemers.'
  },
  {
    id: 'd4',
    domain: 'Markt',
    type: 'open',
    difficulty: 2,
    question: 'Bereken het consumentensurplus als de evenwichtsprijs €20 is, de evenwichtshoeveelheid 100 stuks, en de maximale prijs die consumenten zouden willen betalen €50 is. Ga uit van een lineaire vraagcurve.',
    modelAnswer: 'Consumentensurplus = oppervlakte van de driehoek tussen vraagcurve en evenwichtsprijs. Hoogte = €50 - €20 = €30. Basis = 100 stuks. CS = ½ × 30 × 100 = €1.500.',
    keyPoints: ['driehoek tussen vraagcurve en prijs', 'hoogte = max prijs - evenwichtsprijs', '½ × basis × hoogte', 'antwoord €1.500']
  },

  // DOMEIN E - RUILEN OVER DE TIJD
  {
    id: 'e1',
    domain: 'Ruilen over de tijd',
    type: 'mc',
    difficulty: 2,
    question: 'Je krijgt over 3 jaar €1.000. De rente is 4% per jaar. Wat is de contante waarde (afgerond)?',
    options: ['€889', '€960', '€1.000', '€1.125'],
    correct: 0,
    explanation: 'Contante waarde = Toekomstige waarde / (1+r)^n = 1.000 / (1,04)^3 = 1.000 / 1,1249 ≈ €889. Dit is wat je vandaag opzij zou moeten zetten om over 3 jaar €1.000 te hebben.'
  },
  {
    id: 'e2',
    domain: 'Ruilen over de tijd',
    type: 'open',
    difficulty: 3,
    question: 'Leg uit waarom de centrale bank de rente kan verhogen om inflatie te bestrijden.',
    modelAnswer: 'Een hogere rente maakt lenen duurder en sparen aantrekkelijker. Hierdoor dalen consumptie en investeringen (lagere bestedingen). De effectieve vraag in de economie neemt af, waardoor de opwaartse druk op prijzen vermindert. Daarnaast kan een hogere rente leiden tot appreciatie van de munt, wat import goedkoper maakt en de inflatie verder dempt.',
    keyPoints: ['lenen duurder, sparen aantrekkelijker', 'minder C en I', 'lagere effectieve vraag', 'minder prijsdruk', 'eventueel: wisselkoerseffect']
  },
  {
    id: 'e3',
    domain: 'Ruilen over de tijd',
    type: 'mc',
    difficulty: 2,
    question: 'Wat gebeurt er met de reële rente als de nominale rente 5% is en de inflatie stijgt van 2% naar 4%?',
    options: ['De reële rente stijgt van 3% naar 1%', 'De reële rente daalt van 3% naar 1%', 'De reële rente blijft 3%', 'De reële rente stijgt naar 9%'],
    correct: 1,
    explanation: 'Reële rente ≈ nominale rente - inflatie. Eerst: 5% - 2% = 3%. Daarna: 5% - 4% = 1%. De reële rente daalt dus, ook al is de nominale rente onveranderd. Spaarders verliezen koopkracht.'
  },

  // DOMEIN F - SAMENWERKEN EN ONDERHANDELEN
  {
    id: 'f1',
    domain: 'Samenwerken & onderhandelen',
    type: 'mc',
    difficulty: 3,
    question: 'In het gevangenendilemma kiezen beide spelers voor "verraden" terwijl "zwijgen" voor beiden beter zou zijn. Hoe noem je dit fenomeen?',
    options: ['Pareto-optimaal', 'Nash-evenwicht dat niet Pareto-efficiënt is', 'Dominant evenwicht dat ook Pareto-optimaal is', 'Marktfalen door externaliteiten'],
    correct: 1,
    explanation: 'Verraden-verraden is een Nash-evenwicht: gegeven de keuze van de ander kan geen speler eenzijdig verbeteren door af te wijken. Maar het is niet Pareto-efficiënt, want zwijgen-zwijgen zou voor beiden beter zijn. Dit illustreert hoe individueel rationeel gedrag tot collectief slechtere uitkomsten kan leiden.'
  },
  {
    id: 'f2',
    domain: 'Samenwerken & onderhandelen',
    type: 'open',
    difficulty: 3,
    question: 'Leg uit waarom een kartelafspraak tussen twee oligopolisten vaak instabiel is.',
    modelAnswer: 'Een kartel beperkt productie om de prijs hoog te houden. Voor elke individuele deelnemer is er echter een prikkel om af te wijken: door net iets meer te produceren tegen de hoge kartelprijs kan hij extra winst maken, zolang de ander zich aan de afspraak houdt. Omdat beide partijen deze prikkel hebben, breekt het kartel af (gevangenendilemma-structuur). Daarnaast zijn kartels vaak verboden, wat afdwinging via de rechter onmogelijk maakt.',
    keyPoints: ['individuele prikkel om af te wijken', 'meer winst bij extra productie tegen hoge prijs', 'gevangenendilemma-structuur', 'geen juridische afdwinging mogelijk']
  },

  // DOMEIN G - RISICO EN INFORMATIE
  {
    id: 'g1',
    domain: 'Risico & informatie',
    type: 'mc',
    difficulty: 3,
    question: 'Een verzekeringsmaatschappij merkt dat vooral mensen met een hoog risico zich verzekeren. Hoe heet dit verschijnsel?',
    options: ['Moral hazard', 'Averechtse selectie', 'Asymmetrische informatie', 'Free-rider probleem'],
    correct: 1,
    explanation: 'Averechtse selectie (adverse selection) ontstaat vóór het sluiten van het contract: door asymmetrische informatie kiezen vooral hoogrisicoklanten voor de verzekering. Moral hazard speelt ná het sluiten van het contract — verzekerden gedragen zich risicovoller omdat ze toch verzekerd zijn.'
  },
  {
    id: 'g2',
    domain: 'Risico & informatie',
    type: 'open',
    difficulty: 2,
    question: 'Verklaar waarom een aandeel doorgaans een hoger verwacht rendement heeft dan een staatsobligatie.',
    modelAnswer: 'Een aandeel is risicovoller dan een staatsobligatie: het rendement hangt af van de winst van het bedrijf en de aandeelkoers kan dalen of zelfs naar nul gaan bij faillissement. Bij een staatsobligatie is de kans op wanbetaling klein (zeker bij stabiele staten). Beleggers eisen een risicopremie als compensatie voor het hogere risico, waardoor het verwachte rendement op aandelen hoger ligt.',
    keyPoints: ['aandeel risicovoller', 'kans op koersdaling/faillissement', 'risicopremie als compensatie', 'staatsobligatie relatief veilig']
  },

  // DOMEIN H - WELVAART EN GROEI
  {
    id: 'h1',
    domain: 'Welvaart & groei',
    type: 'mc',
    difficulty: 2,
    question: 'Welke methode om het BBP te berekenen telt loon, winst, rente en huur op?',
    options: ['Bestedingsmethode', 'Objectieve methode', 'Subjectieve methode', 'Toegevoegde waarde-methode'],
    correct: 2,
    explanation: 'De subjectieve (inkomens)methode telt arbeidsinkomen + kapitaalinkomen + afschrijvingen op. Bestedingsmethode = C+I+O+E-M. Objectieve methode = som van toegevoegde waarde. Alle drie geven hetzelfde BBP.'
  },
  {
    id: 'h2',
    domain: 'Welvaart & groei',
    type: 'open',
    difficulty: 3,
    question: 'Leg uit hoe een progressief belastingstelsel inkomensongelijkheid kan verminderen, en noem één nadeel.',
    modelAnswer: 'In een progressief belastingstelsel betalen hogere inkomens een hoger percentage belasting. Dit nivelleert de besteedbare inkomens: het verschil tussen hoge en lage inkomens wordt na belasting kleiner, wat zichtbaar wordt in een Lorenz-curve die dichter bij de diagonaal komt. Een nadeel is dat de prikkel om meer te werken of te ondernemen kan afnemen voor hogere inkomens (verminderde arbeidsaanbod), wat de economische groei kan remmen.',
    keyPoints: ['hogere inkomens hoger %', 'kleiner verschil besteedbaar inkomen', 'Lorenz-curve dichter bij diagonaal', 'nadeel: prikkel werken/ondernemen']
  },
  {
    id: 'h3',
    domain: 'Welvaart & groei',
    type: 'mc',
    difficulty: 2,
    question: 'De Lorenz-curve van land A ligt verder van de diagonaal dan die van land B. Wat betekent dit?',
    options: [
      'Land A heeft een gelijkere inkomensverdeling',
      'Land A heeft een hogere inkomensongelijkheid',
      'Land A heeft een hoger BBP',
      'Land A heeft een lagere ginicoëfficiënt'
    ],
    correct: 1,
    explanation: 'Hoe verder de Lorenz-curve van de diagonaal (= perfecte gelijkheid), hoe groter de inkomensongelijkheid. Land A heeft dus een hogere ginicoëfficiënt en meer ongelijkheid dan land B.'
  },

  // DOMEIN I - GOEDE TIJDEN, SLECHTE TIJDEN (Conjunctuur)
  {
    id: 'i1',
    domain: 'Conjunctuur',
    type: 'mc',
    difficulty: 2,
    question: 'In een laagconjunctuur kiest de overheid voor anticyclisch begrotingsbeleid. Wat doet zij?',
    options: [
      'Bezuinigen om het tekort te beperken',
      'Belastingen verhogen om koopkracht te verlagen',
      'Bestedingen verhogen of belastingen verlagen om de vraag te stimuleren',
      'Niets, de markt herstelt zich vanzelf'
    ],
    correct: 2,
    explanation: 'Anticyclisch beleid werkt tegen de conjunctuur in. In een laagconjunctuur stimuleert de overheid de effectieve vraag door meer uit te geven of belastingen te verlagen. Dit kan tijdelijk het begrotingstekort vergroten (Keynesiaanse benadering).'
  },
  {
    id: 'i2',
    domain: 'Conjunctuur',
    type: 'open',
    difficulty: 4,
    question: 'Leg met behulp van het IS-MB-GA model uit wat er gebeurt met de output (Y) en de inflatie (π) als de centrale bank een restrictief monetair beleid voert.',
    modelAnswer: 'Bij restrictief monetair beleid verhoogt de centrale bank de rente: de MB-curve verschuift naar boven (hogere rente bij elke inflatie). Op de IS-curve leidt een hogere rente tot lagere investeringen en consumptie, dus daalt Y. Door de lagere Y daalt de druk op de arbeidsmarkt en grondstoffen, waardoor via de GA-curve (geaggregeerd aanbod / Phillipscurve) ook de inflatie π daalt. Eindresultaat: lagere Y én lagere π — beleid is geschikt om oververhitting te bestrijden.',
    keyPoints: ['MB-curve omhoog (hogere rente)', 'IS: hogere rente → lagere I en C → lagere Y', 'lagere Y → minder druk → lagere inflatie via GA', 'conclusie: zowel Y als π dalen']
  },
  {
    id: 'i3',
    domain: 'Conjunctuur',
    type: 'mc',
    difficulty: 2,
    question: 'Wat is een automatische stabilisator?',
    options: [
      'Een wet die de centrale bank verplicht de rente bij te stellen',
      'Een begrotingspost die zonder beleidsbesluit meebeweegt met de conjunctuur en deze dempt',
      'Een afspraak tussen bedrijven om prijzen stabiel te houden',
      'Een vast wisselkoersregime'
    ],
    correct: 1,
    explanation: 'Automatische stabilisatoren zijn zaken als progressieve belastingen en WW-uitkeringen die zonder nieuwe beleidsbesluiten conjunctuurschommelingen dempen. In een hoogconjunctuur stijgen belastinginkomsten automatisch (afremmend); in een laagconjunctuur stijgen WW-uitgaven automatisch (stimulerend).'
  },
  {
    id: 'i4',
    domain: 'Conjunctuur',
    type: 'open',
    difficulty: 3,
    question: 'Verklaar het multipliereffect: waarom leidt €1 miljard extra overheidsuitgaven tot meer dan €1 miljard extra BBP?',
    modelAnswer: 'De extra overheidsuitgave (€1 mld) wordt inkomen voor bedrijven en huishoudens. Een deel daarvan (de marginale consumptiequote, c) wordt opnieuw besteed. Die bestedingen worden weer inkomen voor anderen, die daar opnieuw een deel van uitgeven, enzovoort. De totale toename = 1/(1-c) × oorspronkelijke impuls. Bij c=0,6 is de multiplier 2,5, dus €1 mld extra uitgaven leidt tot €2,5 mld extra BBP. Lekken (sparen, belasting, import) verkleinen de multiplier.',
    keyPoints: ['extra uitgave wordt inkomen', 'deel wordt opnieuw besteed', 'opeenvolgende rondes', 'multiplier = 1/(1-c)', 'lekken verkleinen effect']
  }
];

// ============================================
// LOCAL STORAGE HELPERS
// ============================================
const STORAGE_KEY = 'economie-bijles-progress';

const loadProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
};

const saveProgressToStorage = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Kon voortgang niet opslaan', e);
  }
};

// ============================================
// SPACED REPETITION - SM-2 algoritme (vereenvoudigd)
// ============================================
const calculateNextReview = (quality, prevInterval = 0, prevEase = 2.5) => {
  let ease = prevEase;
  let interval;

  if (quality < 3) {
    interval = 1;
    ease = Math.max(1.3, prevEase - 0.2);
  } else {
    if (prevInterval === 0) interval = 1;
    else if (prevInterval === 1) interval = 3;
    else interval = Math.round(prevInterval * ease);
    ease = prevEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    ease = Math.max(1.3, ease);
  }

  return { interval, ease, nextReview: Date.now() + interval * 24 * 60 * 60 * 1000 };
};

// ============================================
// HOOFDCOMPONENT
// ============================================
export default function App() {
  const [view, setView] = useState('home');
  const [progress, setProgress] = useState({});
  const [currentSession, setCurrentSession] = useState(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const saveProgress = (newProgress) => {
    setProgress(newProgress);
    saveProgressToStorage(newProgress);
  };

  const domains = [...new Set(QUESTIONS.map(q => q.domain))];

  const dueQuestions = QUESTIONS.filter(q => {
    const p = progress[q.id];
    if (!p) return true;
    return !p.nextReview || p.nextReview <= Date.now();
  });

  if (view === 'practice' && currentSession) {
    return <PracticeView
      session={currentSession}
      progress={progress}
      onAnswer={(qId, quality, flagged) => {
        const prev = progress[qId] || { attempts: 0, correct: 0, ease: 2.5, interval: 0, flagged: false };
        const result = calculateNextReview(quality, prev.interval, prev.ease);
        const newProgress = {
          ...progress,
          [qId]: {
            ...prev,
            attempts: prev.attempts + 1,
            correct: prev.correct + (quality >= 3 ? 1 : 0),
            ...result,
            flagged: flagged !== undefined ? flagged : prev.flagged,
            lastSeen: Date.now()
          }
        };
        saveProgress(newProgress);
      }}
      onFinish={() => { setCurrentSession(null); setView('home'); }}
    />;
  }

  if (view === 'exam' && currentSession) {
    return <ExamView
      session={currentSession}
      onFinish={(results) => {
        const newProgress = { ...progress };
        results.forEach(r => {
          const prev = newProgress[r.questionId] || { attempts: 0, correct: 0, ease: 2.5, interval: 0, flagged: false };
          const calc = calculateNextReview(r.quality, prev.interval, prev.ease);
          newProgress[r.questionId] = {
            ...prev,
            attempts: prev.attempts + 1,
            correct: prev.correct + (r.quality >= 3 ? 1 : 0),
            ...calc,
            lastSeen: Date.now()
          };
        });
        saveProgress(newProgress);
        setCurrentSession(null);
        setView('home');
      }}
    />;
  }

  if (view === 'stats') {
    return <StatsView progress={progress} domains={domains} onBack={() => setView('home')} />;
  }

  if (view === 'decode' && currentSession) {
    return <DecodeView
      session={currentSession}
      onFinish={(results) => {
        const newProgress = { ...progress };
        results.forEach(r => {
          const prev = newProgress[r.questionId] || { attempts: 0, correct: 0, ease: 2.5, interval: 0, flagged: false };
          const calc = calculateNextReview(r.quality, prev.interval, prev.ease);
          newProgress[r.questionId] = {
            ...prev,
            attempts: prev.attempts + 1,
            correct: prev.correct + (r.quality >= 3 ? 1 : 0),
            ...calc,
            lastSeen: Date.now()
          };
        });
        saveProgress(newProgress);
        setCurrentSession(null);
        setView('home');
      }}
    />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f1e8', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">

        <header className="mb-12 border-b-2 pb-6" style={{ borderColor: '#1a3a2e' }}>
          <div className="flex items-baseline justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-5xl font-bold tracking-tight" style={{ color: '#1a3a2e', fontFamily: 'Georgia, serif' }}>
                Economie<span style={{ color: '#c9a961' }}>·</span>vwo
              </h1>
              <p className="mt-2 text-sm uppercase tracking-widest" style={{ color: '#6b6b6b' }}>
                Eindexamentraining · Donderdag 21 mei 2026
              </p>
            </div>
            <button
              onClick={() => setView('stats')}
              className="flex items-center gap-2 px-4 py-2 border-2 hover:bg-white transition-colors"
              style={{ borderColor: '#1a3a2e', color: '#1a3a2e' }}
            >
              <BarChart3 size={16} />
              <span className="text-sm uppercase tracking-wider">Voortgang</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <StatBox
            label="Vandaag te oefenen"
            value={dueQuestions.length}
            sublabel={`van ${QUESTIONS.length} totaal`}
            icon={<Calendar size={20} />}
            highlight
          />
          <StatBox
            label="Beheerst"
            value={Object.values(progress).filter(p => p.correct >= 2 && p.correct/p.attempts >= 0.7).length}
            sublabel="goed beantwoord ≥2x"
            icon={<Award size={20} />}
          />
          <StatBox
            label="Lastig"
            value={Object.values(progress).filter(p => p.attempts > 0 && p.correct/p.attempts < 0.5).length}
            sublabel="terugkeer aanbevolen"
            icon={<AlertCircle size={20} />}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <ActionCard
            title="Vraag ontleden"
            subtitle="Examenvraag analyseren"
            description="Leer een casus te ontleden: welke gegevens zijn relevant en welk model is nodig? Pas dán antwoord geven."
            icon={<Search size={24} />}
            buttonText={`Start (${EXAM_QUESTIONS.length} opgaven)`}
            onClick={() => {
              const shuffled = [...EXAM_QUESTIONS].sort(() => Math.random() - 0.5);
              setCurrentSession({ questions: shuffled });
              setView('decode');
            }}
            accent
          />

          <ActionCard
            title="Slim oefenen"
            subtitle="Spaced repetition"
            description="Vragen die je vandaag moet herhalen, automatisch geselecteerd op basis van je eerdere prestaties."
            icon={<Target size={24} />}
            buttonText={dueQuestions.length > 0 ? `Start (${dueQuestions.length} vragen)` : 'Niets te herhalen'}
            disabled={dueQuestions.length === 0}
            onClick={() => {
              setCurrentSession({ questions: dueQuestions.slice(0, 10), mode: 'practice' });
              setView('practice');
            }}
            primary
          />

          <ActionCard
            title="Examen-modus"
            subtitle="Met tijdsdruk"
            description="Gemengde set vragen onder tijdsdruk, zoals op het echte examen. Geen feedback tussendoor."
            icon={<Clock size={24} />}
            buttonText="Start (10 vragen, 25 min)"
            onClick={() => {
              const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 10);
              setCurrentSession({ questions: shuffled, mode: 'exam', timeLimit: 25 * 60 });
              setView('exam');
            }}
          />
        </div>

        <div className="mb-10">
          <h2 className="text-xs uppercase tracking-widest mb-4" style={{ color: '#6b6b6b' }}>
            Oefenen per domein
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {domains.map(domain => {
              const domainQs = QUESTIONS.filter(q => q.domain === domain);
              const correct = domainQs.filter(q => {
                const p = progress[q.id];
                return p && p.attempts > 0 && p.correct / p.attempts >= 0.7;
              });
              const pct = domainQs.length > 0 ? Math.round((correct.length / domainQs.length) * 100) : 0;

              return (
                <button
                  key={domain}
                  onClick={() => {
                    setCurrentSession({ questions: domainQs, mode: 'practice' });
                    setView('practice');
                  }}
                  className="text-left p-4 bg-white border-2 hover:border-current transition-all group"
                  style={{ borderColor: '#e0d8c7' }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg" style={{ color: '#1a3a2e' }}>{domain}</h3>
                    <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#1a3a2e' }} />
                  </div>
                  <div className="flex items-center justify-between text-sm" style={{ color: '#6b6b6b' }}>
                    <span>{domainQs.length} vragen</span>
                    <span className="font-bold" style={{ color: pct >= 70 ? '#1a6b3e' : pct >= 40 ? '#c9a961' : '#a04040' }}>
                      {pct}% beheerst
                    </span>
                  </div>
                  <div className="mt-2 h-1 bg-gray-100 overflow-hidden">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: pct >= 70 ? '#1a6b3e' : pct >= 40 ? '#c9a961' : '#a04040' }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {Object.entries(progress).filter(([_, p]) => p.flagged).length > 0 && (
          <div className="mb-10 p-6 border-l-4" style={{ borderColor: '#c9a961', backgroundColor: '#fdf9ef' }}>
            <div className="flex items-center gap-2 mb-3">
              <Flag size={18} style={{ color: '#c9a961' }} />
              <h3 className="font-bold uppercase tracking-wider text-sm" style={{ color: '#1a3a2e' }}>
                Bespreken met bijlesdocent
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: '#4a4a4a' }}>
              {Object.entries(progress).filter(([_, p]) => p.flagged).length} vragen gemarkeerd. Bekijk ze samen tijdens de bijles.
            </p>
            <button
              onClick={() => {
                const flagged = QUESTIONS.filter(q => progress[q.id]?.flagged);
                setCurrentSession({ questions: flagged, mode: 'practice' });
                setView('practice');
              }}
              className="text-sm underline"
              style={{ color: '#1a3a2e' }}
            >
              → Bekijk gemarkeerde vragen
            </button>
          </div>
        )}

        <footer className="text-xs text-center pt-6 border-t" style={{ color: '#9a9a9a', borderColor: '#e0d8c7' }}>
          Voortgang wordt automatisch lokaal opgeslagen op dit apparaat
        </footer>
      </div>
    </div>
  );
}

function StatBox({ label, value, sublabel, icon, highlight }) {
  return (
    <div
      className="p-5 border-2"
      style={{
        backgroundColor: highlight ? '#1a3a2e' : 'white',
        borderColor: '#1a3a2e',
        color: highlight ? '#f5f1e8' : '#1a3a2e'
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs uppercase tracking-widest opacity-80">{label}</span>
        {icon}
      </div>
      <div className="text-4xl font-bold">{value}</div>
      <div className="text-xs mt-1 opacity-70">{sublabel}</div>
    </div>
  );
}

function ActionCard({ title, subtitle, description, icon, buttonText, onClick, primary, accent, disabled }) {
  const bgColor = primary ? '#1a3a2e' : accent ? '#c9a961' : 'white';
  const textColor = primary || accent ? '#f5f1e8' : '#1a3a2e';
  const btnBg = primary ? '#c9a961' : accent ? '#1a3a2e' : 'transparent';
  const btnText = primary ? '#1a3a2e' : accent ? '#f5f1e8' : '#1a3a2e';

  return (
    <div
      className="p-6 border-2 flex flex-col"
      style={{
        backgroundColor: bgColor,
        borderColor: '#1a3a2e',
        color: accent ? '#1a3a2e' : textColor
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs uppercase tracking-widest opacity-70">{subtitle}</div>
          <h3 className="text-2xl font-bold mt-1">{title}</h3>
        </div>
        {icon}
      </div>
      <p className="text-sm opacity-90 mb-6 flex-grow">{description}</p>
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full py-3 px-4 border-2 font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-80"
        style={{
          borderColor: accent ? '#1a3a2e' : primary ? '#f5f1e8' : '#1a3a2e',
          backgroundColor: btnBg,
          color: btnText
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

function PracticeView({ session, progress, onAnswer, onFinish }) {
  const [index, setIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selfRating, setSelfRating] = useState(null);
  const [isFlagged, setIsFlagged] = useState(false);

  const q = session.questions[index];

  useEffect(() => {
    if (q) setIsFlagged(progress[q.id]?.flagged || false);
  }, [q?.id]);

  if (!q) return null;

  const handleSubmit = () => {
    setShowAnswer(true);
    if (q.type === 'mc') {
      const quality = selectedOption === q.correct ? 5 : 1;
      onAnswer(q.id, quality, isFlagged);
    }
  };

  const handleSelfRate = (quality) => {
    setSelfRating(quality);
    onAnswer(q.id, quality, isFlagged);
  };

  const handleNext = () => {
    if (index + 1 >= session.questions.length) {
      onFinish();
    } else {
      setIndex(index + 1);
      setUserAnswer('');
      setSelectedOption(null);
      setShowAnswer(false);
      setSelfRating(null);
    }
  };

  const toggleFlag = () => {
    const newFlag = !isFlagged;
    setIsFlagged(newFlag);
    const prev = progress[q.id] || { attempts: 0, correct: 0, ease: 2.5, interval: 0 };
    onAnswer(q.id, prev.attempts > 0 ? 3 : 3, newFlag);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f1e8', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-3xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-6">
          <button onClick={onFinish} className="flex items-center gap-2 text-sm" style={{ color: '#1a3a2e' }}>
            <Home size={16} /> Stoppen
          </button>
          <div className="text-sm" style={{ color: '#6b6b6b' }}>
            Vraag {index + 1} / {session.questions.length}
          </div>
          <button onClick={toggleFlag} className="flex items-center gap-1 text-sm" style={{ color: isFlagged ? '#c9a961' : '#6b6b6b' }}>
            <Flag size={16} fill={isFlagged ? '#c9a961' : 'none'} />
            {isFlagged ? 'Gemarkeerd' : 'Markeer'}
          </button>
        </div>

        <div className="h-1 bg-white mb-8">
          <div
            className="h-full transition-all"
            style={{ width: `${((index + 1) / session.questions.length) * 100}%`, backgroundColor: '#1a3a2e' }}
          />
        </div>

        <div className="mb-4 text-xs uppercase tracking-widest" style={{ color: '#c9a961' }}>
          {q.domain} · Niveau {q.difficulty}/4 · {q.type === 'mc' ? 'Meerkeuze' : 'Open vraag'}
        </div>

        <div className="bg-white p-8 mb-6 border-2" style={{ borderColor: '#1a3a2e' }}>
          <p className="text-xl leading-relaxed" style={{ color: '#1a3a2e' }}>{q.question}</p>
        </div>

        {q.type === 'mc' ? (
          <div className="space-y-2 mb-6">
            {q.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              const isCorrect = i === q.correct;
              const showFeedback = showAnswer;

              let bgColor = 'white';
              let borderColor = '#e0d8c7';
              if (showFeedback && isCorrect) { bgColor = '#e8f4ec'; borderColor = '#1a6b3e'; }
              else if (showFeedback && isSelected && !isCorrect) { bgColor = '#fce8e8'; borderColor = '#a04040'; }
              else if (isSelected) { borderColor = '#1a3a2e'; }

              return (
                <button
                  key={i}
                  onClick={() => !showAnswer && setSelectedOption(i)}
                  disabled={showAnswer}
                  className="w-full text-left p-4 border-2 transition-all flex items-center gap-3"
                  style={{ backgroundColor: bgColor, borderColor }}
                >
                  <div className="w-6 h-6 border-2 flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ borderColor: '#1a3a2e' }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="flex-grow" style={{ color: '#1a3a2e' }}>{opt}</span>
                  {showFeedback && isCorrect && <Check size={20} style={{ color: '#1a6b3e' }} />}
                  {showFeedback && isSelected && !isCorrect && <X size={20} style={{ color: '#a04040' }} />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mb-6">
            <textarea
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              disabled={showAnswer}
              placeholder="Typ hier je antwoord. Probeer het volledig op te schrijven voordat je het modelantwoord bekijkt — dat helpt het beste om het te onthouden."
              className="w-full p-4 border-2 min-h-[150px] focus:outline-none"
              style={{ backgroundColor: 'white', borderColor: '#e0d8c7', color: '#1a3a2e', fontFamily: 'Georgia, serif' }}
            />
          </div>
        )}

        {!showAnswer ? (
          <button
            onClick={handleSubmit}
            disabled={q.type === 'mc' ? selectedOption === null : userAnswer.trim().length < 5}
            className="w-full py-4 font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#1a3a2e', color: '#f5f1e8' }}
          >
            {q.type === 'mc' ? 'Controleer antwoord' : 'Toon modelantwoord'}
          </button>
        ) : (
          <div>
            <div className="bg-white border-l-4 p-6 mb-4" style={{ borderColor: '#c9a961' }}>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ color: '#c9a961' }}>
                {q.type === 'mc' ? 'Uitleg' : 'Modelantwoord'}
              </div>
              {q.type === 'open' ? (
                <>
                  <p className="leading-relaxed mb-4" style={{ color: '#1a3a2e' }}>{q.modelAnswer}</p>
                  <div className="text-sm border-t pt-3" style={{ borderColor: '#e0d8c7', color: '#6b6b6b' }}>
                    <strong>Belangrijkste punten:</strong> {q.keyPoints.join(' · ')}
                  </div>
                </>
              ) : (
                <p className="leading-relaxed" style={{ color: '#1a3a2e' }}>{q.explanation}</p>
              )}
            </div>

            {q.type === 'open' && selfRating === null && (
              <div className="bg-white p-6 mb-4 border-2" style={{ borderColor: '#1a3a2e' }}>
                <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#1a3a2e' }}>
                  Hoe goed was jouw antwoord?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => handleSelfRate(1)} className="py-3 border-2 hover:bg-red-50 transition-colors" style={{ borderColor: '#a04040', color: '#a04040' }}>
                    <div className="font-bold">Fout</div>
                    <div className="text-xs">morgen opnieuw</div>
                  </button>
                  <button onClick={() => handleSelfRate(3)} className="py-3 border-2 hover:bg-yellow-50 transition-colors" style={{ borderColor: '#c9a961', color: '#c9a961' }}>
                    <div className="font-bold">Deels</div>
                    <div className="text-xs">over een paar dagen</div>
                  </button>
                  <button onClick={() => handleSelfRate(5)} className="py-3 border-2 hover:bg-green-50 transition-colors" style={{ borderColor: '#1a6b3e', color: '#1a6b3e' }}>
                    <div className="font-bold">Goed</div>
                    <div className="text-xs">over een week+</div>
                  </button>
                </div>
              </div>
            )}

            {(q.type === 'mc' || selfRating !== null) && (
              <button
                onClick={handleNext}
                className="w-full py-4 font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                style={{ backgroundColor: '#c9a961', color: '#1a3a2e' }}
              >
                {index + 1 >= session.questions.length ? 'Klaar' : 'Volgende vraag'}
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ExamView({ session, onFinish }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(session.timeLimit);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || showResults) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, showResults]);

  useEffect(() => {
    if (timeLeft <= 0) setShowResults(true);
  }, [timeLeft]);

  const q = session.questions[index];

  const submitResults = () => {
    const results = session.questions.map(question => {
      const ans = answers[question.id];
      let quality;
      if (question.type === 'mc') {
        quality = ans === question.correct ? 5 : 1;
      } else {
        quality = ans?.selfRating ?? 1;
      }
      return { questionId: question.id, quality };
    });
    onFinish(results);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (showResults) {
    const totalMC = session.questions.filter(x => x.type === 'mc').length;
    const correctMC = session.questions.filter(x => x.type === 'mc' && answers[x.id] === x.correct).length;
    const totalOpen = session.questions.filter(x => x.type === 'open').length;
    const answeredOpen = session.questions.filter(x => x.type === 'open' && answers[x.id]?.text).length;

    return (
      <div className="min-h-screen" style={{ backgroundColor: '#f5f1e8', fontFamily: 'Georgia, serif' }}>
        <div className="max-w-3xl mx-auto px-6 py-10">
          <h2 className="text-3xl font-bold mb-2" style={{ color: '#1a3a2e' }}>Examen voltooid</h2>
          <p className="mb-8" style={{ color: '#6b6b6b' }}>Tijd over: {minutes}:{String(seconds).padStart(2, '0')}</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white p-6 border-2" style={{ borderColor: '#1a3a2e' }}>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#6b6b6b' }}>Meerkeuze</div>
              <div className="text-4xl font-bold" style={{ color: '#1a3a2e' }}>{correctMC}/{totalMC}</div>
            </div>
            <div className="bg-white p-6 border-2" style={{ borderColor: '#1a3a2e' }}>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#6b6b6b' }}>Open vragen</div>
              <div className="text-4xl font-bold" style={{ color: '#1a3a2e' }}>{answeredOpen}/{totalOpen}</div>
              <div className="text-xs mt-1" style={{ color: '#6b6b6b' }}>(beantwoord, beoordeel zelf)</div>
            </div>
          </div>

          <p className="mb-6 text-sm" style={{ color: '#4a4a4a' }}>
            Beoordeel hieronder per open vraag hoe goed je antwoord was. Dit bepaalt wanneer je de vraag opnieuw krijgt.
          </p>

          {session.questions.filter(x => x.type === 'open').map((question) => (
            <OpenReview
              key={question.id}
              question={question}
              userAnswer={answers[question.id]?.text || '(geen antwoord gegeven)'}
              onRate={(rating) => setAnswers(a => ({ ...a, [question.id]: { ...a[question.id], selfRating: rating } }))}
              currentRating={answers[question.id]?.selfRating}
            />
          ))}

          <button
            onClick={submitResults}
            className="w-full py-4 font-bold uppercase tracking-wider mt-6"
            style={{ backgroundColor: '#1a3a2e', color: '#f5f1e8' }}
          >
            Voltooien & opslaan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f1e8', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-3xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-6 sticky top-0 py-2" style={{ backgroundColor: '#f5f1e8' }}>
          <div className="text-sm" style={{ color: '#6b6b6b' }}>
            Vraag {index + 1} / {session.questions.length}
          </div>
          <div
            className="px-4 py-2 font-bold tabular-nums text-lg"
            style={{
              backgroundColor: timeLeft < 300 ? '#a04040' : '#1a3a2e',
              color: '#f5f1e8'
            }}
          >
            {minutes}:{String(seconds).padStart(2, '0')}
          </div>
          <button onClick={() => setShowResults(true)} className="text-sm underline" style={{ color: '#1a3a2e' }}>
            Eerder klaar
          </button>
        </div>

        <div className="h-1 bg-white mb-8">
          <div
            className="h-full transition-all"
            style={{ width: `${((index + 1) / session.questions.length) * 100}%`, backgroundColor: '#1a3a2e' }}
          />
        </div>

        <div className="mb-4 text-xs uppercase tracking-widest" style={{ color: '#c9a961' }}>
          {q.domain}
        </div>

        <div className="bg-white p-8 mb-6 border-2" style={{ borderColor: '#1a3a2e' }}>
          <p className="text-xl leading-relaxed" style={{ color: '#1a3a2e' }}>{q.question}</p>
        </div>

        {q.type === 'mc' ? (
          <div className="space-y-2 mb-6">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setAnswers(a => ({ ...a, [q.id]: i }))}
                className="w-full text-left p-4 border-2 transition-all flex items-center gap-3"
                style={{
                  backgroundColor: answers[q.id] === i ? '#1a3a2e' : 'white',
                  borderColor: '#1a3a2e',
                  color: answers[q.id] === i ? '#f5f1e8' : '#1a3a2e'
                }}
              >
                <div className="w-6 h-6 border-2 flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ borderColor: 'currentColor' }}>
                  {String.fromCharCode(65 + i)}
                </div>
                <span>{opt}</span>
              </button>
            ))}
          </div>
        ) : (
          <textarea
            value={answers[q.id]?.text || ''}
            onChange={e => setAnswers(a => ({ ...a, [q.id]: { text: e.target.value } }))}
            placeholder="Typ je antwoord..."
            className="w-full p-4 border-2 min-h-[150px] focus:outline-none mb-6"
            style={{ backgroundColor: 'white', borderColor: '#e0d8c7', color: '#1a3a2e', fontFamily: 'Georgia, serif' }}
          />
        )}

        <div className="flex gap-3">
          <button
            onClick={() => setIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            className="px-6 py-3 border-2 disabled:opacity-30"
            style={{ borderColor: '#1a3a2e', color: '#1a3a2e' }}
          >
            ← Vorige
          </button>
          <button
            onClick={() => index + 1 >= session.questions.length ? setShowResults(true) : setIndex(index + 1)}
            className="flex-grow py-3 font-bold uppercase tracking-wider"
            style={{ backgroundColor: '#1a3a2e', color: '#f5f1e8' }}
          >
            {index + 1 >= session.questions.length ? 'Inleveren' : 'Volgende →'}
          </button>
        </div>
      </div>
    </div>
  );
}

function OpenReview({ question, userAnswer, onRate, currentRating }) {
  return (
    <div className="bg-white p-6 mb-3 border-2" style={{ borderColor: '#e0d8c7' }}>
      <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#c9a961' }}>
        {question.domain}
      </div>
      <p className="font-bold mb-3" style={{ color: '#1a3a2e' }}>{question.question}</p>

      <div className="mb-3 p-3" style={{ backgroundColor: '#f5f1e8' }}>
        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: '#6b6b6b' }}>Jouw antwoord</div>
        <p className="text-sm" style={{ color: '#1a3a2e' }}>{userAnswer}</p>
      </div>

      <div className="mb-3 p-3 border-l-4" style={{ borderColor: '#c9a961', backgroundColor: '#fdf9ef' }}>
        <div className="text-xs uppercase tracking-widest mb-1" style={{ color: '#c9a961' }}>Modelantwoord</div>
        <p className="text-sm" style={{ color: '#1a3a2e' }}>{question.modelAnswer}</p>
        <p className="text-xs mt-2" style={{ color: '#6b6b6b' }}><strong>Kernpunten:</strong> {question.keyPoints.join(' · ')}</p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {[
          { rating: 1, label: 'Fout', color: '#a04040' },
          { rating: 3, label: 'Deels', color: '#c9a961' },
          { rating: 5, label: 'Goed', color: '#1a6b3e' }
        ].map(({ rating, label, color }) => (
          <button
            key={rating}
            onClick={() => onRate(rating)}
            className="py-2 border-2 text-sm font-bold transition-all"
            style={{
              borderColor: color,
              backgroundColor: currentRating === rating ? color : 'transparent',
              color: currentRating === rating ? 'white' : color
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DecodeView({ session, onFinish }) {
  const [index, setIndex] = useState(0);
  // step: 1 = lezen + gegevens identificeren, 2 = concept identificeren, 3 = antwoorden, 4 = feedback
  const [step, setStep] = useState(1);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedConcepts, setSelectedConcepts] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [selfRating, setSelfRating] = useState(null);
  const [results, setResults] = useState([]);

  const q = session.questions[index];
  if (!q) return null;

  const toggleData = (idx) => {
    setSelectedData(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const toggleConcept = (idx) => {
    setSelectedConcepts(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
      return;
    }
    // Finaliseer deze vraag, volgende of klaar
    const finalRating = selfRating ?? 3;
    const newResults = [...results, { questionId: q.id, quality: finalRating }];
    setResults(newResults);

    if (index + 1 >= session.questions.length) {
      onFinish(newResults);
    } else {
      setIndex(index + 1);
      setStep(1);
      setSelectedData([]);
      setSelectedConcepts([]);
      setUserAnswer('');
      setSelfRating(null);
    }
  };

  // Score stap 1: hoeveel juist geselecteerd
  const correctDataIndices = q.dataItems.map((d, i) => d.relevant ? i : null).filter(i => i !== null);
  const correctConceptIndices = q.concepts.map((c, i) => c.correct ? i : null).filter(i => i !== null);

  const dataScore = step >= 2 ? {
    correctSelected: selectedData.filter(i => q.dataItems[i].relevant).length,
    incorrectSelected: selectedData.filter(i => !q.dataItems[i].relevant).length,
    missed: correctDataIndices.filter(i => !selectedData.includes(i)).length,
    total: correctDataIndices.length
  } : null;

  const conceptScore = step >= 3 ? {
    correctSelected: selectedConcepts.filter(i => q.concepts[i].correct).length,
    incorrectSelected: selectedConcepts.filter(i => !q.concepts[i].correct).length,
    missed: correctConceptIndices.filter(i => !selectedConcepts.includes(i)).length,
    total: correctConceptIndices.length
  } : null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f1e8', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => onFinish(results)} className="flex items-center gap-2 text-sm" style={{ color: '#1a3a2e' }}>
            <Home size={16} /> Stoppen
          </button>
          <div className="text-sm" style={{ color: '#6b6b6b' }}>
            Opgave {index + 1} / {session.questions.length}
          </div>
          <div className="text-xs uppercase tracking-widest" style={{ color: '#c9a961' }}>
            Stap {step} van 4
          </div>
        </div>

        {/* Progressbalk per stap */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className="flex-1 h-1" style={{
              backgroundColor: step >= s ? '#1a3a2e' : '#e0d8c7'
            }} />
          ))}
        </div>

        {/* Bron label */}
        <div className="mb-4 text-xs uppercase tracking-widest" style={{ color: '#c9a961' }}>
          {q.domain} · {q.source}
        </div>

        {/* Casus altijd zichtbaar */}
        <div className="bg-white p-6 mb-6 border-2" style={{ borderColor: '#1a3a2e' }}>
          <div className="flex items-start gap-3 mb-3">
            <FileText size={20} style={{ color: '#6b6b6b', marginTop: 4 }} />
            <div className="text-xs uppercase tracking-widest font-bold" style={{ color: '#6b6b6b' }}>Casus</div>
          </div>
          {q.context.split('\n\n').map((paragraph, i) => (
            <p key={i} className="leading-relaxed mb-3 last:mb-0" style={{ color: '#1a3a2e' }}>{paragraph}</p>
          ))}
        </div>

        {/* De vraag altijd zichtbaar */}
        <div className="p-6 mb-6 border-l-4" style={{ borderColor: '#c9a961', backgroundColor: '#fdf9ef' }}>
          <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#c9a961' }}>Vraag</div>
          <p className="text-lg leading-relaxed font-bold" style={{ color: '#1a3a2e' }}>{q.question}</p>
        </div>

        {/* STAP 1: Gegevens identificeren */}
        {step === 1 && (
          <div>
            <div className="bg-white p-6 mb-4 border-2" style={{ borderColor: '#1a3a2e' }}>
              <div className="flex items-center gap-2 mb-2">
                <Search size={18} style={{ color: '#1a3a2e' }} />
                <h3 className="font-bold uppercase tracking-wider text-sm" style={{ color: '#1a3a2e' }}>
                  Stap 1 — Welke gegevens zijn relevant?
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: '#4a4a4a' }}>
                Lees de casus en de vraag. Selecteer alle gegevens die je nodig hebt om deze <em>specifieke</em> vraag te beantwoorden. Niet alle informatie in de casus is relevant!
              </p>

              <div className="space-y-2">
                {q.dataItems.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => toggleData(i)}
                    className="w-full text-left p-3 border-2 transition-all flex items-start gap-3"
                    style={{
                      backgroundColor: selectedData.includes(i) ? '#e8f4ec' : 'white',
                      borderColor: selectedData.includes(i) ? '#1a6b3e' : '#e0d8c7'
                    }}
                  >
                    <div className="w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                      borderColor: selectedData.includes(i) ? '#1a6b3e' : '#6b6b6b',
                      backgroundColor: selectedData.includes(i) ? '#1a6b3e' : 'white'
                    }}>
                      {selectedData.includes(i) && <Check size={14} color="white" />}
                    </div>
                    <span className="text-sm" style={{ color: '#1a3a2e' }}>{item.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={selectedData.length === 0}
              className="w-full py-4 font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#1a3a2e', color: '#f5f1e8' }}
            >
              Controleer selectie → stap 2
            </button>
          </div>
        )}

        {/* STAP 2: Feedback op gegevens + concept selecteren */}
        {step === 2 && (
          <div>
            {/* Feedback op gegevens */}
            <div className="bg-white p-6 mb-4 border-2" style={{ borderColor: '#1a3a2e' }}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={18} style={{ color: '#c9a961' }} />
                <h3 className="font-bold uppercase tracking-wider text-sm" style={{ color: '#1a3a2e' }}>
                  Feedback op je selectie
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2 border-2" style={{ borderColor: '#1a6b3e', backgroundColor: '#e8f4ec' }}>
                  <div className="text-2xl font-bold" style={{ color: '#1a6b3e' }}>{dataScore.correctSelected}/{dataScore.total}</div>
                  <div className="text-xs uppercase" style={{ color: '#1a6b3e' }}>Juist</div>
                </div>
                <div className="p-2 border-2" style={{ borderColor: '#a04040', backgroundColor: '#fce8e8' }}>
                  <div className="text-2xl font-bold" style={{ color: '#a04040' }}>{dataScore.incorrectSelected}</div>
                  <div className="text-xs uppercase" style={{ color: '#a04040' }}>Onnodig</div>
                </div>
                <div className="p-2 border-2" style={{ borderColor: '#c9a961', backgroundColor: '#fdf9ef' }}>
                  <div className="text-2xl font-bold" style={{ color: '#c9a961' }}>{dataScore.missed}</div>
                  <div className="text-xs uppercase" style={{ color: '#c9a961' }}>Gemist</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {q.dataItems.map((item, i) => {
                  const wasSelected = selectedData.includes(i);
                  const isCorrect = item.relevant;
                  let label = '';
                  let color = '#6b6b6b';
                  if (wasSelected && isCorrect) { label = 'Juist ✓'; color = '#1a6b3e'; }
                  else if (wasSelected && !isCorrect) { label = 'Onnodig'; color = '#a04040'; }
                  else if (!wasSelected && isCorrect) { label = 'Gemist'; color = '#c9a961'; }
                  else return null; // niet geselecteerd en niet relevant: sla over

                  return (
                    <div key={i} className="p-3 border-l-2" style={{ borderColor: color, backgroundColor: '#fafafa' }}>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span style={{ color: '#1a3a2e' }}>{item.text}</span>
                        <span className="text-xs font-bold uppercase whitespace-nowrap" style={{ color }}>{label}</span>
                      </div>
                      <p className="text-xs" style={{ color: '#6b6b6b' }}>{item.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stap 2: concept kiezen */}
            <div className="bg-white p-6 mb-4 border-2" style={{ borderColor: '#1a3a2e' }}>
              <div className="flex items-center gap-2 mb-2">
                <Target size={18} style={{ color: '#1a3a2e' }} />
                <h3 className="font-bold uppercase tracking-wider text-sm" style={{ color: '#1a3a2e' }}>
                  Stap 2 — Welk(e) concept(en) is/zijn relevant?
                </h3>
              </div>
              <p className="text-sm mb-4" style={{ color: '#4a4a4a' }}>
                Welk economisch model of concept moet je hier gebruiken? Er kunnen meerdere antwoorden juist zijn.
              </p>

              <div className="space-y-2">
                {q.concepts.map((concept, i) => (
                  <button
                    key={i}
                    onClick={() => toggleConcept(i)}
                    className="w-full text-left p-3 border-2 transition-all flex items-start gap-3"
                    style={{
                      backgroundColor: selectedConcepts.includes(i) ? '#e8f4ec' : 'white',
                      borderColor: selectedConcepts.includes(i) ? '#1a6b3e' : '#e0d8c7'
                    }}
                  >
                    <div className="w-5 h-5 border-2 flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                      borderColor: selectedConcepts.includes(i) ? '#1a6b3e' : '#6b6b6b',
                      backgroundColor: selectedConcepts.includes(i) ? '#1a6b3e' : 'white'
                    }}>
                      {selectedConcepts.includes(i) && <Check size={14} color="white" />}
                    </div>
                    <span className="text-sm" style={{ color: '#1a3a2e' }}>{concept.text}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={selectedConcepts.length === 0}
              className="w-full py-4 font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#1a3a2e', color: '#f5f1e8' }}
            >
              Controleer selectie → stap 3
            </button>
          </div>
        )}

        {/* STAP 3: Feedback op concept + antwoord geven */}
        {step === 3 && (
          <div>
            {/* Feedback op concept */}
            <div className="bg-white p-6 mb-4 border-2" style={{ borderColor: '#1a3a2e' }}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={18} style={{ color: '#c9a961' }} />
                <h3 className="font-bold uppercase tracking-wider text-sm" style={{ color: '#1a3a2e' }}>
                  Feedback op je concept-keuze
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2 border-2" style={{ borderColor: '#1a6b3e', backgroundColor: '#e8f4ec' }}>
                  <div className="text-2xl font-bold" style={{ color: '#1a6b3e' }}>{conceptScore.correctSelected}/{conceptScore.total}</div>
                  <div className="text-xs uppercase" style={{ color: '#1a6b3e' }}>Juist</div>
                </div>
                <div className="p-2 border-2" style={{ borderColor: '#a04040', backgroundColor: '#fce8e8' }}>
                  <div className="text-2xl font-bold" style={{ color: '#a04040' }}>{conceptScore.incorrectSelected}</div>
                  <div className="text-xs uppercase" style={{ color: '#a04040' }}>Onjuist</div>
                </div>
                <div className="p-2 border-2" style={{ borderColor: '#c9a961', backgroundColor: '#fdf9ef' }}>
                  <div className="text-2xl font-bold" style={{ color: '#c9a961' }}>{conceptScore.missed}</div>
                  <div className="text-xs uppercase" style={{ color: '#c9a961' }}>Gemist</div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {q.concepts.map((concept, i) => {
                  const wasSelected = selectedConcepts.includes(i);
                  const isCorrect = concept.correct;
                  let label = '';
                  let color = '#6b6b6b';
                  if (wasSelected && isCorrect) { label = 'Juist ✓'; color = '#1a6b3e'; }
                  else if (wasSelected && !isCorrect) { label = 'Onjuist'; color = '#a04040'; }
                  else if (!wasSelected && isCorrect) { label = 'Gemist'; color = '#c9a961'; }
                  else return null;

                  return (
                    <div key={i} className="p-3 border-l-2" style={{ borderColor: color, backgroundColor: '#fafafa' }}>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <span className="font-bold" style={{ color: '#1a3a2e' }}>{concept.text}</span>
                        <span className="text-xs font-bold uppercase whitespace-nowrap" style={{ color }}>{label}</span>
                      </div>
                      <p className="text-xs" style={{ color: '#6b6b6b' }}>{concept.explanation}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Antwoord geven */}
            <div className="bg-white p-6 mb-4 border-2" style={{ borderColor: '#1a3a2e' }}>
              <h3 className="font-bold uppercase tracking-wider text-sm mb-2" style={{ color: '#1a3a2e' }}>
                Stap 3 — Formuleer je antwoord
              </h3>
              <p className="text-sm mb-4" style={{ color: '#4a4a4a' }}>
                Nu je weet welke gegevens en welk concept relevant zijn, formuleer je antwoord op de vraag.
              </p>
              <textarea
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                placeholder="Typ hier je antwoord..."
                className="w-full p-4 border-2 min-h-[150px] focus:outline-none"
                style={{ backgroundColor: '#fafafa', borderColor: '#e0d8c7', color: '#1a3a2e', fontFamily: 'Georgia, serif' }}
              />
            </div>

            <button
              onClick={handleNext}
              disabled={userAnswer.trim().length < 10}
              className="w-full py-4 font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#1a3a2e', color: '#f5f1e8' }}
            >
              Toon modelantwoord
            </button>
          </div>
        )}

        {/* STAP 4: Modelantwoord en zelfbeoordeling */}
        {step === 4 && (
          <div>
            <div className="bg-white p-6 mb-4 border-2" style={{ borderColor: '#e0d8c7' }}>
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: '#6b6b6b' }}>Jouw antwoord</div>
              <p className="text-sm leading-relaxed" style={{ color: '#1a3a2e' }}>{userAnswer}</p>
            </div>

            <div className="bg-white border-l-4 p-6 mb-4" style={{ borderColor: '#c9a961', backgroundColor: '#fdf9ef' }}>
              <div className="text-xs uppercase tracking-widest mb-2" style={{ color: '#c9a961' }}>Modelantwoord</div>
              <p className="leading-relaxed mb-4" style={{ color: '#1a3a2e' }}>{q.modelAnswer}</p>
              <div className="text-sm border-t pt-3" style={{ borderColor: '#e0d8c7', color: '#6b6b6b' }}>
                <strong>Kernpunten:</strong> {q.keyPoints.join(' · ')}
              </div>
            </div>

            {selfRating === null ? (
              <div className="bg-white p-6 mb-4 border-2" style={{ borderColor: '#1a3a2e' }}>
                <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#1a3a2e' }}>
                  Hoe goed was jouw antwoord?
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => setSelfRating(1)} className="py-3 border-2 hover:bg-red-50 transition-colors" style={{ borderColor: '#a04040', color: '#a04040' }}>
                    <div className="font-bold">Fout</div>
                    <div className="text-xs">morgen opnieuw</div>
                  </button>
                  <button onClick={() => setSelfRating(3)} className="py-3 border-2 hover:bg-yellow-50 transition-colors" style={{ borderColor: '#c9a961', color: '#c9a961' }}>
                    <div className="font-bold">Deels</div>
                    <div className="text-xs">over een paar dagen</div>
                  </button>
                  <button onClick={() => setSelfRating(5)} className="py-3 border-2 hover:bg-green-50 transition-colors" style={{ borderColor: '#1a6b3e', color: '#1a6b3e' }}>
                    <div className="font-bold">Goed</div>
                    <div className="text-xs">over een week+</div>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleNext}
                className="w-full py-4 font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                style={{ backgroundColor: '#c9a961', color: '#1a3a2e' }}
              >
                {index + 1 >= session.questions.length ? 'Klaar' : 'Volgende opgave'}
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StatsView({ progress, domains, onBack }) {
  const totalAttempted = Object.keys(progress).length;
  const totalAttempts = Object.values(progress).reduce((sum, p) => sum + (p.attempts || 0), 0);
  const totalCorrect = Object.values(progress).reduce((sum, p) => sum + (p.correct || 0), 0);
  const overallPct = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5f1e8', fontFamily: 'Georgia, serif' }}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <button onClick={onBack} className="flex items-center gap-2 text-sm mb-6" style={{ color: '#1a3a2e' }}>
          <Home size={16} /> Terug
        </button>

        <h1 className="text-4xl font-bold mb-8" style={{ color: '#1a3a2e' }}>Voortgang</h1>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <StatBox label="Vragen geoefend" value={totalAttempted} sublabel={`van ${QUESTIONS.length}`} icon={<BookOpen size={20} />} />
          <StatBox label="Pogingen totaal" value={totalAttempts} sublabel="alle sessies" icon={<TrendingUp size={20} />} />
          <StatBox label="Score gemiddeld" value={`${overallPct}%`} sublabel={`${totalCorrect}/${totalAttempts} goed`} icon={<Target size={20} />} highlight />
        </div>

        <h2 className="text-xs uppercase tracking-widest mb-4" style={{ color: '#6b6b6b' }}>Per domein</h2>
        <div className="space-y-3 mb-10">
          {domains.map(domain => {
            const domainQs = QUESTIONS.filter(q => q.domain === domain);
            const seenQs = domainQs.filter(q => progress[q.id]?.attempts > 0);
            const totalA = seenQs.reduce((s, q) => s + progress[q.id].attempts, 0);
            const totalC = seenQs.reduce((s, q) => s + progress[q.id].correct, 0);
            const pct = totalA > 0 ? Math.round((totalC / totalA) * 100) : 0;

            return (
              <div key={domain} className="bg-white p-5 border-2" style={{ borderColor: '#e0d8c7' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg" style={{ color: '#1a3a2e' }}>{domain}</h3>
                  <span className="text-sm" style={{ color: '#6b6b6b' }}>
                    {seenQs.length}/{domainQs.length} vragen geoefend
                  </span>
                </div>
                <div className="h-2 bg-gray-100 mb-2">
                  <div
                    className="h-full"
                    style={{ width: `${pct}%`, backgroundColor: pct >= 70 ? '#1a6b3e' : pct >= 40 ? '#c9a961' : '#a04040' }}
                  />
                </div>
                <div className="text-xs" style={{ color: '#6b6b6b' }}>
                  Gemiddelde score: <strong style={{ color: pct >= 70 ? '#1a6b3e' : pct >= 40 ? '#c9a961' : '#a04040' }}>{pct}%</strong>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            if (confirm('Weet je zeker dat je alle voortgang wilt wissen?')) {
              localStorage.removeItem(STORAGE_KEY);
              window.location.reload();
            }
          }}
          className="text-sm flex items-center gap-2 opacity-50 hover:opacity-100"
          style={{ color: '#a04040' }}
        >
          <RotateCcw size={14} /> Voortgang wissen
        </button>
      </div>
    </div>
  );
}
