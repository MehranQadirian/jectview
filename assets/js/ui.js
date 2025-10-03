
// UI helper functions shared by pages
const langIcons = {
  js: svgIcon('JS','javascript'),
  php: svgIcon('php','php'),
  csharp: svgIcon('C#','csharp'),
  python: svgIcon('py','python'),
  html: svgIcon('html','html'),
  css: svgIcon('css','css'),
  default: svgIcon('📦','default')
};

function svgIcon(text, cls='') {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100" viewBox="0 0 160 100">
    <rect width="160" height="100" rx="8" fill="#0b1220"/>
    <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-size="28" fill="#ffffff" font-family="Arial, Helvetica, sans-serif">${text}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// pick image: if project.image exists return <img> else combine icons for languages
export function pickImageForProject(project) {
  if (project.image) {
    return `<img src="${project.image}" alt="${escapeHtml(project.title)}" style="width:100%;height:100%;object-fit:cover;">`;
  }
  const langs = project.languages || [];
  if (langs.length === 0) {
    return `<img src="${langIcons.default}" style="width:100%;height:100%;object-fit:cover;">`;
  }
  if (langs.length === 1) {
    const key = langs[0].toLowerCase();
    const src = langIcons[key] || langIcons.default;
    return `<img src="${src}" style="width:100%;height:100%;object-fit:cover">`;
  }
  // multiple languages -> create group SVG
  const parts = langs.slice(0,4).map((l,i) => {
    const text = l.length<=3 ? l.toUpperCase() : l[0].toUpperCase();
    return `<rect x="${i*40}" y="0" width="40" height="100" fill="rgba(255,255,255,${0.06 + i*0.02})" />
      <text x="${i*40+20}" y="55" font-size="18" text-anchor="middle" fill="#fff">${escapeHtml(text)}</text>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 160 100">${parts}</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

export function formatDate(d) {
  const date = new Date(d);
  return date.toLocaleDateString();
}

export function escapeHtml(s){ return (''+s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// renderers for user page
export function renderUserProfile(user, projects) {
  const container = document.getElementById('userProfile');
  const html = `
    <div class="card" style="padding:18px">
      <h2>${escapeHtml(user.name)}</h2>
      <p>${escapeHtml(user.bio||'')}</p>
      <p><strong>Projects: </strong> ${projects.length}</p>
      <div style="margin-top:12px">${projects.map(p=>`<div class="card" style="margin-bottom:8px;padding:8px"><a href="project.html?id=${p.id}">${escapeHtml(p.title)}</a></div>`).join('')}</div>
    </div>
  `;
  container.innerHTML = html;
}

export { svgIcon };
