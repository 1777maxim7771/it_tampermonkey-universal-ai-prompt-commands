// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands IT
// @namespace    local.tampermonkey.universal.ai.prompt.commands.it
// @version      1.0.0
// @description  Sostituisce i comandi brevi IT1-IT10 con prompt IA pronti nelle chat di intelligenza artificiale.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Versione italiana. Viene sostituito solo un comando esatto con un prompt completo.
    const COMMANDS = {
        'IT1': `Traduci il testo fornito in italiano in modo completo e preciso. Mantieni il significato, l’ordine delle informazioni, nomi, date, importi, numeri di documenti, organizzazioni e formulazioni importanti. Non aggiungere conclusioni personali e non abbreviare il contenuto.`,
        'IT2': `Riassumi il testo fornito in italiano secondo il significato e il contesto. Spiega di che cosa tratta, chi scrive a chi, qual è l’argomento principale e quali richieste, decisioni, date, scadenze, importi o dettagli importanti sono indicati.`,
        'IT3': `Crea in italiano un breve riassunto tematico di questa lettera, rigorosamente in una sola riga. Indica mittente, argomento, cosa viene comunicato o richiesto e quali date, scadenze, importi, documenti o azioni sono importanti.`,
        'IT4': `Traduci il testo fornito in tedesco semplice e comprensibile, livello A2-B1. Formula il testo in modo cortese, ufficiale e grammaticalmente corretto. Mantieni significato, nomi, date, importi, indirizzi, organizzazioni e dettagli importanti.`,
        'IT5': `Correggi il testo italiano fornito. Rendilo corretto, chiaro, logico e naturale, mantenendo il significato originale. Elimina errori, ripetizioni e formulazioni poco riuscite. Non aggiungere fatti non presenti nel testo originale.`,
        'IT6': `Scrivi una risposta breve, cortese e ufficiale a questa lettera in italiano. Rispondi al contenuto in modo concreto, senza frasi inutili. Se necessario, conferma la ricezione, chiedi chiarimenti, menziona documenti o comunica le informazioni richieste.`,
        'IT7': `Spiega in italiano con parole semplici che cosa significa questo testo. Analizza il contesto, chi scrive, a chi, su quale argomento, cosa viene richiesto, cosa bisogna fare e quali date, scadenze, importi, documenti o condizioni sono importanti.`,
        'IT8': `Estrai dal testo tutti i fatti importanti e organizzali in italiano. Indica separatamente persone, organizzazioni, indirizzi, date, scadenze, importi, numeri di documenti, requisiti, decisioni, obblighi, documenti citati e prossimi passi. Non inventare informazioni.`,
        'IT9': `Prepara in italiano un elenco chiaro delle azioni necessarie sulla base di questo testo. Indica cosa fare, quali documenti preparare, a chi rispondere, dove rivolgersi, quali scadenze rispettare e quali punti controllare. Ordina le azioni per priorità.`,
        'IT10': `Redigi sulla base del testo fornito una lettera ufficiale e cortese in tedesco semplice, livello A2-B1. Mantieni nomi, date, importi, indirizzi, organizzazioni, numeri di documenti e circostanze. Struttura la lettera con saluto, breve spiegazione, richiesta principale e chiusura. Termina con: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea', 'input[type="text"]', 'input[type="search"]', '[contenteditable="true"]', '[contenteditable="plaintext-only"]', '[role="textbox"]'];
    function isEditableElement(element) { if (!element || !element.matches) return false; if (element.disabled || element.readOnly) return false; const tagName = element.tagName ? element.tagName.toLowerCase() : ''; const inputType = (element.getAttribute('type') || '').toLowerCase(); if (tagName === 'input' && !['text', 'search'].includes(inputType)) return false; return EDITABLE_SELECTORS.some(selector => element.matches(selector)); }
    function findEditableElement(target) { if (!target) return null; if (isEditableElement(target)) return target; if (target.closest) { const element = target.closest(EDITABLE_SELECTORS.join(',')); if (isEditableElement(element)) return element; } return null; }
    function getText(element) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; return tagName === 'textarea' || tagName === 'input' ? element.value || '' : element.innerText || element.textContent || ''; }
    function normalizeCommand(text) { return String(text || '').trim().replace(/\s+/g, '').toUpperCase(); }
    function dispatchInputEvents(element, text) { try { element.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertReplacementText', data: text })); } catch (error) { element.dispatchEvent(new Event('input', { bubbles: true })); } element.dispatchEvent(new Event('change', { bubbles: true })); }
    function setCursorToEnd(element) { element.focus(); if ('selectionStart' in element) { const length = element.value.length; element.setSelectionRange(length, length); return; } const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); range.collapse(false); selection.removeAllRanges(); selection.addRange(range); }
    function replaceText(element, newText) { const tagName = element.tagName ? element.tagName.toLowerCase() : ''; element.focus(); if (tagName === 'textarea' || tagName === 'input') { element.value = newText; } else { try { const range = document.createRange(); const selection = window.getSelection(); range.selectNodeContents(element); selection.removeAllRanges(); selection.addRange(range); document.execCommand('insertText', false, newText); } catch (error) { element.textContent = newText; } } setCursorToEnd(element); dispatchInputEvents(element, newText); }
    function showNotification(message) { const oldBox = document.getElementById('tm-ai-prompt-commands-notification'); if (oldBox) oldBox.remove(); const box = document.createElement('div'); box.id = 'tm-ai-prompt-commands-notification'; box.textContent = message; box.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35);max-width:420px;line-height:1.4'; document.body.appendChild(box); setTimeout(() => box.remove(), 2200); }
    function checkAndReplace(target) { const editable = findEditableElement(target); if (!editable) return; const command = normalizeCommand(getText(editable)); if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) return; replaceText(editable, COMMANDS[command]); showNotification(`Comando ${command} sostituito con un prompt IA pronto`); }
    document.addEventListener('input', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('keyup', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('paste', event => setTimeout(() => checkAndReplace(event.target), 50), true);
})();