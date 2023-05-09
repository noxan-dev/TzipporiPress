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

$(document).ready(function () {
    let carouselIndicators = $('.carousel-indicators');
    let carouselInner = $('.carousel-inner');

    $.getJSON('https://noxan-dev.github.io/TzipporiPress/testimonials.json', function (data) {
        let i = 0;
        $.each(data, function (key, val) {
            carouselInner.append(
                `<div class="carousel-item ${i === 0 ? 'active' : ''}">
                    <p><span class="quote">“</span>${val.text}</p>
                    <div class="author-info">
                      <h4>${val.author}</h4>
                      <span>${val.title}</span>
                    </div>
                  </div>`
            );

            carouselIndicators.append(
                `<button type="button" 
                    data-bs-target="#carouselTestimonials" 
                    data-bs-slide-to="${i}" 
                    aria-label="Slide ${i}"
                    class="slide-${i} ${i === 0 ? 'active' : ''}"
                    ${i === 0 ? 'aria-current="true"' : ''} 
                    style="background-image: url('${val.image}')"></button>`
            );
            i++;
        });
        $('.carousel').carousel();
    });
});
