// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands IT
// @namespace    local.tampermonkey.universal.ai.prompt.commands.it
// @version      1.0.0
// @description  Script Tampermonkey per sostituire comandi brevi con prompt IA già pronti nelle chat di intelligenza artificiale.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Localized commands: replacement occurs only for an exact command.
    const COMMANDS = {
        'IT1': `Traduci integralmente e fedelmente il testo fornito in italiano. Mantieni significato, ordine, nomi, date, importi, numeri di documenti, organizzazioni e formulazioni importanti. Non aggiungere conclusioni, non riassumere e non modificare il contenuto.`,

        'IT2': `Riassumi il testo fornito in italiano in base al significato e al contesto. Spiega argomento, interlocutori e contenuto principale. Indica separatamente richieste, decisioni, date, scadenze, importi e dettagli importanti. Usa un linguaggio semplice e conciso.`,

        'IT3': `Crea in italiano un breve riassunto tematico della lettera rigorosamente in una sola riga. Indica mittente, argomento, ciò che viene comunicato o richiesto e date, scadenze, importi, documenti o azioni importanti.`,

        'IT4': `Traduci il testo fornito in tedesco semplice e chiaro, livello A2-B1. Rendilo cortese, formale e grammaticalmente corretto. Mantieni significato, date, nomi, importi, indirizzi, organizzazioni e dettagli. Evita formulazioni tedesche complesse.`,

        'IT5': `Correggi il testo fornito in italiano. Rendilo corretto, chiaro e logico mantenendo il significato originale. Elimina errori, ripetizioni e formulazioni infelici. Per una lettera usa un tono cortese e formale. Non aggiungere fatti assenti.`,

        'IT6': `Scrivi una risposta breve, cortese e formale a questa lettera in tedesco semplice, livello A2-B1. Rispondi nel merito senza frasi inutili. Formula correttamente conferme e richieste di documenti o chiarimenti. Termina con: Mit freundlichen Grüßen`,

        'IT7': `Spiega con parole semplici in italiano che cosa significa il testo. Indica chi scrive, l’argomento, che cosa vuole, che cosa occorre fare e scadenze, date, importi, documenti o condizioni importanti. Specifica se contiene richiesta, avviso, decisione o informazione.`,

        'IT8': `Estrai tutti i fatti importanti dal testo e organizzali in italiano: persone, organizzazioni, indirizzi, date, scadenze, importi, numeri di documenti, richieste, decisioni, obblighi, documenti e passi successivi. Non inventare dati; scrivi «non indicato» se mancano.`,

        'IT9': `Crea in italiano un elenco chiaro delle azioni necessarie in base al testo. Indica documenti, destinatari, contatti, scadenze e punti di attenzione. Dividi per priorità: urgente, importante, può attendere. Elenca le domande da chiarire.`,

        'IT10': `Redigi dal testo una lettera ufficiale, cortese e chiara in tedesco, livello A2-B1. Mantieni tutti i fatti importanti. Struttura: saluto, situazione, richiesta o messaggio principale, eventuale richiesta di conferma o chiarimento, chiusura. Termina con: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea','input[type="text"]','input[type="search"]','[contenteditable="true"]','[contenteditable="plaintext-only"]','[role="textbox"]'];
    function isEditableElement(element) {
        if (!element || !element.matches || element.disabled || element.readOnly) return false;
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        const inputType = (element.getAttribute('type') || '').toLowerCase();
        if (tagName === 'input' && !['text','search'].includes(inputType)) return false;
        return EDITABLE_SELECTORS.some(selector => element.matches(selector));
    }
    function findEditableElement(target) {
        if (!target) return null;
        if (isEditableElement(target)) return target;
        const element = target.closest ? target.closest(EDITABLE_SELECTORS.join(',')) : null;
        return isEditableElement(element) ? element : null;
    }
    function getText(element) {
        const tagName = element?.tagName?.toLowerCase() || '';
        return tagName === 'textarea' || tagName === 'input' ? (element.value || '') : (element?.innerText || element?.textContent || '');
    }
    function normalizeCommand(text) { return text.trim().replace(/\s+/g, '').toUpperCase(); }
    function dispatchInputEvents(element,text) {
        try { element.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text})); }
        catch (_) { element.dispatchEvent(new Event('input',{bubbles:true})); }
        element.dispatchEvent(new Event('change',{bubbles:true}));
    }
    function replaceText(element,newText) {
        const tagName=element.tagName?.toLowerCase() || ''; element.focus();
        if (tagName==='textarea' || tagName==='input') { element.value=newText; element.setSelectionRange(newText.length,newText.length); dispatchInputEvents(element,newText); return; }
        try { const range=document.createRange(), selection=window.getSelection(); range.selectNodeContents(element); selection.removeAllRanges(); selection.addRange(range); document.execCommand('insertText',false,newText); }
        catch (_) { element.textContent=newText; }
        dispatchInputEvents(element,newText);
    }
    function showNotification(message) {
        document.getElementById('tampermonkey-universal-ai-prompt-commands-notification')?.remove();
        const box=document.createElement('div'); box.id='tampermonkey-universal-ai-prompt-commands-notification'; box.textContent=message;
        Object.assign(box.style,{position:'fixed',right:'20px',bottom:'20px',zIndex:'999999',background:'#111',color:'#fff',padding:'12px 18px',borderRadius:'10px',fontSize:'14px',fontFamily:'Arial, sans-serif',boxShadow:'0 4px 12px rgba(0,0,0,.35)',maxWidth:'420px',lineHeight:'1.4'});
        document.body.appendChild(box); setTimeout(()=>box.remove(),2200);
    }
    function checkAndReplace(target) {
        const editable=findEditableElement(target); if (!editable) return;
        const command=normalizeCommand(getText(editable)); if (!Object.prototype.hasOwnProperty.call(COMMANDS,command)) return;
        replaceText(editable,COMMANDS[command]); showNotification("Il comando {cmd} è stato sostituito con un prompt pronto".replace('{cmd}',command));
    }
    document.addEventListener('input',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('keyup',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('paste',event=>setTimeout(()=>checkAndReplace(event.target),50),true);
})();
