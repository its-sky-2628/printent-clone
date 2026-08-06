const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".desktop-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("mobile-open");
  });
}


/* =====================================================
   HEADER SCROLL
===================================================== */

const header = document.querySelector(".site-header");

window.addEventListener(
  "scroll",
  () => {

    if (window.scrollY > 120) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }

  },
  { passive: true }
);


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const stats = document.querySelectorAll(".stat strong");

const counterObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (!entry.isIntersecting) return;

      const element = entry.target;

      const original = element.textContent.trim();

      const target =
        parseInt(original.replace(/\D/g,"")) || 0;

      const suffix =
        original.includes("%")
          ? "%"
          : "+";

      let start = 0;

      const duration = 1300;

      const startTime = performance.now();

      function update(now){

        const progress =
          Math.min(
            (now - startTime) / duration,
            1
          );

        const eased =
          1 - Math.pow(1-progress,3);

        start =
          Math.floor(target * eased);

        element.innerHTML =
          start +
          `<sup>${suffix}</sup>`;

        if(progress < 1){
        }

      }


      counterObserver.unobserve(element);

    });

  },
  {
    threshold:.4
  }
);

stats.forEach(stat =>
  counterObserver.observe(stat)
);



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealTargets = document.querySelectorAll(
  ".intro-content, .service-card, .project-card, .stat, .testimonial-content, .big-cta-inner"
);

revealTargets.forEach((element) => {
  element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if(entry.isIntersecting){

        entry.target.classList.add(
          "reveal-visible"
        );

        revealObserver.unobserve(
          entry.target
        );

      }

    });

  },
  {
    threshold:0.12,
    rootMargin:"0px 0px -40px 0px"
  }
);

revealTargets.forEach((element) => {
  revealObserver.observe(element);
});


/* =====================================================
   CLOSE MOBILE MENU AFTER CLICK
===================================================== */

document
  .querySelectorAll(".desktop-nav a")
  .forEach((link) => {

    link.addEventListener("click", () => {

      document
        .querySelector(".desktop-nav")
        ?.classList.remove("mobile-open");

    });

  });


/* =====================================================
   ESC CLOSE MOBILE MENU
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if(event.key === "Escape"){

      document
        .querySelector(".desktop-nav")
        ?.classList.remove("mobile-open");

    }

  }
);


/* =====================================================
   WHY / PROCESS REVEAL
===================================================== */

const extraRevealTargets = document.querySelectorAll(
  ".why-visual, .why-content, .process-card, .brands-row"
);

extraRevealTargets.forEach((element) => {

  element.classList.add("reveal");

  revealObserver.observe(element);

});


/* PRICING + BLOG REVEAL */

document
  .querySelectorAll(".price-card, .blog-card")
  .forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

  });


/* PRICING + BLOG REVEAL */

document
  .querySelectorAll(".price-card, .blog-card")
  .forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

  });


/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

  const loader =
    document.getElementById("printentLoader");

  window.setTimeout(() => {
    loader?.classList.add("hide");
  }, 350);

});


/* =====================================================
   BACK TO TOP
===================================================== */

const printentTop =
  document.getElementById("printentTop");

function updateBackToTop(){

  if(window.scrollY > 700){
    printentTop?.classList.add("visible");
  }else{
    printentTop?.classList.remove("visible");
  }

}

window.addEventListener(
  "scroll",
  updateBackToTop,
  { passive:true }
);

updateBackToTop();

printentTop?.addEventListener(
  "click",
  () => {

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  }
);


/* =====================================================
   MAGNETIC CTA MICRO INTERACTION
===================================================== */

document
  .querySelectorAll(
    ".circle-cta, .big-circle"
  )
  .forEach((button) => {

    button.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          button.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        button.style.transform =
          `translate(${x * .08}px, ${y * .08}px)`;

      }
    );

    button.addEventListener(
      "mouseleave",
      () => {

        button.style.transform = "";

      }
    );

  });


/* =====================================================
   V3 — MOBILE MENU BODY LOCK
===================================================== */

if (menuButton && nav) {

  menuButton.addEventListener("click", () => {

    window.setTimeout(() => {

      document.body.classList.toggle(
        "menu-open",
        nav.classList.contains("mobile-open")
      );

    }, 0);

  });

}

document
  .querySelectorAll(".desktop-nav a")
  .forEach((link) => {

    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
    });

  });


/* =====================================================
   IMAGE ERROR FALLBACK
===================================================== */

document
  .querySelectorAll("img")
  .forEach((image) => {

    image.addEventListener("error", () => {

      image.style.opacity = ".25";

      image.parentElement?.classList.add(
        "image-missing"
      );

    });

  });


/* =====================================================
   ACTIVE NAV ON SCROLL
===================================================== */

const pageSections =
  document.querySelectorAll(
    "main section[id]"
  );

const navigationLinks =
  document.querySelectorAll(
    ".desktop-nav a[href^='#']"
  );

const navObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if(!entry.isIntersecting) return;

        const id =
          entry.target.getAttribute("id");

        navigationLinks.forEach((link) => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );

        });

      });

    },

    {
      rootMargin:"-35% 0px -55% 0px",
      threshold:0
    }

  );

pageSections.forEach((section) => {
  navObserver.observe(section);
});


/* =====================================================
   V4 — PRELOAD HERO
===================================================== */

const heroImage =
  document.querySelector(
    ".hero-image-card > img"
  );

if(heroImage){

  const preload =
    document.createElement("link");

  preload.rel = "preload";
  preload.as = "image";
  preload.href =
    heroImage.getAttribute("src");

  document.head.appendChild(preload);

}


/* =====================================================
   MOBILE MENU ICON ANIMATION
===================================================== */

menuButton?.addEventListener(
  "click",
  () => {

    menuButton.classList.toggle(
      "menu-active"
    );

  }
);


/* =====================================================
   RESIZE CLEANUP
===================================================== */

window.addEventListener(
  "resize",
  () => {

    if(window.innerWidth > 1100){

      nav?.classList.remove(
        "mobile-open"
      );

      menuButton?.classList.remove(
        "menu-active"
      );

      document.body.classList.remove(
        "menu-open"
      );

    }

  },
  { passive:true }
);


/* =====================================================
   V5 — LAZY PERFORMANCE
===================================================== */

document
  .querySelectorAll('img[loading="lazy"]')
  .forEach((img) => {

    img.addEventListener(
      "load",
      () => {
        img.classList.add("image-loaded");
      },
      { once:true }
    );

  });


/* =====================================================
   EXTERNAL / EMPTY LINKS SAFETY
===================================================== */

document
  .querySelectorAll('a[href="#"]')
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
      }
    );

  });


/* =====================================================
   V6 — SMOOTH ANCHOR OFFSET
===================================================== */

document
  .querySelectorAll('a[href^="#"]:not([href="#"])')
  .forEach((anchor) => {

    anchor.addEventListener("click", (event) => {

      const id =
        anchor.getAttribute("href");

      const target =
        document.querySelector(id);

      if(!target) return;

      event.preventDefault();

      const headerOffset =
        window.innerWidth > 850
          ? 75
          : 68;

      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top,
        behavior:"smooth"
      });

    });

  });


/* =====================================================
   V6 — PROJECT IMAGE POINTER DEPTH
===================================================== */

if(
  window.matchMedia(
    "(hover:hover) and (pointer:fine)"
  ).matches
){

  document
    .querySelectorAll(".project-card")
    .forEach((card) => {

      const image =
        card.querySelector("img");

      if(!image) return;

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width - .5;

          const y =
            (event.clientY - rect.top) /
            rect.height - .5;

          image.style.transform =
            `scale(1.07)
             translate(
               ${x * -8}px,
               ${y * -8}px
             )`;

        }
      );

      card.addEventListener(
        "mouseleave",
        () => {

          image.style.transform = "";

        }
      );

    });

}


/* =====================================================
   V7 — SCROLL PROGRESS
===================================================== */

const printentProgress =
  document.getElementById(
    "printentProgress"
  );

function updateProgress(){

  const scrollTop =
    window.scrollY;

  const scrollHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const progress =
    scrollHeight > 0
      ? (scrollTop / scrollHeight) * 100
      : 0;

  if(printentProgress){

    printentProgress.style.width =
      `${Math.min(progress,100)}%`;

  }

}

window.addEventListener(
  "scroll",
  updateProgress,
  { passive:true }
);

updateProgress();


/* =====================================================
   V7 — IMAGE DRAG PREVENTION
===================================================== */

document
  .querySelectorAll("img")
  .forEach((img) => {

    img.setAttribute(
      "draggable",
      "false"
    );

  });


/* =====================================================
   V7 — EXTERNAL LINKS SECURITY
===================================================== */

document
  .querySelectorAll(
    'a[target="_blank"]'
  )
  .forEach((link) => {

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );

  });


/* =====================================================
   V8 — PROCESS LINE REVEAL
===================================================== */

const processGrid =
  document.querySelector(
    ".process-grid"
  );

if(processGrid){

  const processObserver =
    new IntersectionObserver(

      (entries) => {

        entries.forEach(
          (entry) => {

            if(
              entry.isIntersecting
            ){

              entry.target
                .classList.add(
                  "process-visible"
                );

              processObserver
                .unobserve(
                  entry.target
                );

            }

          }
        );

      },

      {
        threshold:.3
      }

    );

  processObserver.observe(
    processGrid
  );

}


/* =====================================================
   V8 — HEADER HIDE / SHOW
===================================================== */

let previousScrollY =
  window.scrollY;

let headerTicking = false;

function updateHeaderDirection(){

  const currentScrollY =
    window.scrollY;

  if(header){

    if(
      currentScrollY >
        previousScrollY &&
      currentScrollY > 500
    ){

      header.classList.remove(
        "header-hidden"
      );

    }else{

      header.classList.remove(
        "header-hidden"
      );

    }

  }

  previousScrollY =
    currentScrollY;

  headerTicking = false;

}

window.addEventListener(
  "scroll",
  () => {

    if (!headerTicking) {
    requestAnimationFrame(updateHeaderDirection);
    headerTicking = true;
  }

  },
  { passive:true }
);


/* =====================================================
   V9 — PAGE READY
===================================================== */

window.addEventListener(
  "load",
  () => {
    document.body.classList.add(
      "page-ready"
    );
  }
);


/* =====================================================
   V9 — RAF SCROLL OPTIMIZATION
===================================================== */

let v9ScrollFrame = false;

window.addEventListener(
  "scroll",
  () => {

    if (v9ScrollFrame) return;

    v9ScrollFrame = true;

    requestAnimationFrame(() => {

      document.documentElement
        .style.setProperty(
          "--page-scroll",
          `${window.scrollY}px`
        );

      v9ScrollFrame = false;

    });

  },
  { passive:true }
);


/* =====================================================
   V9 — LAZY IMAGE COMPLETE STATE
===================================================== */

document
  .querySelectorAll(
    'img[loading="lazy"]'
  )
  .forEach((image) => {

    if(image.complete){

      image.classList.add(
        "image-loaded"
      );

    }

  });


/* =====================================================
   V10 — IMAGE FADE-IN
===================================================== */

document
  .querySelectorAll(
    ".service-img img, .project-card img, .blog-image img, .why-visual img"
  )
  .forEach((image) => {

    image.style.opacity = image.complete
      ? "1"
      : "0";

    image.style.transition +=
      ", opacity .45s ease";

    image.addEventListener(
      "load",
      () => {

        image.style.opacity = "1";

      },
      { once:true }
    );

  });


/* =====================================================
   V10 — REMOVE LOADER FROM DOM
===================================================== */

window.addEventListener(
  "load",
  () => {

    const loader =
      document.getElementById(
        "printentLoader"
      );

    if(!loader) return;

    window.setTimeout(
      () => {

        loader.remove();

      },
      1100
    );

  }
);


/* =====================================================
   V10 — ESC MENU COMPLETE RESET
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if(event.key !== "Escape") return;

    nav?.classList.remove(
      "mobile-open"
    );

    menuButton?.classList.remove(
      "menu-active"
    );

    document.body.classList.remove(
      "menu-open"
    );

  }
);


/* =====================================================
   V11 — PASSIVE / VISIBILITY PERFORMANCE
===================================================== */

let pageIsVisible =
  document.visibilityState === "visible";

document.addEventListener(
  "visibilitychange",
  () => {

    pageIsVisible =
      document.visibilityState === "visible";

  }
);


/* =====================================================
   V11 — SAFE RAF SCROLL STATE
===================================================== */

let v11ScrollScheduled = false;

function v11ScrollUpdate(){

  if(!pageIsVisible){
    v11ScrollScheduled = false;
    return;
  }

  document.documentElement
    .classList.toggle(
      "page-scrolled",
      window.scrollY > 20
    );

  v11ScrollScheduled = false;

}

window.addEventListener(
  "scroll",
  () => {

    if(v11ScrollScheduled) return;

    v11ScrollScheduled = true;

    requestAnimationFrame(
      v11ScrollUpdate
    );

  },
  { passive:true }
);


/* =====================================================
   V11 — IMAGE DECODE
===================================================== */

window.addEventListener(
  "load",
  () => {

    document
      .querySelectorAll(
        'img[loading="lazy"]'
      )
      .forEach((image) => {

        if(
          typeof image.decode ===
          "function"
        ){

          image
            .decode()
            .catch(() => {});

        }

      });

  },
  { once:true }
);


/* =====================================================
   V11 — MOBILE MENU ARIA
===================================================== */

if(menuButton){

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.addEventListener(
    "click",
    () => {
      menuButton.setAttribute(
        "aria-expanded",
        nav?.classList.contains(
          "mobile-open"
        )
          ? "true"
          : "false"
      );
    }
  );

}


/* =====================================================
   V12 — RELIABLE LAZY IMAGE STATE
===================================================== */

document
  .querySelectorAll('img[loading="lazy"]')
  .forEach((image) => {

    const markLoaded = () => {
      image.classList.add("image-loaded");
    };

    if(image.complete){
      markLoaded();
    }else{
      image.addEventListener(
        "load",
        markLoaded,
        { once:true }
      );

      image.addEventListener(
        "error",
        markLoaded,
        { once:true }
      );
    }

  });


/* =====================================================
   V12 — NAVBAR SCROLL CLASS
===================================================== */

function updateV12Header(){

  if(!header) return;

  header.classList.toggle(
    "scrolled",
    window.scrollY > 80
  );

}

window.addEventListener(
  "scroll",
  updateV12Header,
  { passive:true }
);

updateV12Header();


/* =====================================================
   V12 — MOBILE MENU RESET AFTER LINK
===================================================== */

navigationLinks.forEach((link) => {

  link.addEventListener("click", () => {

    nav?.classList.remove(
      "mobile-open"
    );

    menuButton?.classList.remove(
      "menu-active"
    );

    menuButton?.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove(
      "menu-open"
    );

  });

});


/* =====================================================
   V13 — FINAL SCROLL PERFORMANCE
===================================================== */

let v13Frame = null;

function v13Scroll(){

  if(v13Frame) return;

  v13Frame = requestAnimationFrame(() => {

    const y = window.scrollY;

    document.body.classList.toggle(
      "has-scrolled",
      y > 30
    );

    v13Frame = null;

  });

}

window.addEventListener(
  "scroll",
  v13Scroll,
  { passive:true }
);

v13Scroll();


/* =====================================================
   V13 — STOP ANIMATIONS WHEN TAB HIDDEN
===================================================== */

document.addEventListener(
  "visibilitychange",
  () => {

    document.documentElement.classList.toggle(
      "page-hidden",
      document.hidden
    );

  }
);


/* =====================================================
   V13 — SAFE IMAGE DECODE
===================================================== */

document
  .querySelectorAll("img")
  .forEach((img) => {

    if(
      img.complete &&
      typeof img.decode === "function"
    ){

      img.decode().catch(() => {});

    }

  });


/* =====================================================
   V14 — STAGGER REVEAL
===================================================== */

const staggerGroups = [
  ".service-grid",
  ".projects-grid",
  ".stats-grid",
  ".process-grid",
  ".pricing-grid",
  ".blog-grid"
];

staggerGroups.forEach(
  (selector) => {

    const group =
      document.querySelector(selector);

    if(!group) return;

    [...group.children]
      .forEach(
        (item,index) => {

          item.style
            .setProperty(
              "--reveal-delay",
              `${index * 70}ms`
            );

        }
      );

  }
);


/* =====================================================
   V14 — POINTER CLASS
===================================================== */

if(
  window.matchMedia(
    "(hover:hover) and (pointer:fine)"
  ).matches
){

  document.documentElement
    .classList.add(
      "fine-pointer"
    );

}


/* =====================================================
   V14 — LOAD COMPLETE
===================================================== */

window.addEventListener(
  "load",
  () => {

    document.documentElement
      .classList.add(
        "site-loaded"
      );

  },
  { once:true }
);


/* =====================================================
   V15 — CUSTOM CURSOR
===================================================== */

if(
  window.matchMedia(
    "(hover:hover) and (pointer:fine)"
  ).matches
){

  const cursor =
    document.getElementById(
      "printentCursor"
    );

  const cursorRing =
    document.getElementById(
      "printentCursorRing"
    );

  let mouseX = 0;
  let mouseY = 0;

  let ringX = 0;
  let ringY = 0;

  document.addEventListener(
    "mousemove",
    (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      if(cursor){

        cursor.style.left =
          `${mouseX}px`;

        cursor.style.top =
          `${mouseY}px`;

      }

    }
  );


  function animateCursorRing(){

    ringX +=
      (mouseX - ringX) * .14;

    ringY +=
      (mouseY - ringY) * .14;

    if(cursorRing){

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

    }

      requestAnimationFrame(animateCursorRing);

  }

  animateCursorRing();


  document
    .querySelectorAll(
      "a, button, .project-card, .service-card, .price-card"
    )
    .forEach((element) => {

      element.addEventListener(
        "mouseenter",
        () => {

          cursor?.classList.add(
            "cursor-hover"
          );

          cursorRing?.classList.add(
            "cursor-hover"
          );

        }
      );

      element.addEventListener(
        "mouseleave",
        () => {

          cursor?.classList.remove(
            "cursor-hover"
          );

          cursorRing?.classList.remove(
            "cursor-hover"
          );

        }
      );

    });

}


/* =====================================================
   V15 — HERO PARALLAX
===================================================== */

const heroParallaxImage =
  document.querySelector(
    ".hero-image-card img"
  );

let heroParallaxFrame = false;

function updateHeroParallax(){

  if(
    !heroParallaxImage ||
    window.innerWidth <= 850
  ){

    heroParallaxFrame = false;
    return;

  }

  const amount =
    Math.min(
      window.scrollY * .045,
      28
    );

  heroParallaxImage
    .style.setProperty(
      "--hero-parallax",
      `${amount}px`
    );

  heroParallaxFrame = false;

}

window.addEventListener(
  "scroll",
  () => {

    if (heroParallaxFrame) return;

    heroParallaxFrame = true;

    requestAnimationFrame(
      updateHeroParallax
    );

  },
  { passive:true }
);

updateHeroParallax();


/* =====================================================
   V16 — VIEWPORT HEIGHT FIX FOR MOBILE
===================================================== */

function setViewportHeight(){

  document.documentElement
    .style.setProperty(
      "--vh",
      `${window.innerHeight * .01}px`
    );

}

setViewportHeight();

window.addEventListener(
  "resize",
  setViewportHeight,
  { passive:true }
);


/* =====================================================
   V16 — POINTER PRESS FEEDBACK
===================================================== */

document
  .querySelectorAll(
    "a, button"
  )
  .forEach((element) => {

    element.addEventListener(
      "pointerdown",
      () => {

        element.classList.add(
          "is-pressed"
        );

      }
    );

    const release = () => {

      element.classList.remove(
        "is-pressed"
      );

    };

    element.addEventListener(
      "pointerup",
      release
    );

    element.addEventListener(
      "pointercancel",
      release
    );

    element.addEventListener(
      "pointerleave",
      release
    );

  });


/* =====================================================
   V17 — SECTION REVEAL
===================================================== */

const v17RevealTargets =
  document.querySelectorAll(
    [
      ".intro-content",
      ".services-heading",
      ".service-card",
      ".projects-head",
      ".project-card",
      ".stat",
      ".why-visual",
      ".why-content",
      ".process-head",
      ".process-card",
      ".testimonial-content",
      ".pricing-head",
      ".price-card",
      ".blog-head",
      ".blog-card",
      ".big-cta-inner"
    ].join(",")
  );

v17RevealTargets.forEach(
  (element,index) => {

    element.classList.add(
      "v17-reveal"
    );

    element.style.transitionDelay =
      `${Math.min(index % 4,3) * 65}ms`;

  }
);


const v17Observer =
  new IntersectionObserver(

    (entries,observer) => {

      entries.forEach((entry) => {

        if(!entry.isIntersecting) return;

        entry.target.classList.add(
          "v17-visible"
        );

        observer.unobserve(
          entry.target
        );

      });

    },

    {
      threshold:.08,
      rootMargin:"0px 0px -45px 0px"
    }

  );


v17RevealTargets.forEach(
  (element) => {

    v17Observer.observe(
      element
    );

  }
);


/* =====================================================
   V17 — HASH LOAD FIX
===================================================== */

window.addEventListener(
  "load",
  () => {

    if(!window.location.hash) return;

    const target =
      document.querySelector(
        window.location.hash
      );

    if(!target) return;

    window.setTimeout(() => {

      const offset =
        window.innerWidth <= 850
          ? 68
          : 75;

      window.scrollTo({
        top:
          target.offsetTop -
          offset,
        behavior:"auto"
      });

    },100);

  }
);


/* =====================================================
   V18 — LIGHTWEIGHT SECTION PARALLAX
===================================================== */

const v18Sections =
  document.querySelectorAll(
    ".intro-section, .projects-section, .why-section, .pricing-section"
  );

v18Sections.forEach((section) => {

  section.classList.add(
    "v18-section"
  );

});


const v18Hero =
  document.querySelector(
    ".hero"
  );

let v18Ticking = false;


function updateV18Motion(){

  const scrollY =
    window.scrollY;

  if(v18Hero){

    v18Hero.classList.toggle(
      "v18-hero-scrolled",
      scrollY > 80
    );

  }


  if(
    window.innerWidth > 850 &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ){

    v18Sections.forEach((section) => {

      const rect =
        section.getBoundingClientRect();

      if(
        rect.bottom < 0 ||
        rect.top > window.innerHeight
      ){
        return;
      }

      const center =
        rect.top +
        rect.height / 2;

      const viewportCenter =
        window.innerHeight / 2;

      const distance =
        center -
        viewportCenter;

      const offset =
        Math.max(
          -12,
          Math.min(
            12,
            distance * -.015
          )
        );

      section.style.setProperty(
        "--v18-y",
        `${offset}px`
      );

    });

  }else{

    v18Sections.forEach((section) => {

      section.style.setProperty(
        "--v18-y",
        "0px"
      );

    });

  }

  v18Ticking = false;

}


function requestV18Update(){

  if(v18Ticking) return;

  v18Ticking = true;

  requestAnimationFrame(
    updateV18Motion
  );

}


window.addEventListener(
  "scroll",
  requestV18Update,
  { passive:true }
);

window.addEventListener(
  "resize",
  requestV18Update,
  { passive:true }
);

requestV18Update();


/* =====================================================
   V18 — CARD KEYBOARD ACCESS
===================================================== */
 
document
  .querySelectorAll(
    ".project-card, .service-card, .blog-card"
  )
  .forEach((card) => {
 
    const link =
      card.querySelector("a");
 
    if(!link) return;
 
    card.addEventListener(
      "click",
      (event) => {
 
        if(
          event.target.closest(
            "a, button"
          )
        ){
          return;
        }
 
        link.click();
 
      }
    );
 
  });
 
 
/* =====================================================
   V19 — PRINTENT NAVIGATION
===================================================== */
 
const printentSearchButton =
  document.getElementById(
    "navSearchButton"
  );
 
const printentSearchOverlay =
  document.getElementById(
    "navSearchOverlay"
  );
 
const printentSearchClose =
  document.getElementById(
    "navSearchClose"
  );
 
 
function openPrintentSearch(){
 
  if(!printentSearchOverlay) return;
 
  printentSearchOverlay.classList.add(
    "open"
  );
 
  printentSearchOverlay.setAttribute(
    "aria-hidden",
    "false"
  );
 
  document.body.style.overflow =
    "hidden";
 
  window.setTimeout(() => {
 
    printentSearchOverlay
      .querySelector("input")
      ?.focus();
 
  },250);
 
}
 
 
function closePrintentSearch(){
 
  if(!printentSearchOverlay) return;
 
  printentSearchOverlay.classList.remove(
    "open"
  );
 
  printentSearchOverlay.setAttribute(
    "aria-hidden",
    "true"
  );
 
  if(
    !document
      .querySelector(".desktop-nav")
      ?.classList.contains(
        "mobile-open"
      )
  ){
    document.body.style.overflow = "";
  }
 
}
 
 
printentSearchButton
  ?.addEventListener(
    "click",
    openPrintentSearch
  );
 
printentSearchClose
  ?.addEventListener(
    "click",
    closePrintentSearch
  );
 
printentSearchOverlay
  ?.addEventListener(
    "click",
    (event) => {
 
      if(
        event.target ===
        printentSearchOverlay
      ){
        closePrintentSearch();
      }
 
    }
  );
 
 
/* MOBILE SUBMENUS */
 
document
  .querySelectorAll(
    ".nav-item.has-dropdown > .nav-link"
  )
  .forEach((link) => {
 
    link.addEventListener(
      "click",
      (event) => {
 
        if(
          window.innerWidth > 1100
        ){
          return;
        }
 
        event.preventDefault();
 
        const item =
          link.closest(
            ".nav-item"
          );
 
        document
          .querySelectorAll(
            ".nav-item.mobile-sub-open"
          )
          .forEach((other) => {
 
            if(other !== item){
 
              other.classList.remove(
                "mobile-sub-open"
              );
 
            }
 
          });
 
        item?.classList.toggle(
          "mobile-sub-open"
        );
 
      }
    );
 
  });
 
 
/* ESC SEARCH */
 
document.addEventListener(
  "keydown",
  (event) => {
 
    if(event.key === "Escape"){
 
      closePrintentSearch();
 
      document
        .querySelectorAll(
          ".nav-item.mobile-sub-open"
        )
        .forEach((item) => {
 
          item.classList.remove(
            "mobile-sub-open"
          );
 
        });
 
    }
 
  }
);
 
 
/* CLOSE DROPDOWNS ON RESIZE */
 
window.addEventListener(
  "resize",
  () => {
 
    if(window.innerWidth > 1100){
 
      document
        .querySelectorAll(
          ".nav-item.mobile-sub-open"
        )
        .forEach((item) => {
 
          item.classList.remove(
            "mobile-sub-open"
          );
 
        });
 
    }
 
  },
  { passive:true }
);
 
 
/* =====================================================
   V20 — HOME VISUAL MENU MOBILE SUPPORT
===================================================== */
 
const homePreviewLink =
  document.querySelector(
    ".home-preview-parent > .nav-link"
  );
 
homePreviewLink?.addEventListener(
  "click",
  (event) => {
 
    if(window.innerWidth > 1100){
      return;
    }
 
    event.preventDefault();
 
    const parent =
      homePreviewLink.closest(
        ".home-preview-parent"
      );
 
    document
      .querySelectorAll(
        ".nav-item.mobile-sub-open"
      )
      .forEach((item) => {
 
        if(item !== parent){
 
          item.classList.remove(
            "mobile-sub-open"
          );
 
        }
 
      });
 
    parent?.classList.toggle(
      "mobile-sub-open"
    );
 
  }
);
 
 
/* =====================================================
   HOME VISUAL DROPDOWN — CLICK FIX
===================================================== */
 
(() => {
 
  const parent =
    document.querySelector(
      ".home-preview-parent"
    );
 
  if(!parent) {
    console.error(
      "HOME PREVIEW PARENT NOT FOUND"
    );
    return;
  }
 
 
  const trigger =
    parent.querySelector(
      ":scope > .nav-link"
    );
 
  const menu =
    parent.querySelector(
      ":scope > .home-preview-menu"
    );
 
 
  if(!trigger || !menu) {
 
    console.error(
      "HOME PREVIEW ELEMENTS NOT FOUND",
      { trigger, menu }
    );
 
    return;
  }
 
 
  trigger.addEventListener(
    "click",
    (event) => {
 
      /* DESKTOP */
 
      if(window.innerWidth > 1100){
 
        event.preventDefault();
        event.stopPropagation();
 
        parent.classList.toggle(
          "home-menu-open"
        );
 
        return;
      }
 
 
      /* MOBILE */
 
      event.preventDefault();
 
      parent.classList.toggle(
        "mobile-sub-open"
      );
 
    }
  );
 
 
  /* KEEP CLICK INSIDE MENU */
 
  menu.addEventListener(
    "click",
    (event) => {
 
      event.stopPropagation();
 
    }
  );
 
 
  /* CLICK OUTSIDE = CLOSE */
 
  document.addEventListener(
    "click",
    () => {
 
      parent.classList.remove(
        "home-menu-open"
      );
 
    }
  );
 
 
  /* ESC = CLOSE */
 
  document.addEventListener(
    "keydown",
    (event) => {
 
      if(event.key === "Escape"){
 
        parent.classList.remove(
          "home-menu-open"
        );
 
      }
 
    }
  );
 
 
  console.log(
    "HOME VISUAL DROPDOWN READY"
  );
 
})();
 
/* =========================================================
   V23 — FIX NAVBAR ON SCROLL
========================================================= */
 
(() => {
 
  const header =
    document.querySelector(".site-header");
 
  const navbar =
    document.querySelector(".site-header .navbar");
 
  if(!header || !navbar) return;
 
 
  /* placeholder prevents layout jump */
 
  let placeholder =
    document.querySelector(".navbar-placeholder");
 
  if(!placeholder){
 
    placeholder =
      document.createElement("div");
 
    placeholder.className =
      "navbar-placeholder";
 
    navbar.after(placeholder);
 
  }
 
 
  const updateNavbar = () => {
 
    const topbar =
      header.querySelector(".topbar");
 
    const trigger =
      topbar
        ? topbar.offsetHeight
        : 50;
 
 
    if(window.scrollY > trigger){
 
      header.classList.add(
        "nav-is-fixed"
      );
 
      document.body.classList.add(
        "navbar-fixed-active"
      );
 
      placeholder.style.height =
        navbar.offsetHeight + "px";
 
    }else{
 
      header.classList.remove(
        "nav-is-fixed"
      );
 
      document.body.classList.remove(
        "navbar-fixed-active"
      );
 
    }
 
  };
 
 
  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive:true }
  );
 
 
  window.addEventListener(
    "resize",
    updateNavbar
  );
 
 
  updateNavbar();
 
})();



/* =========================================================
   HAPPY CUSTOMER — CURSOR PARALLAX
========================================================= */

(() => {

  const section =
    document.querySelector(".happy-customer-section");

  if(!section) return;


  const faces =
    [...section.querySelectorAll(".happy-face")];

  if(!faces.length) return;


  let targetX = 0;
  let targetY = 0;

  let currentX = 0;
  let currentY = 0;

  let raf = null;


  function animateHappyFaces(){

    currentX += (targetX - currentX) * 0.075;
    currentY += (targetY - currentY) * 0.075;


    faces.forEach((face) => {

      const depth =
        parseFloat(face.dataset.depth || "1");

      /*
       Different depth = different movement.
       Gives the floating/parallax feeling.
      */

      const x =
        currentX * 28 * depth;

      const y =
        currentY * 22 * depth;


      face.style.setProperty(
        "--mouse-x",
        `${x}px`
      );

      face.style.setProperty(
        "--mouse-y",
        `${y}px`
      );

    });


    if(
      Math.abs(targetX-currentX) > .001 ||
      Math.abs(targetY-currentY) > .001
    ){
      raf =
        requestAnimationFrame(
          animateHappyFaces
        );
    }else{
      raf = null;
    }

  }


  function requestAnimation(){

    if(raf) return;

    raf =
      requestAnimationFrame(
        animateHappyFaces
      );

  }


  section.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        section.getBoundingClientRect();


      targetX =
        ((event.clientX - rect.left) /
        rect.width - .5) * 2;


      targetY =
        ((event.clientY - rect.top) /
        rect.height - .5) * 2;


      section.classList.add(
        "is-moving"
      );


      requestAnimation();

    }
  );


  section.addEventListener(
    "mouseleave",
    () => {

      targetX = 0;
      targetY = 0;

      section.classList.remove(
        "is-moving"
      );

      requestAnimation();

    }
  );

})();

/* STATS COUNT-UP ANIMATION */

document.addEventListener("DOMContentLoaded", () => {

  const stats = document.querySelectorAll(".pae-stat strong");

  if (!stats.length) return;

  stats.forEach(stat => {

    const target = parseInt(
      stat.textContent.replace(/[^\d]/g, ""),
      10
    );

    if (!target) return;

    stat.dataset.target = target;

    /* preserve + sign */
    stat.innerHTML = '0<sup>+</sup>';
  });


  const animateCounter = (element) => {

    const target = Number(element.dataset.target);

    const duration = 2000;
    const startTime = performance.now();

    const update = (currentTime) => {

      const elapsed = currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      /* smooth ease-out */
      const eased =
        1 - Math.pow(1 - progress, 4);

      const current =
        Math.floor(target * eased);

      element.innerHTML =
        current.toLocaleString() +
        '<sup>+</sup>';

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.innerHTML =
          target.toLocaleString() +
          '<sup>+</sup>';
      }
    };

    requestAnimationFrame(update);
  };


  const observer = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const numbers =
          entry.target.querySelectorAll(
            ".pae-stat strong"
          );

        numbers.forEach((number, index) => {

          /* tiny stagger between counters */
          setTimeout(() => {
            animateCounter(number);
          }, index * 100);

        });

        /* run only once */
        observer.unobserve(entry.target);

      });

    },
    {
      threshold: 0.35
    }
  );


  const statsSection =
    document.querySelector(".pae-stats");

  if (statsSection) {
    observer.observe(statsSection);
  }

});



