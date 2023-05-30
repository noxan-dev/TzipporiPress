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
    const pauseDuration = 5000;
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

            $(this).toggle(order >= 0 && order <= 2);
        });
    }

    function indicatorClicked(direction, targetIndex) {
        clearInterval(moveIndicatorsInterval);
        moveIndicators(direction, targetIndex);

        setTimeout(() => {
            clearInterval(moveIndicatorsInterval);
            moveIndicatorsInterval = setInterval(() => moveIndicators('right'), IndicatorsInterval);
        }, pauseDuration);
    }

    function moveIndicators(direction, targetIndex = 1) {
        reorderIndicators(targetIndex, direction);

        let newActiveIndex = carouselIndicators.find(`[data-order="${targetIndex}"]`).index();

        carouselIndicators.find('.active').removeClass('active');
        carouselIndicators.find(`[data-order="${targetIndex}"]`).addClass('active');

        carouselInner.find('.carousel-item').removeClass('active');
        carouselInner.find(`.carousel-item:nth-child(${newActiveIndex + 1})`).addClass('active');

        carouselAuthorInfo.find('.carousel-item').removeClass('active');
        carouselAuthorInfo.find(`.carousel-item:nth-child(${newActiveIndex + 1})`).addClass('active');
    }

    function reorderIndicators(steps, direction) {
        let indicators = carouselIndicators.children();
        let numIndicators = indicators.length;
        indicators.each(function () {
            let currentOrder = parseInt($(this).attr('data-order'));
            let newOrder;

            if (direction === 'right') {
                newOrder = (currentOrder - steps + numIndicators) % numIndicators;
            } else {
                newOrder = (currentOrder + steps) % numIndicators;
            }

            $(this).attr('data-order', newOrder);
            $(this).css('order', newOrder);
        });

        hideExtraIndicators();
    }

    carouselIndicators.on('click', 'button', function () {
        // if ($(this).hasClass('active')) return;
        let targetIndex = $(this).data('order');
        let direction = targetIndex === 0 ? 'left' : 'right';
        indicatorClicked(direction);
    });

    moveIndicatorsInterval = setInterval(() => moveIndicators('right'), IndicatorsInterval);

    const carousel = $('.carousel');

    carousel.hover(function () {
        clearInterval(moveIndicatorsInterval);
    }, function () {
        moveIndicatorsInterval = setInterval(() => moveIndicators('right'), IndicatorsInterval);
    });
});
