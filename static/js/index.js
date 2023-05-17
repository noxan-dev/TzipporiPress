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

    // ./testimonials.json
    $.getJSON('https://noxan-dev.github.io/TzipporiPress/testimonials.json', function (data) {
        let i = 0;
        $.each(data, function (key, val) {
            carouselInner.append(
                `<div class="carousel-item">
                 <p><span class="quote">“</span>${val.content}</p>
            </div>`
            );

            carouselIndicators.append(
                `<button type="button" 
                data-bs-target="#carouselTestimonials" 
                data-bs-slide-to="${i}" 
                aria-label="Slide ${i}"
                class="rounded-circle slide-${i}"
                style="background-image: url('${val.image}')"
                data-order="${i}"></button>`
            );

            carouselAuthorInfo.append(
                `<div class="carousel-item author-info">
                <h4>${val.author}</h4>
                <span>${val.title}</span>
            </div>`
            );
            i++;
        });
    });

    function moveIndicators(targetIndex) {
        let indicators = carouselIndicators.children();
        let activeIndex = carouselIndicators.find('.active').index();
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

            // Show only indicators with data-order values of 0, 1, and 2
            if (order >= 0 && order <= 2) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });

        carouselIndicators.find('.active').removeClass('active');
        carouselIndicators.find('[data-order="1"]').addClass('active');

        let newActiveIndex = carouselIndicators.find('.active').index();

        carouselInner.find('.carousel-item').removeClass('active');
        carouselInner.find(`.carousel-item:nth-child(${newActiveIndex + 1})`).addClass('active');

        // Update the active author info
        carouselAuthorInfo.find('.carousel-item').removeClass('active');
        carouselAuthorInfo.find(`.carousel-item:nth-child(${newActiveIndex + 1})`).addClass('active');
    }

    let moveIndicatorsInterval = setInterval(moveIndicators, 5000);
    const carousel = $('.carousel');

    carousel.hover(function () {
        clearInterval(moveIndicatorsInterval);
    }, function () {
        moveIndicatorsInterval = setInterval(moveIndicators, 5000);
    });


    carouselIndicators.on('click', 'button', function () {
        let targetIndex = $(this).data('order');
        let activeIndex = carouselIndicators.find('.active').index();

        if (targetIndex !== activeIndex) {
            clearInterval(moveIndicators);
            moveIndicators(targetIndex);
        }
    });
});
