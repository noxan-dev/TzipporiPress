window.addEventListener('scroll', function () {

    document.querySelector('.nav-container').classList.toggle('scrolled', window.scrollY > document.querySelector('.nav-container').offsetHeight);
});