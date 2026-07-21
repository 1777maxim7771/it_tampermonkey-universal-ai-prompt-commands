# Tampermonkey Universal AI Prompt Commands IT

**Tampermonkey Universal AI Prompt Commands IT** è uno userscript per l’estensione **Tampermonkey**. Aiuta a lavorare più velocemente con chat di intelligenza artificiale come ChatGPT, Gemini, Claude, Copilot e altri siti con campi di testo.

Lo script sostituisce comandi brevi come `IT1`, `IT3` o `IT10` con prompt IA lunghi e già preparati.

---

## A cosa serve

Serve per inserire rapidamente prompt pronti per traduzione, riassunto, analisi di lettere, estrazione di fatti, risposte ufficiali e redazione di testi.

---

## Come funziona

Lo script controlla i campi di inserimento. Se il campo contiene esattamente un comando conosciuto, ad esempio:

```text
IT1
```

lo sostituisce con un prompt completo. Il testo normale non viene modificato.

---

## Esempi

- `IT1` — traduzione precisa in italiano.
- `IT3` — riassunto tematico di una lettera in una riga.
- `IT8` — estrazione di date, importi, persone, organizzazioni e documenti.
- `IT10` — lettera ufficiale in tedesco semplice A2-B1.

---

## Dove usarlo

Principalmente in chat IA: ChatGPT, Google Gemini, Claude, Microsoft Copilot e altri siti con campo di testo.

```javascript
// @match        *://*/*
```

Questo permette l’uso su siti diversi. Vengono sostituiti solo comandi esatti.

---

## Prima dell’installazione

Deve essere installata l’estensione **Tampermonkey** nel browser. Tampermonkey consente di installare ed eseguire file `.user.js`.

---

## Installazione rapida tramite Raw

1. Installa Tampermonkey.
2. Apri questo link Raw:

```text
https://raw.githubusercontent.com/1777maxim7771/it_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Tampermonkey aprirà la finestra di installazione.
4. Premi **Install / Installa**.
5. Prova il comando `IT1` in una chat IA.

---

## Installazione da GitHub

Apri il file `tampermonkey-universal-ai-prompt-commands.user.js`, premi **Raw** e conferma l’installazione in Tampermonkey.

---

## Importazione tramite URL

Se Raw non apre l’installazione: Tampermonkey → Dashboard → Utilities → Import from URL → incolla il link Raw.

---

## Installazione manuale

Tampermonkey → Create a new script → elimina il modello → incolla il contenuto del file `.user.js` → salva con **Ctrl + S**.

---

## Perché Tampermonkey riconosce lo script

Lo riconosce grazie all’intestazione `// ==UserScript==` e all’estensione `.user.js`. Lo script si installa in **Tampermonkey**, non in GitHub e non in un sito specifico. GitHub conserva solo il file.

---

## Comandi

- `IT1` — traduzione in italiano.
- `IT2` — riassunto in italiano.
- `IT3` — riassunto di una lettera in una riga.
- `IT4` — traduzione in tedesco A2-B1.
- `IT5` — correzione di testo italiano.
- `IT6` — breve risposta ufficiale.
- `IT7` — spiegazione semplice.
- `IT8` — estrazione di fatti importanti.
- `IT9` — elenco di azioni necessarie.
- `IT10` — lettera ufficiale in tedesco.

---

## Verifica

Scrivi `IT1` in un campo di testo. Se viene sostituito da un prompt completo, lo script funziona.

---

## Problemi possibili

Controlla che Tampermonkey sia attivo, che lo script sia attivato, che la pagina sia aggiornata e che il comando sia scritto da solo.

---

## File dello script

```text
tampermonkey-universal-ai-prompt-commands.user.js
```

---

## Obiettivo del progetto

Accelerare il lavoro ripetitivo con chat IA tramite comandi brevi che inseriscono prompt completi.