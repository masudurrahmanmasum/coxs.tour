/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
        mobileNav.classList.toggle("open");
        menuToggle.classList.toggle("open");
    });
}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

const mobileLinks = document.querySelectorAll(".mobile-nav a");

mobileLinks.forEach(link => {
    link.addEventListener("click", () => {

        if (mobileNav) {
            mobileNav.classList.remove("open");
        }

        if (menuToggle) {
            menuToggle.classList.remove("open");
        }

    });
});


/* =========================================================
   GENERAL SCROLL REVEAL
========================================================= */

const animatedElements =
    document.querySelectorAll(".reveal");


if (animatedElements.length > 0) {

    const animationObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    const element = entry.target;

                    if (entry.isIntersecting) {

                        const delay =
                            element.dataset.delay || 0;

                        element.style.setProperty(
                            "--delay",
                            `${delay}ms`
                        );

                        element.classList.add("show");

                    } else {

                        element.classList.remove("show");

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

}


/* =========================================================
   FACULTY CARD SCROLL REVEAL
========================================================= */

/*
    IMPORTANT:

    Faculty card-এর HTML এমন হতে হবে:

    <div class="card-scroll">
        <div class="card">
            ...
        </div>
    </div>

    .card-scroll = scroll animation
    .card        = 3D tilt
*/

const cardScrollElements =
    document.querySelectorAll(".card-scroll");


let cardScrollStarted = false;


/*
    প্রথম page load-এর সময় observer চালু হবে না।

    User প্রথমবার scroll করার পর
    observer চালু হবে।
*/

function startCardScrollObserver() {

    if (cardScrollStarted) {
        return;
    }

    cardScrollStarted = true;


    if (cardScrollElements.length === 0) {
        return;
    }


    const cardScrollObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                    } else {

                        entry.target.classList.remove("show");

                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -30px 0px"
            }
        );


    cardScrollElements.forEach(element => {
        cardScrollObserver.observe(element);
    });

}


/*
    User scroll করলেই
    faculty card observer চালু হবে।
*/

window.addEventListener(
    "scroll",
    startCardScrollObserver,
    {
        once: true,
        passive: true
    }
);


/* =========================================================
   NAV ACTIVE SECTION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".desktop-nav a");


if (
    sections.length > 0 &&
    navLinks.length > 0
) {

    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const id =
                            entry.target.id;


                        navLinks.forEach(link => {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    }

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach(section => {
        navObserver.observe(section);
    });

}


/* =========================================================
   BUTTON RIPPLE
========================================================= */

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach(button => {

    button.addEventListener(
        "click",
        function (event) {

            const ripple =
                document.createElement("span");


            const rect =
                this.getBoundingClientRect();


            const size =
                Math.max(
                    rect.width,
                    rect.height
                );


            ripple.style.position =
                "absolute";

            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;

            ripple.style.borderRadius =
                "50%";

            ripple.style.background =
                "rgba(255,255,255,.3)";

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            ripple.style.transform =
                "scale(0)";

            ripple.style.pointerEvents =
                "none";


            this.appendChild(ripple);


            ripple.animate(
                [
                    {
                        transform: "scale(0)",
                        opacity: 1
                    },
                    {
                        transform: "scale(2.5)",
                        opacity: 0
                    }
                ],
                {
                    duration: 600,
                    easing: "ease-out"
                }
            );


            setTimeout(() => {
                ripple.remove();
            }, 650);

        }
    );

});


/* =========================================================
   PARALLAX BACKGROUND
========================================================= */

const pageDecorations =
    document.querySelectorAll(
        ".dna, .turtle, .leaf-decoration"
    );


let ticking = false;


window.addEventListener(
    "scroll",
    () => {

        if (!ticking) {

            window.requestAnimationFrame(() => {

                const scrollY =
                    window.scrollY;


                pageDecorations.forEach(
                    (element, index) => {

                        const speed =
                            0.015 +
                            index * 0.004;


                        element.style.marginTop =
                            `${scrollY * speed}px`;

                    }
                );


                ticking = false;

            });


            ticking = true;

        }

    }
);


/* =========================================================
   FACULTY / MEMBER / INFO CARD 3D TILT
========================================================= */

const cards3D =
    document.querySelectorAll(
        ".faculty-card, .member-card, .info-card"
    );


cards3D.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            /* Mobile-এ tilt বন্ধ */

            if (window.innerWidth <= 600) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) *
                -3;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                3;


            card.style.transform =
                `
                perspective(700px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-5px)
                scale(1.01)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   PROFILE / FACULTY CARD 3D TILT
========================================================= */

const cards2 =
    document.querySelectorAll(".card");


cards2.forEach(card => {

    card.addEventListener(
        "mousemove",
        function (event) {

            /* Mobile-এ 3D effect বন্ধ */

            if (window.innerWidth <= 600) {
                return;
            }


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;


            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 18;


            const rotateY =
                (centerX - x) / 18;


            card.style.transform =
                `
                translateY(-12px)
                scale(1.02)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                `;

        }
    );


    card.addEventListener(
        "mouseleave",
        function () {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   IMAGE LOAD FALLBACK
========================================================= */

const images =
    document.querySelectorAll("img");


images.forEach(img => {

    img.addEventListener(
        "error",
        () => {

            img.style.display =
                "none";


            if (img.parentElement) {

                img.parentElement.classList.add(
                    "image-missing"
                );

            }

        }
    );

});


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "loaded"
        );

    }
);


/* =========================================================
   HERO REGISTER BUTTON
========================================================= */

const regiBtn =
    document.getElementById("registerBtn");


if (regiBtn) {

    regiBtn.addEventListener(
        "mouseenter",
        () => {

            regiBtn.classList.remove(
                "btn-outline"
            );

            regiBtn.classList.add(
                "btn-primary"
            );

        }
    );


    regiBtn.addEventListener(
        "mouseleave",
        () => {

            regiBtn.classList.remove(
                "btn-primary"
            );

            regiBtn.classList.add(
                "btn-outline"
            );

        }
    );

}


/* =========================================================
   HERO DETAIL BUTTON
========================================================= */

const detailBtn =
    document.getElementById("detailBtn");


if (detailBtn) {

    detailBtn.addEventListener(
        "mouseenter",
        () => {

            detailBtn.classList.remove(
                "btn-outline"
            );

            detailBtn.classList.add(
                "btn-primary"
            );

        }
    );


    detailBtn.addEventListener(
        "mouseleave",
        () => {

            detailBtn.classList.remove(
                "btn-primary"
            );

            detailBtn.classList.add(
                "btn-outline"
            );

        }
    );

}


/* =========================================================
   CREATE BUBBLES
========================================================= */

const bubbles =
    document.getElementById("bubbles");


if (bubbles) {

    for (
        let i = 0;
        i < 40;
        i++
    ) {

        const bubble =
            document.createElement("span");


        bubble.className =
            "bubble";


        const size =
            Math.random() * 13 + 4;


        bubble.style.width =
            size + "px";

        bubble.style.height =
            size + "px";


        bubble.style.left =
            Math.random() * 100 + "%";


        bubble.style.animationDuration =
            Math.random() * 10 + 8 + "s";


        bubble.style.animationDelay =
            Math.random() * 12 + "s";


        bubbles.appendChild(bubble);

    }

}


/* =========================================================
   CREATE SMALL WATER PARTICLES
========================================================= */

const particles =
    document.getElementById("particles");


if (particles) {

    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const particle =
            document.createElement("span");


        particle.className =
            "particle";


        particle.style.left =
            Math.random() * 100 + "%";


        particle.style.top =
            Math.random() * 100 + "%";


        particle.style.animationDuration =
            Math.random() * 6 + 5 + "s";


        particle.style.animationDelay =
            Math.random() * 7 + "s";


        particles.appendChild(
            particle
        );

    }

}