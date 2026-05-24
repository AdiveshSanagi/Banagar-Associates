// Simple Intersection Observer to activate animations dynamically as user scrolls down
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', entry.target.dataset.animate);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

        // Navbar transparent-to-solid transition on scroll
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                nav.classList.add('bg-dark-solid', 'shadow-lg');
            } else {
                nav.classList.remove('bg-dark-solid', 'shadow-lg');
            }
        });

// Live Card Category Filtering Logic
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll("#venue-filter-controls .btn-filter");
    const portfolioItems = document.querySelectorAll("#filterable-venue-grid .venue-portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove active style from old button, assign to clicked button
            document.querySelector(".active-filter").classList.remove("active-filter");
            this.classList.add("active-filter");

            const filterTarget = this.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");

                // Check condition if 'all' is selected or if asset type matches selection
                if (filterTarget === "all" || itemCategory === filterTarget) {
                    item.classList.remove("hidden-item");
                    
                    // Trigger a quick clean CSS structural animation entrance trigger
                    setTimeout(() => {
                        item.style.display = "block";
                    }, 10);
                } else {
                    item.classList.add("hidden-item");
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 400); // Matches CSS transition duration limits cleanly
                }
            });
        });
    });
});


// Live Gallery Asset Format Filter Logic
document.addEventListener("DOMContentLoaded", function () {
    const gFilterButtons = document.querySelectorAll("#gallery-filter-controls .btn-gallery-filter");
    const gGridItems = document.querySelectorAll("#filterable-gallery-grid .gallery-matrix-item");

    gFilterButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            // Drop styling state anchor token from old element, assign to click target
            document.querySelector(".active-g-filter").classList.remove("active-g-filter");
            this.classList.add("active-g-filter");

            const targetedCategory = this.getAttribute("data-gfilter");

            gGridItems.forEach(item => {
                const itemFormatGroup = item.getAttribute("data-gcat");

                if (targetedCategory === "all" || itemFormatGroup === targetedCategory) {
                    item.classList.remove("hide-asset");
                    setTimeout(() => {
                        item.style.display = "block";
                    }, 5);
                } else {
                    item.classList.add("hide-asset");
                    setTimeout(() => {
                        item.style.display = "none";
                    }, 350);
                }
            });
        });
    });
});

// Close the hamburger menu on mobile after clicking a link
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenu = document.querySelector(".navbar-toggler");
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            if (window.innerWidth < 992) {
                mobileMenu.click();
            }
        });
    });
});