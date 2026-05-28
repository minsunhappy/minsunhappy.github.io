/* ============================================
   Lightbox — Click to enlarge images
   ============================================ */

(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.getElementById('lightbox-close');

  if (!lightbox || !lightboxImg) return;

  // Open on image click
  document.querySelectorAll('.lightbox-trigger').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close handlers
  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', close);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('open')) close();
      if (cvModal && cvModal.classList.contains('open')) closeCv();
    }
  });

  // --- CV Modal ---
  var cvModal = document.getElementById('cv-modal');
  var cvOpenBtn = document.getElementById('cv-open-btn');
  var cvCloseBtn = document.getElementById('cv-modal-close');

  var navCvLink = document.getElementById('nav-cv-link');

  function openCv() {
    cvModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (cvModal && navCvLink) {
    navCvLink.addEventListener('click', openCv);

    function closeCv() {
      cvModal.classList.remove('open');
      document.body.style.overflow = '';
    }

    cvCloseBtn.addEventListener('click', closeCv);

    cvModal.addEventListener('click', function (e) {
      if (e.target === cvModal) closeCv();
    });
  }
})();
