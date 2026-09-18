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

const mobileLinks =
    document.querySelectorAll(".mobile-nav a");

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

const cardScrollElements =
    document.querySelectorAll(".card-scroll");

let cardScrollStarted = false;


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

                            link.classList.remove("active");


                            if (
                                link.getAttribute("href") ===
                                `#${id}`
                            ) {

                                link.classList.add("active");

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


        bubbles.appendChild(
            bubble
        );

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


/* =========================================================
   REGISTRATION SEARCH
========================================================= */

const heroSearchInput =
    document.getElementById(
        "heroSearchInput"
    );


const heroSearchButton =
    document.getElementById(
        "heroSearchButton"
    );


const heroSearchMessage =
    document.getElementById(
        "heroSearchMessage"
    );


const registrationModal =
    document.getElementById(
        "registrationModal"
    );


const registrationModalContent =
    document.getElementById(
        "registrationModalContent"
    );


const closeRegistrationModal =
    document.getElementById(
        "closeRegistrationModal"
    );


/* =========================================================
   GOOGLE APPS SCRIPT API
========================================================= */

const REGISTRATION_API =
    "https://script.google.com/macros/s/AKfycbyA64-oZJvFzcn4rj4GqwQiwVCslSRz9SmKn7niEPfADAHVuJjrZHFuokkokPTgWvjr/exec";


/* =========================================================
   SEARCH FUNCTION
========================================================= */

async function searchRegistration() {

    if (!heroSearchInput) {
        return;
    }


    const searchValue =
        heroSearchInput.value.trim();


    /* Empty input */

    if (!searchValue) {

        showSearchMessage(
            "মোবাইল অথবা রেজিস্ট্রেশন নম্বর লিখুন।",
            "error"
        );

        heroSearchInput.focus();

        return;
    }


    /* Loading */

    if (heroSearchButton) {

        heroSearchButton.disabled = true;

        heroSearchButton.textContent =
            "•••";

    }


    showSearchMessage(
        "তথ্য খোঁজা হচ্ছে...",
        ""
    );


    try {

        const apiURL =
            REGISTRATION_API +
            "?search=" +
            encodeURIComponent(
                searchValue
            );


        const response =
            await fetch(apiURL);


        if (!response.ok) {

            throw new Error(
                "Server response error"
            );

        }


        const result =
            await response.json();


        console.log(
            "Registration API:",
            result
        );


        /* ---------------------------------------------
           NOT FOUND
        --------------------------------------------- */

        if (
            result.success !== true ||
            result.found !== true
        ) {

            showSearchMessage(
                "এই মোবাইল বা রেজিস্ট্রেশন নম্বরের কোনো তথ্য পাওয়া যায়নি।",
                "error"
            );

            return;
        }


        /* ---------------------------------------------
           FOUND
        --------------------------------------------- */

        showSearchMessage(
            "রেজিস্ট্রেশন তথ্য পাওয়া গেছে।",
            "success"
        );


        openRegistrationModal(
            result.data
        );


    } catch (error) {

        console.error(
            "Registration Search Error:",
            error
        );


        showSearchMessage(
            "তথ্য আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন।",
            "error"
        );


    } finally {

        if (heroSearchButton) {

            heroSearchButton.disabled = false;

            heroSearchButton.textContent =
                "🔍";

        }

    }

}


/* =========================================================
   OPEN REGISTRATION POPUP
========================================================= */

function openRegistrationModal(data) {

    if (
        !registrationModal ||
        !registrationModalContent
    ) {
        return;
    }


    registrationModalContent.innerHTML = `

        <div class="registration-info-grid">


            <!-- বাংলা নাম -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    বাংলা নাম
                </span>

                <span class="registration-info-value">
                    ${safeHTML(data.banglaName)}
                </span>

            </div>


            <!-- English Name -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    English Name
                </span>

                <span class="registration-info-value">
                    ${safeHTML(data.englishName)}
                </span>

            </div>


            <!-- Mobile -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    Mobile Number
                </span>

                <span class="registration-info-value">
                    ${safeHTML(data.mobile)}
                </span>

            </div>


            <!-- Registration Number -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    Registration Number
                </span>

                <span class="registration-info-value">
                    ${safeHTML(
                        data.registrationNumber
                    )}
                </span>

            </div>


            <!-- Email -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    Email
                </span>

                <span class="registration-info-value">
                    ${safeHTML(data.email)}
                </span>

            </div>


            <!-- WhatsApp -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    WhatsApp
                </span>

                <span class="registration-info-value">
                    ${safeHTML(data.whatsapp)}
                </span>

            </div>


            <!-- Guardian Number -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    Guardian Contact Number
                </span>

                <span class="registration-info-value">
                    ${safeHTML(
                        data.guardianNumber
                    )}
                </span>

            </div>


            <!-- Tour Fee -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    Tour Fee
                </span>

                <span class="registration-info-value">
                    ${formatTourFee(data.tourFee)}
                </span>

            </div>


            <!-- Facebook -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    Facebook
                </span>

                <span class="registration-info-value">

                    ${
                        data.fbLink
                            ? `
                                <a
                                    href="${safeAttribute(
                                        data.fbLink
                                    )}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Facebook Profile
                                </a>
                            `
                            : "-"
                    }

                </span>

            </div>


            <!-- Registration Time -->

            <div class="registration-info-item">

                <span class="registration-info-label">
                    Registration Time
                </span>

                <span class="registration-info-value">
                    ${safeHTML(data.timestamp)}
                </span>

            </div>


            <!-- Address -->

            <div class="
                registration-info-item
                full-width
            ">

                <span class="registration-info-label">
                    Address
                </span>

                <span class="registration-info-value">
                    ${safeHTML(data.address)}
                </span>


                    <div class="registration-modal-actions">

    </div>

            </div>

            <div class="registration-info-grid">

        <!-- আপনার সব registration information এখানে থাকবে -->

    </div>




</div>

        

    `;




    registrationModal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


/* =========================================================
   CLOSE REGISTRATION POPUP
========================================================= */

function closeRegistrationModalWindow() {

    if (!registrationModal) {
        return;
    }


    registrationModal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


/* Close button */

if (closeRegistrationModal) {

    closeRegistrationModal.addEventListener(
        "click",
        closeRegistrationModalWindow
    );

}


/* =========================================================
   CLOSE BY CLICKING OUTSIDE
========================================================= */

if (registrationModal) {

    const modalOverlay =
        registrationModal.querySelector(
            ".registration-modal-overlay"
        );


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeRegistrationModalWindow
        );

    }

}


/* =========================================================
   CLOSE BY ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            registrationModal &&
            registrationModal.classList.contains(
                "show"
            )
        ) {

            closeRegistrationModalWindow();

        }

    }
);


/* =========================================================
   SEARCH BUTTON CLICK
========================================================= */

if (heroSearchButton) {

    heroSearchButton.addEventListener(
        "click",
        searchRegistration
    );

}


/* =========================================================
   ENTER KEY SEARCH
========================================================= */

if (heroSearchInput) {

    heroSearchInput.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                event.preventDefault();

                searchRegistration();

            }

        }
    );

}


/* =========================================================
   SEARCH MESSAGE
========================================================= */

function showSearchMessage(
    message,
    type
) {

    if (!heroSearchMessage) {
        return;
    }


    heroSearchMessage.textContent =
        message;


    heroSearchMessage.className =
        "hero-search-message";


    if (type) {

        heroSearchMessage.classList.add(
            type
        );

    }

}


/* =========================================================
   HTML SECURITY
========================================================= */

function safeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   SAFE URL
========================================================= */

function safeAttribute(value) {

    return String(value ?? "")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   TOUR FEE
========================================================= */

function formatTourFee(value) {

    const fee =
        String(value || "")
            .trim()
            .toLowerCase();


    if (fee === "yes") {

        return "Paid";

    }


    if (fee === "no") {

        return "Not Paid";

    }


    return safeHTML(
        value || "-"
    );

}
