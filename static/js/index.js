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
    let carouselAuthorInfo = $('.carousel-author-info');

    $.getJSON('./testimonials.json', function (data) {
        let i = 0;
        $.each(data, function (key, val) {
            carouselInner.append(
                `<div class="carousel-item ${i === 0 ? 'active' : ''}">
                     <p><span class="quote">“</span>${val.content}</p>
                </div>`
            );

            carouselIndicators.append(
                `<button type="button" 
                    data-bs-target="#carouselTestimonials" 
                    data-bs-slide-to="${i}" 
                    aria-label="Slide ${i}"
                    class="rounded-circle slide-${i} ${i === 0 ? 'active' : ''}"
                    ${i === 0 ? 'aria-current="true"' : ''} 
                    style="background-image: url('${val.image}')"></button>`
            );
            carouselAuthorInfo.append(
                `<div class="carousel-item author-info ${i === 0 ? 'active' : ''}">
                    <h4>${val.author}</h4>
                    <span>${val.title}</span>
                </div>`
            );
            i++;
        });

        let numIndicators = carouselIndicators.children().length;
        const maxVisibleIndicators = 3;
        if (numIndicators > maxVisibleIndicators) {
            carouselIndicators.children().slice(maxVisibleIndicators).hide();
        }

        $('.carousel').carousel();

    });

    $('.carousel').on('slid.bs.carousel', function (e) {
        carouselAuthorInfo.find('.carousel-item').removeClass('active');
        carouselAuthorInfo.find(`.carousel-item:nth-child(${e.to + 1})`).addClass('active');
    });
});
