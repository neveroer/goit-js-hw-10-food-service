import menuCardTpl from './templates/menu-tpl.hbs';
import menuItems from './menu.json';
import './styles.css';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const { LIGHT, DARK } = Theme;
const DEFAULT_THEME = LIGHT;

const body = document.querySelector('body');
const menu = document.querySelector('.js-menu');
const switchInput = document.querySelector('.theme-switch__toggle');

//////////////////////// helpers

// menu rendering

function initMenu() {
    let menuEl = menuItems.map(menuCardTpl).join('');
    menu.insertAdjacentHTML("beforeend", menuEl);
}

// save / load logic

function saveTheme(themeClass) {
    localStorage.setItem("theme", themeClass);
}

function loadThemeOrDefault() {
    return localStorage.getItem("theme") || DEFAULT_THEME;
}

// DOM manipulation for theme init / switch

function initTheme(themeClass) {
    body.classList.add(themeClass);
    if (themeClass === DARK) {
        switchInput.checked = true;
    }
}

function switchTheme(themeTo) {
    let themeFrom = (themeTo === DARK) ? LIGHT : DARK;
    body.classList.remove(themeFrom);
    body.classList.add(themeTo);
}

//////////////////////// page logic

document.addEventListener("DOMContentLoaded", initPage);
switchInput.addEventListener("change", onThemeSwitch);

function initPage(event) {
    initMenu();
    let currentTheme = loadThemeOrDefault();
    initTheme(currentTheme);
}

function onThemeSwitch(event) {
    let themeTo = event.target.checked ? DARK : LIGHT;
    switchTheme(themeTo);
    saveTheme(themeTo);
};
