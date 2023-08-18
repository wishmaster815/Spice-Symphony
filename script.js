function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
init();

var tl = gsap.timeline();

tl.from("#imgs h2,#imgs img,#page2Txt h2,#page2Txt p,#page2Txt button", {
  y: 100,

  // delay:0.5,
  opacity: 0,
  stagger: 0.2,
  scrollTrigger: {
    scroller: "#main",
    trigger: "#page2",
    start: "top 20%",
    end: "top 40%",
    // top:"50%",
    // markers:true,
    scrub: 3,
  },
});

tl.from(
  "#page3Txt h2,#page3Txt p,#page3Txt button,#appet,.page3Img1,.page3Img2",
  {
    y: 100,

    // delay:0.5,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page3",
      start: "top 20%",
      end: "top 40%",
      // top:"50%",
      // markers:true,
      scrub: 3,
    },
  }
);
if (window.matchMedia("(min-width:768px)").matches) {
  tl.from(".carousel-item,#page4 h1", {
    y: 100,

    // delay:0.5,
    opacity: 0,
    stagger: 0.2,
    scrollTrigger: {
      scroller: "#main",
      trigger: "#page4",
      start: "top 20%",
      end: "top 40%",
      // top:"50%",
      // markers:true,
      scrub: 3,
    },
  });
}

// Page 4 JS and Jquery
if (window.matchMedia("(min-width:992px)").matches) {
  var carouselWidth = $(".carousel-inner")[0].scrollWidth;
  var cardWidth = $(".carousel-item").width();

  var scrollPosition = 0;

  $(".carousel-control-next").on("click", function () {
    if (scrollPosition < carouselWidth - cardWidth * 4) {
      scrollPosition = scrollPosition + cardWidth;
      $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    }
  });
  $(".carousel-control-prev").on("click", function () {
    if (scrollPosition >= 0) {
      scrollPosition = scrollPosition - cardWidth;
      $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    }
  });
}
