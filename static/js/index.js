window.addEventListener('scroll', function () {
    document.querySelector('.nav-container').classList.toggle('scrolled', window.scrollY > document.querySelector('.nav-container').offsetHeight);
});


let animation = anime({
        targets: '#services .item-1',
        left: '20px',
        easing: 'easeInOutQuad',
        duration: 1000,
    });