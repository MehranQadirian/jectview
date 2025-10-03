
const translations = {
  en: {
    nav_projects: "Projects",
    nav_users: "Users",
    nav_about: "About",
    search_placeholder: "Search projects...",
    contributors: "Contributors",
    about_title: "About",
    about_text: "A modular static showcase built for GitHub Pages.",
    open_github: "Open on GitHub",
    theme_light: "Light",
    theme_dark: "Dark",
    back: "Back"
  },
  fa: {
    nav_projects: "پروژه‌ها",
    nav_users: "اعضا",
    nav_about: "درباره",
    search_placeholder: "جست‌وجوی پروژه...",
    contributors: "اعضا",
    about_title: "درباره",
    about_text: "یک قالب ماژولار برای نمایش پروژه‌ها مناسب GitHub Pages.",
    open_github: "مشاهده در گیت‌هاب",
    theme_light: "روشن",
    theme_dark: "تاریک",
    back: "بازگشت"
  }
};

export function t(key, lang='en') {
  return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
}

export function applyTranslations(lang='en') {
  document.documentElement.setAttribute('lang', lang);
  // set dir for RTL languages
  const rtl = ['fa','ar','he'];
  document.documentElement.setAttribute('dir', rtl.includes(lang) ? 'rtl' : 'ltr');

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    el.textContent = t(k, lang);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
    const k = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(k, lang));
  });
}
