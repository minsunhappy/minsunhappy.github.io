/* ============================================
   Navigation — Scroll spy, hamburger menu
   ============================================ */

(function () {
  var sections = document.querySelectorAll('.section[id]');
  var navLinks = document.querySelectorAll('.nav__link[href^="#"]');
  var hamburger = document.getElementById('nav-hamburger');
  var navMenu = document.getElementById('nav-links');

  // Scroll spy — highlight active nav link
  function onScroll() {
    var scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
      var isOpen = hamburger.classList.contains('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }
})();
