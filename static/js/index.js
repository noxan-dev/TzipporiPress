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
    const IndicatorsInterval = 5000;
    let moveIndicatorsInterval;

    // ./testimonials.json
    $.getJSON('https://noxan-dev.github.io/TzipporiPress/testimonials.json', function (data) {
        let i = 0;
        $.each(data, function (key, val) {
            carouselInner.append(
                `<div class="carousel-item ${i === 1 ? 'active' : ''}">
                 <p><span class="quote">“</span>${val.content}</p>
            </div>`
            );

            carouselIndicators.append(
                `<button type="button" 
                data-bs-target="#carouselTestimonials" 
                data-bs-slide-to="${i}" 
                aria-label="Slide ${i}"
                class="rounded-circle slide-${i} ${i === 1 ? 'active' : ''}"
                style="background-image: url('${val.image}')"
                data-order="${i}"></button>`
            );

            carouselAuthorInfo.append(
                `<div class="carousel-item author-info ${i === 1 ? 'active' : ''}">
                <h4>${val.author}</h4>
                <span>${val.title}</span>
            </div>`
            );
            i++;
        });
        hideExtraIndicators();
    });

    function hideExtraIndicators() {
        let indicators = carouselIndicators.children();

        indicators.each(function () {
            let order = parseInt($(this).attr('data-order'));

            // Show only indicators with data-order values of 0, 1, and 2
            $(this).toggle(order >= 0 && order <= 2);
        });
    }

    function moveIndicators(targetIndex) {
        let indicators = carouselIndicators.children();
        let numIndicators = indicators.length;

        if (typeof targetIndex !== 'undefined') {
            return;
        }

        // Update the order of the indicators
        indicators.each(function () {
            let order = parseInt($(this).attr('data-order'));
            order--;
            if (order < 0) {
                order = numIndicators - 1;
            }
            $(this).attr('data-order', order);
            $(this).css('order', order);
        });

        carouselIndicators.find('.active').removeClass('active');
        carouselIndicators.find('[data-order="1"]').addClass('active');

        let newActiveIndex = carouselIndicators.find('.active').index();

        carouselInner.find('.carousel-item').removeClass('active');
        carouselInner.find(`.carousel-item:nth-child(${newActiveIndex + 1})`).addClass('active');

        // Update the active author info
        carouselAuthorInfo.find('.carousel-item').removeClass('active');
        carouselAuthorInfo.find(`.carousel-item:nth-child(${newActiveIndex + 1})`).addClass('active');

        hideExtraIndicators();
    }

    const carousel = $('.carousel');

    // Stop the carousel from moving when the mouse is over it
    carousel.hover(function () {
        clearInterval(moveIndicatorsInterval);
    }, function () {
        moveIndicatorsInterval = setInterval(() => moveIndicators(), IndicatorsInterval);
    });

    // Move the indicators when the user clicks on one
    carouselIndicators.on('click', 'button', function () {
        let targetIndex = $(this).data('order');
        let activeIndex = carouselIndicators.find('.active').index();

        if (targetIndex !== activeIndex) {
            clearInterval(moveIndicatorsInterval);
            moveIndicators(targetIndex);
            moveIndicatorsInterval = setInterval(moveIndicators, IndicatorsInterval);
        }
    });
});
