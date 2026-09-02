document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("main-nav");
    const toggle = document.querySelector(".nav-toggle");
    const groups = document.querySelectorAll(".nav-group");

    // Add the court-booking action consistently to every page using the shared header.
    if (nav && !nav.querySelector(".nav-book")) {
        const bookingLink = document.createElement("a");
        bookingLink.className = "nav-book";
        bookingLink.href = "https://croquetbooking.com/book/index.php?view=day&area=1&room=1&site=53";
        bookingLink.textContent = "Book a court";
        const joinLink = nav.querySelector(".nav-join");
        nav.insertBefore(bookingLink, joinLink || null);
    }

    if (toggle && nav) {
        toggle.addEventListener("click", function () {
            const open = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!open));
            nav.classList.toggle("is-open", !open);
        });
    }

    groups.forEach(function (group) {
        const button = group.querySelector(".nav-caret");
        if (!button) return;
        button.addEventListener("click", function (event) {
            event.preventDefault();
            const open = group.classList.contains("is-open");
            groups.forEach(function (other) {
                other.classList.remove("is-open");
                const b = other.querySelector(".nav-caret");
                if (b) b.setAttribute("aria-expanded", "false");
            });
            group.classList.toggle("is-open", !open);
            button.setAttribute("aria-expanded", String(!open));
        });
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            groups.forEach(function (group) {
                group.classList.remove("is-open");
                const button = group.querySelector(".nav-caret");
                if (button) button.setAttribute("aria-expanded", "false");
            });
            if (toggle && nav) {
                toggle.setAttribute("aria-expanded", "false");
                nav.classList.remove("is-open");
            }
        }
    });

    // Make images lazy by default, except the brand mark (logo) which should load eagerly.
    document.querySelectorAll('img').forEach(function(img){
        if (!img.hasAttribute('loading') && !img.classList.contains('brand-mark')) {
            img.setAttribute('loading', 'lazy');
        }
    });
});
