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
    const pauseDuration = 800; // Reduced from 5000 to improve responsiveness
    let moveIndicatorsInterval;
    let isTransitioning = false; // Flag to prevent multiple clicks during transition

    // Load testimonials from JSON
    $.getJSON('https://noxan-dev.github.io/TzipporiPress/testimonials.json', function (data) {
        let i = 0;
        $.each(data, function (key, val) {
            // Add carousel content
            carouselInner.append(
                `<div class="carousel-item ${i === 1 ? 'active' : ''}">
                   <p><span class="quote" style="line-height:inherit">"</span>${val.content}</p>
                 </div>`
            );

            // Add carousel indicator button
            carouselIndicators.append(
                `<button type="button" 
                  data-bs-target="#carouselTestimonials" 
                  data-bs-slide-to="${i}" 
                  aria-label="Slide ${i}"
                  class="rounded-circle slide-${i} ${i === 1 ? 'active' : ''}"
                  style="background-image: url('${val.image}');"
                  data-order="${i}"></button>`
            );

            // Add author info
            carouselAuthorInfo.append(
                `<div class="carousel-item author-info ${i === 1 ? 'active' : ''}">
                   <h4>${val.author}</h4>
                   <span>${val.title}</span>
                 </div>`
            );
            i++;
        });

        // Initialize indicator visibility
        hideExtraIndicators();

        // Start auto-rotation
        moveIndicatorsInterval = setInterval(() => moveIndicators('right'), IndicatorsInterval);
    }).fail(function(jqxhr, textStatus, error) {
        console.error("Failed to load testimonials:", textStatus, error);
    });

    // Show only 3 indicators at a time
    function hideExtraIndicators() {
        let indicators = carouselIndicators.children();

        indicators.each(function () {
            let order = parseInt($(this).attr('data-order'));
            $(this).toggle(order >= 0 && order <= 2);
        });
    }

    // Handle indicator click
    carouselIndicators.on('click', 'button', function () {
        if (isTransitioning) return; // Prevent clicks while transitioning

        clearInterval(moveIndicatorsInterval);
        let targetOrder = parseInt($(this).attr('data-order'));

        // Determine direction based on the current order (0=left, 2=right, 1=center)
        let direction;
        if (targetOrder === 0) {
            direction = 'left';
        } else if (targetOrder === 2) {
            direction = 'right';
        } else {
            // Already centered, no need to move
            return;
        }

        indicatorClicked(direction, targetOrder);
    });

    // Process indicator click
    function indicatorClicked(direction, targetOrder) {
        if (isTransitioning) return;
        isTransitioning = true;

        // Find the indicator with the target order
        let clickedIndicator = carouselIndicators.find(`[data-order="${targetOrder}"]`);
        let clickedIndex = clickedIndicator.index();

        // Update active content immediately based on the clicked indicator
        carouselInner.find('.carousel-item').removeClass('active');
        carouselInner.find(`.carousel-item:eq(${clickedIndex})`).addClass('active');

        carouselAuthorInfo.find('.carousel-item').removeClass('active');
        carouselAuthorInfo.find(`.carousel-item:eq(${clickedIndex})`).addClass('active');

        // Move the clicked indicator to the center (order 1)
        moveIndicators(direction, 1);

        // Re-enable clicking after transition
        setTimeout(function () {
            isTransitioning = false;

            // Restart auto-rotation
            clearInterval(moveIndicatorsInterval);
            moveIndicatorsInterval = setInterval(() => moveIndicators('right'), IndicatorsInterval);
        }, pauseDuration);
    }

    // Main function to move indicators and update content
    function moveIndicators(direction, targetOrder = 1) {
        // Reorder indicators based on direction
        reorderIndicators(1, direction);

        // Find the indicator that should now be active (always the center one with order 1)
        let newActiveIndicator = carouselIndicators.find(`[data-order="1"]`);
        let newActiveIndex = newActiveIndicator.index();

        // Update active classes for indicators
        carouselIndicators.find('.active').removeClass('active');
        newActiveIndicator.addClass('active');

        // Update the content slides if this wasn't from a manual click
        // (Manual clicks update content immediately in indicatorClicked function)
        if (!isTransitioning) {
            carouselInner.find('.carousel-item').removeClass('active');
            carouselInner.find(`.carousel-item:eq(${newActiveIndex})`).addClass('active');

            // Update author info
            carouselAuthorInfo.find('.carousel-item.active').removeClass('active');
            carouselAuthorInfo.find(`.carousel-item:eq(${newActiveIndex})`).addClass('active');
        }

        // Update which indicators are visible
        hideExtraIndicators();
    }

    // Reorder the indicators to create the shifting effect
    function reorderIndicators(steps, direction) {
        let indicators = carouselIndicators.children();
        let numIndicators = indicators.length;

        indicators.each(function () {
            let currentOrder = parseInt($(this).attr('data-order'));
            let newOrder;

            if (direction === 'right') {
                // Move indicators to the left (content moves right)
                newOrder = (currentOrder - steps + numIndicators) % numIndicators;
            } else {
                // Move indicators to the right (content moves left)
                newOrder = (currentOrder + steps) % numIndicators;
            }

            $(this).attr('data-order', newOrder);
            $(this).css('order', newOrder);
        });

        hideExtraIndicators();
    }

    // Pause auto-rotation on hover
    const carousel = $('.carousel');
    carousel.hover(function () {
        clearInterval(moveIndicatorsInterval);
    }, function () {
        clearInterval(moveIndicatorsInterval);
        moveIndicatorsInterval = setInterval(() => moveIndicators('right'), IndicatorsInterval);
    });

    // Add keyboard navigation (optional)
    $(document).keydown(function(e) {
        if (isTransitioning) return;

        if (e.keyCode === 37) { // Left arrow
            clearInterval(moveIndicatorsInterval);
            indicatorClicked('left', 0);
        } else if (e.keyCode === 39) { // Right arrow
            clearInterval(moveIndicatorsInterval);
            indicatorClicked('right', 2);
        }
    });
});