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

let carouselindicators = $('.carousel-indicators');
let carouselinner = $('.carousel-inner');

$.getJSON('../testimonials.json', function (data) {
    var i= 0;
    $.each(data, function (key, val) {
        carouselindicators.append(
            `<button type="button" 
                    data-bs-target="#carouselTestimonials" 
                    data-bs-slide-to="${i}" 
                    aria-label="Slide ${i}"
                    class="slide-${i} ${key == 0 ? 'active' : ''}"
                    ${key == 0 ? 'aria-current="true"': ''} 
                    style="background-image: url('${val.image}')"></button>`
        );
        i++;
        carouselinner.append(
            `<div class="carousel-item ${key == 0 ? 'active' : ''}">
                <p>${val.text}</p>
                <h4>${val.author}</h4>
                <span>${val.title}</span>
            </div>`
        );
    });
});
