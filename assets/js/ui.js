
// UI helper functions shared by pages
const langIcons = {
  js: svgDataUri('JS'),
  php: svgDataUri('PHP'),
  csharp: svgDataUri('C#'),
  python: svgDataUri('PY'),
  html: svgDataUri('HTML'),
  css: svgDataUri('CSS'),
  default: svgDataUri('PKG')
};

function svgDataUri(text){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100" viewBox="0 0 160 100" role="img" aria-label="${text}">
    <rect width="160" height="100" rx="8" fill="#0b1220"/>
    <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-size="28" fill="#ffffff" font-family="Arial, Helvetica, sans-serif">${text}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// pick image: if project.image exists return <img> else combine icons for languages
export function pickImageForProject(project) {
  if (project.image) {
    return `<img src="${project.image}" alt="${escapeHtml(project.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
  }
  const langs = project.languages || [];
  if (langs.length === 0) {
    return `<img src="${langIcons.default}" alt="project" loading="lazy" style="width:100%;height:100%;object-fit:cover;">`;
  }
  if (langs.length === 1) {
    const key = langs[0].toLowerCase().replace('#','sharp').replace('c++','cpp');
    const src = langIcons[key] || langIcons[langs[0].toLowerCase()] || langIcons.default;
    return `<img src="${src}" alt="${escapeHtml(project.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`;
  }
  // multiple languages -> create group SVG
  const parts = langs.slice(0,4).map((l,i) => {
    const text = l.length<=3 ? l.toUpperCase() : (l[0].toUpperCase());
    const x = i*40;
    return `<g transform="translate(${x},0)"><rect x="0" y="0" width="40" height="100" fill="rgba(255,255,255,${0.06 + i*0.02})" /><text x="20" y="55" font-size="18" text-anchor="middle" fill="#fff">${escapeHtml(text)}</text></g>`;
  }).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="100" viewBox="0 0 160 100">${parts}</svg>`;
  return `<img src="data:image/svg+xml;utf8,${encodeURIComponent(svg)}" alt="${escapeHtml(project.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover">`;
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
      <div style="margin-top:12px">${projects.map(p=>`<div class="card" style="margin-bottom:8px;padding:8px"><a href="project.html?id=${encodeURIComponent(p.id)}">${escapeHtml(p.title)}</a></div>`).join('')}</div>
    </div>
  `;
  container.innerHTML = html;
}

export { svgDataUri as svgIcon };
