
import { loadProjects, loadUsers } from './dataLoader.js';
import { pickImageForProject, formatDate } from './ui.js';
import { applyTranslations } from './i18n.js';
import './bgCanvas.js';

// state
let projects = [];
let users = [];
let lang = localStorage.getItem('pv_lang') || 'en';
let theme = localStorage.getItem('pv_theme') || 'dark';

// DOM
const projectsGrid = document.getElementById('projectsGrid');
const userFilter = document.getElementById('userFilter');
const searchInput = document.getElementById('searchInput');
const typeFilter = document.getElementById('typeFilter');
const sortFilter = document.getElementById('sortFilter');

document.getElementById('langBtn').addEventListener('click', () => {
  lang = lang === 'en' ? 'fa' : 'en';
  localStorage.setItem('pv_lang', lang);
  applyTranslations(lang);
  document.getElementById('langBtn').textContent = lang.toUpperCase();
});

document.getElementById('themeBtn').addEventListener('click', () => {
  document.body.classList.toggle('light');
  theme = document.body.classList.contains('light') ? 'light' : 'dark';
  localStorage.setItem('pv_theme', theme);
  document.getElementById('themeBtn').textContent = theme === 'light' ? '☀' : '🌙';
});

document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('topNav').classList.toggle('open');
});

searchInput.addEventListener('input', filterRender);
typeFilter.addEventListener('change', filterRender);
sortFilter.addEventListener('change', filterRender);
userFilter.addEventListener('change', filterRender);

// watermark click handlers
document.querySelectorAll('.watermark .initial').forEach(el=>{
  el.addEventListener('click',(e)=>{
    const user = el.getAttribute('data-user');
    if(user === 'mehran') window.open('https://github.com/mehranqadirian','_blank');
    if(user === 'nima') window.open('https://github.com/naseridev','_blank');
  });
});

// scroll top
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if(window.scrollY > 300) scrollTopBtn.style.display = 'block';
  else scrollTopBtn.style.display = 'none';
});
scrollTopBtn.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

async function init(){
  applyTranslations(lang);
  document.getElementById('langBtn').textContent = lang.toUpperCase();
  document.getElementById('themeBtn').textContent = theme === 'light' ? '☀' : '🌙';
  if(theme === 'light') document.body.classList.add('light');

  projects = await loadProjects();
  users = await loadUsers();
  populateUserFilter();
  renderProjects(projects);
  renderUsersList();

  // intersection observer for reveal animation
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.card').forEach(c => io.observe(c));
}

function populateUserFilter(){
  const unique = [...new Set(projects.map(p=>p.author))];
  userFilter.innerHTML = '<option value="">All users</option>' + unique.map(u=>`<option value="${u}">${u}</option>`).join('');
}

function renderUsersList(){
  const usersList = document.getElementById('usersList');
  if(!users || users.length===0){ usersList.innerHTML = '<p style="opacity:.6">No users yet</p>'; return; }
  usersList.innerHTML = users.map(u=>`
    <div class="card" style="padding:12px;margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <strong>${u.name}</strong>
        <a class="btn" href="user.html?user=${encodeURIComponent(u.username||u.name)}">Profile</a>
      </div>
      <div style="margin-top:8px;color:var(--muted)">${u.bio||''}</div>
    </div>
  `).join('');
}

function renderProjects(list){
  if(!list || list.length===0){ projectsGrid.innerHTML = '<p style="opacity:.6">No projects</p>'; return; }
  projectsGrid.innerHTML = list.map(p=>{
    const img = p.image ? `<img src="${p.image}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover;">` : `<img src="${pickImageForProject(p)}" alt="${p.title}" style="width:100%;height:100%;object-fit:cover">`;
    return `<article class="card" data-id="${p.id}">
      <a href="project.html?id=${encodeURIComponent(p.id)}" style="text-decoration:none;color:inherit">
        <div class="card-media">${img}</div>
        <div class="card-body">
          <div class="card-title">${escapeHtml(p.title)}</div>
          <div class="card-desc">${escapeHtml(p.description || '')}</div>
          <div class="card-meta"><span>${p.author}</span><span>${formatDate(p.date)}</span></div>
        </div>
      </a>
    </article>`;
  }).join('');

  // re-run observer for new cards
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.card').forEach(c => io.observe(c));
}

function filterRender(){
  const q = (searchInput.value||'').toLowerCase();
  const type = typeFilter.value;
  const user = userFilter.value;
  const sort = sortFilter.value;
  let filtered = projects.filter(p=>{
    const matchQ = p.title.toLowerCase().includes(q) || (p.description||'').toLowerCase().includes(q);
    const matchType = !type || p.type === type;
    const matchUser = !user || p.author === user;
    return matchQ && matchType && matchUser;
  });
  filtered.sort((a,b)=> (sort==='newest') ? (new Date(b.date)-new Date(a.date)) : (new Date(a.date)-new Date(b.date)));
  renderProjects(filtered);
}

function escapeHtml(s){ return (''+s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

init();

// expose for project page usage
export { pickImageForProject } from './ui.js';
export { formatDate } from './ui.js';
