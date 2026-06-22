const i18n = require('../helpers-html/i18n');

const ICON_URL = './static/fa-4/international-white.svg';

class LangDropMenu {
  constructor(config) {
    this.config = config;
    this.items = {};

    this.$element = $('<div class="dropup lang-dropmenu"></div>');
    this.render();
    this.setActiveLanguage(i18n.getLanguage());
  }

  render() {
    this.$trigger = $('<button></button>')
      .attr('type', 'button')
      .attr('data-toggle', 'dropdown')
      .attr('aria-haspopup', 'true')
      .attr('aria-expanded', 'false')
      .addClass('btn lang-dropmenu-trigger dropdown-toggle')
      .append($('<img>').attr('src', ICON_URL).attr('alt', 'Language'));

    this.$menu = $('<div class="dropdown-menu"></div>');

    Object.entries(this.config.languages).forEach(([code, name]) => {
      const $item = $('<button></button>')
        .attr('type', 'button')
        .addClass('dropdown-item')
        .text(name)
        .on('click', () => {
          i18n.setLanguage(code);
          this.setActiveLanguage(code);
          const url = new URL(window.location.href);
          url.searchParams.set('lang', code);
          window.history.replaceState(null, '', url);
        });
      this.$menu.append($item);
      this.items[code] = $item;
    });

    this.$element.append(this.$trigger).append(this.$menu);
  }

  setActiveLanguage(code) {
    Object.entries(this.items).forEach(([langCode, $item]) => {
      $item.toggleClass('active', langCode === code);
    });
  }
}

module.exports = LangDropMenu;
