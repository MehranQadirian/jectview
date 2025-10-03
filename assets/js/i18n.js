
const translations = {
  en: {
    nav_projects: "Projects",
    nav_users: "Users",
    nav_about: "About",
    search_placeholder: "Search projects..."
  },
  fa: {
    nav_projects: "پروژه‌ها",
    nav_users: "اعضای گروه",
    nav_about: "درباره",
    search_placeholder: "جست‌وجوی پروژه..."
  }
};

export function t(key, lang='en') {
  return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
}

export function applyTranslations(lang='en') {
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    el.textContent = t(k, lang);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const k = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(k, lang));
  });
}
