$(document).ready(function () {
    // Adjust for fixed navbar offset
    const navbarHeight = $('.navbar').outerHeight();

    // Smooth scrolling with active link update and dynamic URL update
    $('a.nav-link').click(function (e) {
        e.preventDefault();

        // Get target section's ID from href
        const targetSection = $(this).attr('href');
        const targetOffset = $(targetSection).offset().top - navbarHeight;

        // Smoothly scroll to the target section with speed based on distance
        $('html, body').animate(
            {
                scrollTop: targetOffset,
            },
            Math.min(Math.abs($(window).scrollTop() - targetOffset), 1000) // Max duration of 1000ms
        );

        // Update the active class for navigation links
        $('.nav-link').removeClass('active');
        $(this).addClass('active');

        // Update the URL without reloading the page
        window.history.pushState(null, null, targetSection);
    });

    // Highlight active link as the user scrolls
    $(window).on('scroll', function () {
        var currentScroll = $(this).scrollTop() + navbarHeight + 1; // Add a small buffer for accuracy
        $('section').each(function () {
            var sectionOffset = $(this).offset().top;
            var sectionHeight = $(this).outerHeight();
            var sectionId = $(this).attr('id');

            if (currentScroll >= sectionOffset && currentScroll < sectionOffset + sectionHeight) {
                $('.nav-link').removeClass('active');
                $('a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });

    // Category filter functionality
    $('#category-filter').on('change', function () {
        var selectedCategory = this.value.toLowerCase();
        $('.property-item').each(function () {
            var itemCategory = $(this).data('category').toLowerCase();
            if (selectedCategory === "" || itemCategory === selectedCategory) {
                $(this).fadeIn(); // Show matching items
            } else {
                $(this).fadeOut(); // Hide non-matching items
            }
        });
    });

    // Property search functionality
    $('#property-search').on('input', function () {
        var searchQuery = this.value.toLowerCase();
        $('.property-item').each(function () {
            var location = $(this).data('location').toLowerCase();
            var title = $(this).find('.card-title').text().toLowerCase();
            var description = $(this).find('.card-text').text().toLowerCase();

            if (location.includes(searchQuery) || title.includes(searchQuery) || description.includes(searchQuery)) {
                $(this).fadeIn(); // Show matching items
            } else {
                $(this).fadeOut(); // Hide non-matching items
            }
        });
    });

    // Handle property details modal
    $('.view-details').on('click', function () {
        var title = $(this).data('title');
        var description = $(this).data('description');
        $('#propertyModalLabel').text(title);
        $('#property-description').text(description);
    });
});
