export default class Navigation {

  constructor(selector) {
    this.menuItems = document.querySelectorAll(selector + '__item');
    this.sections = document.querySelectorAll('.main__section');
    this.nav = document.querySelector('.nav');
    this.headerContainer = document.querySelector('.header__container');
    this.init();
  }

  init(selector) {
    let sectionsLength = this.sections.length;
    let menuItems = this.menuItems;
    let headerContainer = this.headerContainer;
    let nav = this.nav;
    let navTop = nav.offsetTop;
    let menuLinks = [];

    menuItems.forEach(menuItem => {
      menuLinks.push(menuItem.querySelector('a'));
    });

    this.smoothScroll(menuLinks);

    window.addEventListener('scroll', () => {
      this.activeScroll(menuLinks, sectionsLength);
      this.stickyNav(nav, headerContainer, navTop);
    });
  }

  stickyNav(nav, headerContainer, navTop) {
    if (window.scrollY >= navTop) {
      nav.classList.add('sticky');
      headerContainer.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
      headerContainer.classList.remove('sticky');
    }
  }

  activeScroll(menuLinks, sectionsLength) {
    let scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    for (let i = 0; i < sectionsLength; i++) {
      let currLink = menuLinks[i];
      let val = currLink.getAttribute('href');
      let refElement = document.querySelector(val);
      if (refElement.offsetTop <= scrollPos && (refElement.offsetTop + refElement.offsetHeight > scrollPos)) {
        menuLinks.forEach((menuLink) => menuLink.classList.remove('active'));
        currLink.classList.add('active');
      } else {
        currLink.classList.remove('active');
      }
    }
  }

  smoothScroll(menuLinks) {
    menuLinks.forEach(menuLink => (menuLink.onclick = this.scrollAnchors));
  }

  scrollAnchors(e, respond = null) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
    e.preventDefault();
    var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
    const targetAnchor = document.querySelector(targetID);
    if (!targetAnchor) return;
    const originalTop = distanceToTop(targetAnchor);
    window.scrollBy({
      top: originalTop,
      left: 0,
      behavior: 'smooth'
    });
    const checkIfDone = setInterval(function() {
      const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
      if (distanceToTop(targetAnchor) === 1 || atBottom) {
        targetAnchor.tabIndex = '0';
        targetAnchor.focus();
        window.history.pushState('', '', targetID);
        clearInterval(checkIfDone);
      }
    }, 100);
  }

}
