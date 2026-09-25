(() => {
  const cfg = window.SITE_CONFIG;
  const posts = Array.isArray(window.UPDATE_POSTS) ? window.UPDATE_POSTS : [];
  const faqs = Array.isArray(cfg?.faq) ? cfg.faq : [];
  const $ = (s) => document.querySelector(s);

  document.title = cfg.siteName;
  $('#footerName').textContent = cfg.siteName;
  $('#copyrightName').textContent = cfg.brand;
  $('#discordLink').href = cfg.discordUrl;
  $('#inviteCard').href = cfg.discordUrl;
  $('#contactBtn').href = cfg.supportUrl || cfg.discordUrl;
  $('#year').textContent = new Date().getFullYear();

  const sorted = [...posts].sort((a,b) => new Date(b.date) - new Date(a.date));
  $('#updateCount').textContent = sorted.length;
  $('#statUpdates').textContent = sorted.length;
  $('#statTopics').textContent = new Set(sorted.flatMap(p => p.tags || [])).size;
  if (sorted[0]) {
    $('#latestVersion').textContent = sorted[0].version || 'latest';
    $('#lastUpdated').textContent = 'Cập nhật ' + formatDate(sorted[0].date);
  }

  const filterNames = ['Tất cả', ...new Set(sorted.map(p => p.type).filter(Boolean))];
  let activeFilter = 'Tất cả';
  const filters = $('#filters');
  filterNames.forEach(name => {
    const b = document.createElement('button');
    b.className = 'filter' + (name === activeFilter ? ' active' : '');
    b.textContent = name;
    b.onclick = () => { activeFilter = name; [...filters.children].forEach(x => x.classList.remove('active')); b.classList.add('active'); render(); };
    filters.appendChild(b);
  });

  $('#searchInput').addEventListener('input', render);
  render();
  renderFaq();

  function render() {
    const q = $('#searchInput').value.trim().toLowerCase();
    const list = sorted.filter(p => {
      const hay = [p.title,p.summary,p.content,p.version,p.type,...(p.tags||[])].join(' ').toLowerCase();
      return (activeFilter === 'Tất cả' || p.type === activeFilter) && (!q || hay.includes(q));
    });
    const grid = $('#updatesGrid'); grid.innerHTML='';
    $('#emptyState').classList.toggle('hidden', list.length !== 0);
    list.forEach(p => grid.appendChild(postCard(p)));
  }

  function postCard(p) {
    const el = document.createElement('article');
    el.className = 'update-card';
    el.innerHTML = `
      <div class="update-top"><span class="tag">${escapeHtml(p.type || 'UPDATE')}</span><span class="date">${formatDate(p.date)}</span></div>
      <h3>${escapeHtml(p.title)}</h3>
      <p>${escapeHtml(p.summary || '')}</p>
      <div class="update-footer"><span class="version">${escapeHtml(p.version || '')}</span><button class="read-btn">Đọc chi tiết →</button></div>`;
    el.querySelector('button').onclick = () => openPost(p);
    return el;
  }

  function openPost(p) {
    $('#modalContent').innerHTML = `
      <span class="eyebrow">${escapeHtml(p.type || 'UPDATE')}</span>
      <h1>${escapeHtml(p.title)}</h1>
      <div class="meta">${formatDate(p.date)} ${p.version ? '• ' + escapeHtml(p.version) : ''}</div>
      <div class="modal-body">${renderMarkdownLite(p.content || '')}</div>`;
    $('#postModal').classList.remove('hidden');
    document.body.style.overflow='hidden';
  }
  function closePost(){ $('#postModal').classList.add('hidden'); document.body.style.overflow=''; }
  $('#modalClose').onclick = closePost;
  document.querySelector('.modal-backdrop').onclick = closePost;
  window.addEventListener('keydown', e => { if(e.key === 'Escape') closePost(); });

  function renderFaq(){
    const box = $('#faqList'); box.innerHTML='';
    faqs.forEach((f,i)=>{
      const el=document.createElement('div'); el.className='faq';
      el.innerHTML=`<button aria-expanded="false"><span>${escapeHtml(f.question)}</span><span>＋</span></button><div class="faq-answer">${escapeHtml(f.answer)}</div>`;
      el.querySelector('button').onclick=()=>{const open=el.classList.toggle('open'); el.querySelector('button').setAttribute('aria-expanded',open); el.querySelectorAll('span')[1].textContent=open?'−':'＋';};
      box.appendChild(el);
    });
  }

  $('#menuBtn').onclick=()=>$('.nav').classList.toggle('open');

  function formatDate(d){ const x=new Date(d); return Number.isNaN(x.getTime()) ? d : new Intl.DateTimeFormat('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'}).format(x); }
  function escapeHtml(v){return String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  function renderMarkdownLite(text){
    return text.split('\n').map(line=>{
      if(/^### /.test(line)) return `<h3>${escapeHtml(line.slice(4))}</h3>`;
      if(/^```/.test(line)) return '';
      if(/^- /.test(line)) return `<p>• ${escapeHtml(line.slice(2))}</p>`;
      if(!line.trim()) return '<br>';
      const safe=escapeHtml(line).replace(/`([^`]+)`/g,'<code>$1</code>');
      return `<p>${safe}</p>`;
    }).join('');
  }
})();
