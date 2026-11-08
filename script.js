/* WhatsApp: put the clinic number here in international format without "+", e.g. "77011234567" */
var WA_NUMBER = "";
var WA_TEXT = {kk:"Сәлем! Қабылдауға жазылғым келеді.", ru:"Здравствуйте! Хочу записаться на приём."};
function applyLang(l){
  l = l === 'ru' ? 'ru' : 'kk';
  document.documentElement.dataset.lang = l;
  document.documentElement.lang = l;
  document.querySelectorAll('[data-set-lang]').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.setLang === l)); });
  var href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(WA_TEXT[l]);
  document.querySelectorAll('[data-wa]').forEach(function(a){ a.href = href; });
  document.querySelectorAll('.card-form option').forEach(function(o){ o.textContent = o.dataset[l]; });
  refreshBook(l);
}
var MSG_TPL = {
  kk: function(n,p,s,t){ return 'Сәлем! Қабылдауға жазылғым келеді.' + (n?' Атым: '+n+'.':'') + ' Қызмет: '+s+'. Ыңғайлы уақыт: '+t+'.' + (p?' Телефоным: '+p+'.':''); },
  ru: function(n,p,s,t){ return 'Здравствуйте! Хочу записаться на приём.' + (n?' Меня зовут '+n+'.':'') + ' Услуга: '+s+'. Удобное время: '+t+'.' + (p?' Мой телефон: '+p+'.':''); }
};
function refreshBook(l){
  l = l || document.documentElement.dataset.lang || 'kk';
  var f = document.getElementById('bookForm'); if(!f) return;
  var txt = MSG_TPL[l](f.bName.value.trim(), f.bPhone.value.trim(), f.bSvc.selectedOptions[0].dataset[l], f.bTime.selectedOptions[0].dataset[l]);
  document.getElementById('bMsg').textContent = txt;
  document.getElementById('bSend').href = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(txt);
}
document.getElementById('bookForm').addEventListener('input', function(){ refreshBook(); });
document.getElementById('bookForm').addEventListener('submit', function(e){ e.preventDefault(); });
document.querySelectorAll('[data-set-lang]').forEach(function(b){
  b.addEventListener('click', function(){
    applyLang(b.dataset.setLang);
    try{ localStorage.setItem('lsp-lang', b.dataset.setLang); }catch(e){}
  });
});
applyLang(document.documentElement.dataset.lang);
