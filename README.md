# Tampermonkey Universal AI Prompt Commands IT

Versione italiana di uno script Tampermonkey per lavorare più velocemente con le chat di intelligenza artificiale.

Lo script sostituisce i trigger universali `Q1–Q10` con prompt IA preparati. Questi trigger non sono legati a una lingua: l’utente può sostituire `Q1`, `Q2` e gli altri con parole, comandi o frasi personali.

## A cosa serve

Serve per inserire rapidamente prompt in ChatGPT, Gemini, Claude, Copilot e altre chat IA. Invece di scrivere ogni volta un’istruzione lunga, basta digitare `Q1` e lo script inserisce il prompt completo.

## Come funziona

Lo script controlla il campo di testo attivo. Se l’intero contenuto del campo corrisponde esattamente a uno dei trigger `Q1–Q10`, viene sostituito dal prompt preparato.

```text
Q1
```

viene sostituito da un prompt per la traduzione in italiano.

```text
Q8
```

viene sostituito da un prompt per estrarre fatti importanti.

Il testo normale non viene modificato. Per esempio `Q1 altro testo` non viene sostituito.

## Trigger personalizzati

I trigger si possono cambiare nel codice, nell’oggetto `COMMANDS`.

```javascript
'Q1': `...`
```

può diventare:

```javascript
'TRADUCI': `...`
```

`Q1–Q10` sono solo i trigger universali predefiniti.

## Dove usarlo

- ChatGPT
- Google Gemini
- Claude
- Microsoft Copilot
- altri siti con campo di testo

Il codice contiene:

```javascript
// @match        *://*/*
```

## Requisito prima dell’installazione

Deve essere installata l’estensione **Tampermonkey** nel browser. Lo script si installa in Tampermonkey, non in GitHub e non in un sito specifico. GitHub serve solo per conservare il file `.user.js`.

## Installazione rapida

1. Installa Tampermonkey.
2. Apri il link Raw:

```text
https://raw.githubusercontent.com/1777maxim7771/it_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Conferma l’installazione in Tampermonkey.
4. Apri una chat IA e digita `Q1`.

## Installazione da GitHub

Apri il file `tampermonkey-universal-ai-prompt-commands.user.js`, clicca **Raw** e conferma l’installazione in Tampermonkey.

## Importazione tramite URL

In Tampermonkey apri **Dashboard → Utilities → Import from URL**, incolla il link Raw e conferma.

## Installazione manuale

Crea un nuovo script in Tampermonkey, incolla il codice del file `.user.js` e salva.

## Perché Tampermonkey riconosce lo script

Tampermonkey riconosce l’intestazione `// ==UserScript==` e l’estensione `.user.js`.

## Comandi predefiniti

- `Q1` — traduzione in italiano.
- `Q2` — riassunto del testo.
- `Q3` — riassunto di una lettera in una riga.
- `Q4` — traduzione in tedesco semplice A2-B1.
- `Q5` — correzione del testo italiano.
- `Q6` — risposta ufficiale breve.
- `Q7` — spiegazione semplice del testo.
- `Q8` — estrazione dei fatti importanti.
- `Q9` — lista delle azioni necessarie.
- `Q10` — lettera ufficiale in tedesco.

## Verifica

Digita `Q1` in una chat IA. Se lo script funziona, `Q1` sarà sostituito dal prompt completo.

## Possibili problemi

Controlla che lo script sia attivo, che la pagina sia stata ricaricata, che `Q1` sia scritto senza testo aggiuntivo, che Tampermonkey sia autorizzato sul sito e che il cursore sia in un campo modificabile.

## Obiettivo del progetto

Accelerare il lavoro ripetitivo con le chat IA: traduzione, riassunto, analisi di lettere, risposte ufficiali e gestione di documenti.
