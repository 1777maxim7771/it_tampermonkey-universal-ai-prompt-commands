// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands IT
// @namespace    local.tampermonkey.universal.ai.prompt.commands.it
// @version      1.1.0
// @description  Versione italiana: sostituisce i trigger universali Q1-Q10 con prompt IA pronti per l’uso nelle chat IA
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function(){'use strict';
/* Scopo: velocizzare il lavoro con ChatGPT, Gemini, Claude, Copilot e altre chat IA. I trigger Q1-Q10 non dipendono dalla lingua e possono essere cambiati con parole o frasi personali. */
const COMMANDS={
'Q1':`Traduci il testo fornito in italiano in modo completo e accurato.
Mantieni significato, ordine delle informazioni, nomi, date, importi, numeri di documenti, nomi di organizzazioni e formulazioni importanti.
Non aggiungere conclusioni personali, non abbreviare e non modificare il contenuto.`,
'Q2':`Riassumi il testo fornito in italiano secondo significato e contesto.
Spiega di cosa parla il testo, chi scrive a chi, qual è l’argomento principale e quali richieste, decisioni, date, scadenze, importi o dettagli importanti sono presenti.`,
'Q3':`Crea un breve riassunto tematico della lettera in italiano, rigorosamente in una sola riga.
Indica mittente, argomento, cosa viene comunicato o richiesto e quali date, scadenze, importi, documenti o azioni sono importanti.`,
'Q4':`Traduci il testo fornito in tedesco semplice e comprensibile, livello A2-B1.
Il testo deve essere cortese, ufficiale e grammaticalmente corretto.
Mantieni significato originale, date, nomi, importi, indirizzi, organizzazioni e dettagli importanti.`,
'Q5':`Correggi il testo italiano fornito.
Rendilo grammaticalmente corretto, chiaro e logico, mantenendo il significato originale.
Elimina errori, ripetizioni, formulazioni poco naturali e parti troppo colloquiali.
Non aggiungere fatti non presenti nel testo originale.`,
'Q6':`Scrivi una risposta breve, cortese e ufficiale a questa lettera in italiano.
La risposta deve essere chiara e diretta, senza frasi inutili.
Se bisogna confermare la ricezione, chiarire documenti, chiedere spiegazioni o comunicare informazioni, formulalo correttamente.`,
'Q7':`Spiega in italiano con parole semplici che cosa significa questo testo.
Analizza il contesto: chi scrive, per quale questione, cosa viene richiesto, cosa bisogna fare e quali scadenze, date, importi, documenti o condizioni sono importanti.`,
'Q8':`Estrai tutti i fatti importanti dal testo fornito e strutturali in italiano.
Indica separatamente: persone, organizzazioni, indirizzi, date, scadenze, importi, numeri di documenti, richieste, decisioni, obblighi, documenti citati e prossimi passi.
Non inventare informazioni. Se manca un dato, scrivi: non indicato.`,
'Q9':`Crea in italiano un elenco chiaro delle azioni da compiere sulla base di questo testo.
Determina cosa fare, quali documenti preparare, a chi rispondere, dove rivolgersi, quali scadenze rispettare e a cosa prestare attenzione.
Dividi le azioni per priorità: urgente, importante, possibile più tardi.`,
'Q10':`Redigi una lettera ufficiale cortese in tedesco sulla base del testo fornito.
La lettera deve essere semplice, chiara e corretta, livello A2-B1.
Mantieni tutti i fatti importanti: nomi, date, importi, indirizzi, organizzazioni, numeri di documenti e circostanze.
Termina con: Mit freundlichen Grüßen`};
const S=['textarea','input[type="text"]','input[type="search"]','[contenteditable="true"]','[contenteditable="plaintext-only"]','[role="textbox"]'];
function ie(e){if(!e||!e.matches)return false;if(e.disabled||e.readOnly)return false;const t=e.tagName?e.tagName.toLowerCase():'';const y=(e.getAttribute('type')||'').toLowerCase();if(t==='input'&&!['text','search'].includes(y))return false;return S.some(s=>e.matches(s));}
function fe(t){if(!t)return null;if(ie(t))return t;if(t.closest){const e=t.closest(S.join(','));if(ie(e))return e;}return null;}
function gt(e){const t=e.tagName?e.tagName.toLowerCase():'';return(t==='textarea'||t==='input')?(e.value||''):(e.innerText||e.textContent||'');}
function nc(x){return String(x||'').trim().replace(/\s+/g,'').toUpperCase();}
function end(e){e.focus();const t=e.tagName?e.tagName.toLowerCase():'';if(t==='textarea'||t==='input'){const l=e.value.length;e.setSelectionRange(l,l);return;}const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);r.collapse(false);s.removeAllRanges();s.addRange(r);}
function ev(e,text){try{e.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text}));}catch(_){e.dispatchEvent(new Event('input',{bubbles:true}));}e.dispatchEvent(new Event('change',{bubbles:true}));}
function rt(e,text){const t=e.tagName?e.tagName.toLowerCase():'';e.focus();if(t==='textarea'||t==='input'){e.value=text;end(e);ev(e,text);return;}try{const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);s.removeAllRanges();s.addRange(r);document.execCommand('insertText',false,text);}catch(_){e.textContent=text;}end(e);ev(e,text);}
function note(m){const o=document.getElementById('tampermonkey-universal-ai-prompt-commands-notification');if(o)o.remove();const b=document.createElement('div');b.id='tampermonkey-universal-ai-prompt-commands-notification';b.textContent=m;b.style.cssText='position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35)';document.body.appendChild(b);setTimeout(()=>b.remove(),2200);}
function cr(t){const e=fe(t);if(!e)return;const c=nc(gt(e));if(!Object.prototype.hasOwnProperty.call(COMMANDS,c))return;rt(e,COMMANDS[c]);note(`Trigger ${c} sostituito con un prompt IA pronto`);}
document.addEventListener('input',e=>setTimeout(()=>cr(e.target),20),true);document.addEventListener('keyup',e=>setTimeout(()=>cr(e.target),20),true);document.addEventListener('paste',e=>setTimeout(()=>cr(e.target),50),true);
})();