
// =============================================
// ALPINE ASCENTS - ADVANCED GSAP JAVASCRIPT
// =============================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");


// =============================================
// 1. HAMBURGER MENU
// =============================================

function openMenu() {
    navMenu.classList.add("open");
    menuToggle.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
}

function closeMenu() {
    navMenu.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

menuToggle.addEventListener("click", function () {
    if (navMenu.classList.contains("open")) {
        closeMenu();
    } else {
        openMenu();
    }
});

navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("click", function (event) {
    if (
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        closeMenu();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMenu();
    }
});


// =============================================
// 2. VISITOR COUNTER
// =============================================

let visitors = localStorage.getItem("alpineVisitors");

if (visitors === null) {
    visitors = 1;
} else {
    visitors = Number(visitors) + 1;
}

localStorage.setItem("alpineVisitors", visitors);

document.getElementById("visitorCount").textContent = visitors;


// =============================================
// 3. LIVE DATE AND TIME
// =============================================

function updateDateTime() {

    const now = new Date();

    const date = now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    const time = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    document.getElementById("dateTime").textContent =
        "DATE: " + date + " | TIME: " + time;
}

updateDateTime();

setInterval(updateDateTime, 1000);


// =============================================
// 4. GEOLOCATION
// =============================================

const locationText = document.getElementById("location");

if ("geolocation" in navigator) {

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            locationText.textContent =
                "LOCATION: LAT " +
                latitude.toFixed(3) +
                " | LONG " +
                longitude.toFixed(3);
        },

        function () {
            locationText.textContent = "LOCATION: UNAVAILABLE";
        },

        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000
        }
    );

} else {
    locationText.textContent = "GEOLOCATION NOT SUPPORTED";
}


// =============================================
// 5. GSAP INITIALIZATION
// =============================================

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const gsapAvailable =
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined";

if (gsapAvailable) {

    gsap.registerPlugin(ScrollTrigger);

    if (!reducedMotion) {
        document.documentElement.classList.add("gsap-ready");
    }

}


// =============================================
// 6. CINEMATIC INTRO ANIMATION
// =============================================

function startIntro() {

    const intro = document.getElementById("introScreen");

    if (!intro) {
        initializeWebsiteAnimations();
        return;
    }

    if (!gsapAvailable || reducedMotion) {

        intro.style.display = "none";
        document.documentElement.classList.remove("gsap-ready");

        document.querySelectorAll(".reveal").forEach(function (element) {
            element.classList.add("show");
        });

        initializeWebsiteAnimations();
        return;
    }

    document.body.style.overflow = "hidden";

    const introTimeline = gsap.timeline({

        defaults: {
            ease: "power3.out"
        },

        onComplete: function () {

            intro.remove();

            document.body.style.overflow = "";

            initializeWebsiteAnimations();
        }

    });

    introTimeline

        // INTRO CARD ENTER
        .from(".intro-card", {
            y: 100,
            scale: 0.75,
            rotateX: 18,
            opacity: 0,
            duration: 1.4
        })

        // TITLE REVEAL
        .from(".intro-title span", {
            y: 120,
            opacity: 0,
            stagger: 0.2,
            duration: 1.1,
            ease: "power4.out"
        }, "-=0.8")

        // MOUNTAIN IMAGE ENTER
        .from(".intro-mountain", {
            x: 180,
            y: 100,
            scale: 0.5,
            rotation: -15,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.5)"
        }, "-=1")

        // CAPTION
        .from(".intro-caption", {
            y: 35,
            opacity: 0,
            duration: 0.8
        }, "-=0.7")

        .from(".intro-arrow", {
            y: -20,
            opacity: 0,
            duration: 0.7
        }, "-=0.4")

        // HOLD INTRO
        .to({}, {
            duration: 0.7
        })

        // CARD ZOOM
        .to(".intro-card", {
            scale: 1.15,
            duration: 0.8,
            ease: "power2.in"
        })

        // INTRO SCREEN EXIT
        .to(".intro-screen", {
            yPercent: -110,
            duration: 1.3,
            ease: "power4.inOut"
        });

}

startIntro();


// =============================================
// 7. WEBSITE GSAP ANIMATIONS
// =============================================

function initializeWebsiteAnimations() {

    if (!gsapAvailable || reducedMotion) {
        return;
    }

    // HERO CONTENT

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power4.out"
        }
    });

    heroTimeline

        .from(".hero .eyebrow", {
            y: 40,
            opacity: 0,
            duration: 1
        })

        .from(".hero h1", {
            y: 130,
            opacity: 0,
            scale: 0.85,
            duration: 1.3
        }, "-=0.5")

        .from(".hero-description", {
            y: 45,
            opacity: 0,
            duration: 1
        }, "-=0.7")

        .from(".hero-buttons .btn", {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8
        }, "-=0.6")

        .from(".hero-bottom span", {
            x: -40,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8
        }, "-=0.5")

        .from(".scroll-down", {
            opacity: 0,
            y: -20,
            duration: 0.8
        }, "-=0.5");


    // =========================================
    // 8. HERO SCROLL PARALLAX
    // =========================================

  // HERO SCROLL PARALLAX

gsap.to(".hero", {
    backgroundPosition: "center 100%",
    ease: "none",

    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// HERO CONTENT - ALWAYS VISIBLE

gsap.set(".hero-content", {
    y: 0,
    opacity: 1,
    autoAlpha: 1,
    clearProps: "transform"
});

    // =========================================
    // 9. ALL SECTION REVEALS
    // =========================================

    gsap.utils.toArray(".reveal").forEach(function (element) {

        gsap.fromTo(element,

            {
                y: 75,
                opacity: 0,
                autoAlpha: 0
            },

            {
                y: 0,
                opacity: 1,
                autoAlpha: 1,
                duration: 1.1,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: element,
                    start: "top 88%",
                    toggleActions: "play none none none"
                }

            }

        );

    });


    // =========================================
    // 10. SECTION HEADING ANIMATIONS
    // =========================================

    gsap.utils.toArray(".section-heading").forEach(function (heading) {

        const eyebrow = heading.querySelector(".eyebrow");
        const title = heading.querySelector("h2");
        const description = heading.querySelector("p:last-child");

        const elements = [eyebrow, title, description].filter(Boolean);

        gsap.from(elements, {

            y: 55,
            opacity: 0,
            stagger: 0.18,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: heading,
                start: "top 85%",
                toggleActions: "play none none none"
            }

        });

    });


    // =========================================
    // 11. CARDS STAGGER ANIMATION
    // =========================================

   // =========================================
// 11. CARDS STAGGER ANIMATION - FIXED
// =========================================

const cardGroups = [
    ".card-grid",
    ".technique-grid",
    ".hazard-grid",
    ".club-grid",
    ".success-grid",
    ".development-grid"
];

cardGroups.forEach(function (selector) {

    const cards = gsap.utils.toArray(selector + " > *");

    if (cards.length === 0) return;

    gsap.set(cards, {
        opacity: 1,
        visibility: "visible"
    });

    gsap.fromTo(cards,

        {
            y: 60,
            opacity: 0,
            scale: 0.95
        },

        {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.16,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: selector,
                start: "top 85%",
                toggleActions: "play none none none"
            }

        }

    );

});


    // =========================================
    // 12. HISTORY TIMELINE
    // =========================================

    gsap.to(".timeline::after", {
        scaleY: 1
    });

    gsap.utils.toArray(".timeline-item").forEach(function (item, index) {

        gsap.from(item, {

            x: index % 2 === 0 ? -80 : 80,
            opacity: 0,
            duration: 1,
            ease: "power3.out",

            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
            }

        });

    });


    // =========================================
    // 13. IMAGE PARALLAX
    // =========================================

    gsap.utils.toArray(
        ".about-image img, .shelter-image img, .success-card img"
    ).forEach(function (image) {

        gsap.fromTo(image,

            {
                scale: 1.18,
                yPercent: -5
            },

            {
                scale: 1,
                yPercent: 5,
                ease: "none",

                scrollTrigger: {
                    trigger: image,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }

            }

        );

    });


    // =========================================
    // 14. GALLERY IMAGE REVEAL
    // =========================================
// =========================================
// 14. GALLERY IMAGE REVEAL - FIXED
// =========================================

const galleryImages = gsap.utils.toArray(".gallery-grid img");

if (galleryImages.length > 0) {

    gsap.set(galleryImages, {
        opacity: 1,
        visibility: "visible"
    });

    gsap.fromTo(
        galleryImages,

        {
            y: 70,
            scale: 0.85,
            rotation: 3,
            opacity: 0
        },

        {
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1.2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: ".gallery-grid",
                start: "top 85%",
                toggleActions: "play none none none"
            }
        }
    );

}


    // =========================================
    // 15. STATS ANIMATION
    // =========================================

    gsap.from(".stat", {

        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,

        scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
            toggleActions: "play none none none"
        }

    });


    // =========================================
    // 16. GUIDELINES STAGGER
    // =========================================

    gsap.from(".guideline", {

        x: -60,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",

        scrollTrigger: {
            trigger: ".guidelines-content",
            start: "top 85%",
            toggleActions: "play none none none"
        }

    });


    // =========================================
    // 17. TABLE REVEAL
    // =========================================

    gsap.from(".records-table tbody tr", {

        x: -50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,

        scrollTrigger: {
            trigger: ".records-table",
            start: "top 85%",
            toggleActions: "play none none none"
        }

    });


    // =========================================
    // 18. FOOTER ANIMATION
    // =========================================

    gsap.from(".footer > *", {

        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.9,

        scrollTrigger: {
            trigger: ".footer",
            start: "top 90%",
            toggleActions: "play none none none"
        }

    });


    // =========================================
    // 19. BUTTON HOVER ANIMATION
    // =========================================

    document.querySelectorAll(".btn").forEach(function (button) {

        button.addEventListener("mouseenter", function () {

            gsap.to(button, {
                y: -5,
                scale: 1.04,
                duration: 0.3,
                ease: "power2.out"
            });

        });

        button.addEventListener("mouseleave", function () {

            gsap.to(button, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });

        });

    });


    // REFRESH SCROLL TRIGGER AFTER IMAGES LOAD

    window.addEventListener("load", function () {
        ScrollTrigger.refresh();
    });

    setTimeout(function () {
        ScrollTrigger.refresh();
    }, 1000);

}


// =============================================
// 20. ACTIVE NAVIGATION ON SCROLL
// =============================================

const pageSections = document.querySelectorAll("section[id]");

function updateActiveNavigation() {

    let currentSection = "home";

    pageSections.forEach(function (section) {

        const sectionTop =
            section.getBoundingClientRect().top + window.scrollY - 150;

        if (window.scrollY >= sectionTop) {
            currentSection = section.id;
        }

    });

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});


// =============================================
// 21. SMOOTH INTERNAL NAVIGATION
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const targetSection = document.querySelector(targetId);

        if (!targetSection) return;

        event.preventDefault();

        closeMenu();

        const targetPosition =
            targetSection.getBoundingClientRect().top +
            window.scrollY -
            82;

        window.scrollTo({

            top: targetPosition,

            behavior: reducedMotion ? "auto" : "smooth"

        });

        history.replaceState(null, "", targetId);

    });

});


// =============================================
// 22. FINAL STATUS
// =============================================

console.log(
    "ALPINE ASCENTS - ADVANCED GSAP ANIMATIONS LOADED"
);
