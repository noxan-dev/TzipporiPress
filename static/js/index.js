const navLinks = $('.nav-link');

navLinks.on('click', function () {
    $('#check').prop('checked', false);
    $('#nav-icon').removeClass('open');
});

$(document).ready(function () {
    const navIcon = $('#nav-icon');
    navIcon.on('click', function () {
        navIcon.toggleClass('open');
    });
});

$.getJSON('../testimonials.json', function (data) {
    const testimonials = data.testimonials;
    const testimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
    $('#testimonial').html(testimonial.text);
    $('#author').html(testimonial.author);
    $('#author').attr('href', testimonial.url);
}
);
