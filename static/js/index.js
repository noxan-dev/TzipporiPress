// Select element function
const selectElement = (element) =>
    document.querySelector(element);
const getAllWithClass = (className) =>
    document.getElementsByClassName(className);

const
    body = selectElement('body'),
    // Converts the returned collection to a proper Array
    navLinks = Array.from(getAllWithClass("nav-link"));

// Close menu on .nav-link click
navLinks.forEach(link => { // The Array method `forEach` loops through
    link.addEventListener('click', function () {
        document.getElementById("check").checked = false;
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const navIcon = document.getElementById("nav-icon");
    navIcon.addEventListener("click", function () {
        navIcon.classList.toggle("open");
    });
});

$(window).scroll(function () {

    // selectors
    var $window = $(window),
        $body = $('body'),
        $panel = $('.panel');

    // Change 33% earlier than scroll position so colour is there when you arrive.
    var scroll = $window.scrollTop() + ($window.height() / 3);

    $panel.each(function () {
        var $this = $(this);

        // if position is within range of this panel.
        // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
        // Remember we set the scroll to 33% earlier in scroll var.
        if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

            // Remove all classes on body with color-
            $body.removeClass(function (index, css) {
                return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
            });
            $body.addClass('color-' + $(this).data('color'));
        }
    });
}).scroll();
