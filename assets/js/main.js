(function ($) {
  "use strict";

  $(document).ready(function () {


    /*---------- Mobile Menu  ----------*/
    $.fn.etmobilemenu = function (options) {
      var opt = $.extend(
        {
          menuToggleBtn: ".global-menu-toggle",
          bodyToggleClass: "global-body-visible",
          subMenuClass: "global-submenu",
          subMenuParent: "menu-item-has-children",
          gtSubMenuParent: "menu-item-has-children",
          subMenuParentToggle: "global-active",
          meanExpandClass: "global-mean-expand",
          appendElement: '<span class="global-mean-expand"></span>',
          subMenuToggleClass: "global-open",
          toggleSpeed: 400,
        },
        options
      );

      return this.each(function () {
        var menu = $(this); // Select menu

        // Menu Show & Hide
        function menuToggle() {
          menu.toggleClass(opt.bodyToggleClass);

          // collapse submenu on menu hide or show
          var subMenu = "." + opt.subMenuClass;
          $(subMenu).each(function () {
            if ($(this).hasClass(opt.subMenuToggleClass)) {
              $(this).removeClass(opt.subMenuToggleClass);
              $(this).css("display", "none");
              $(this).parent().removeClass(opt.subMenuParentToggle);
            }
          });
        }

        // Class Set Up for every submenu
        menu.find("." + opt.subMenuParent).each(function () {
          var submenu = $(this).find("ul");
          submenu.addClass(opt.subMenuClass);
          submenu.css("display", "none");
          $(this).addClass(opt.subMenuParent);
          $(this).addClass(opt.gtSubMenuParent); // Add menu-item-has-children class
          $(this).children("a").append(opt.appendElement);
        });

        // Toggle Submenu
        function toggleDropDown($element) {
          var submenu = $element.children("ul");
          if (submenu.length > 0) {
            $element.toggleClass(opt.subMenuParentToggle);
            submenu.slideToggle(opt.toggleSpeed);
            submenu.toggleClass(opt.subMenuToggleClass);
          }
        }

        // Submenu toggle Button
        var itemHasChildren = "." + opt.gtSubMenuParent + " > a";
        $(itemHasChildren).each(function () {
          $(this).on("click", function (e) {
            e.preventDefault();
            toggleDropDown($(this).parent());
          });
        });

        // Menu Show & Hide On Toggle Btn click
        $(opt.menuToggleBtn).each(function () {
          $(this).on("click", function () {
            menuToggle();
          });
        });

        // Hide Menu On outside click
        menu.on("click", function (e) {
          e.stopPropagation();
          menuToggle();
        });


        // Stop Hide full menu on menu click
        menu.on("click", function (e) {
          e.stopPropagation();
        });

        // Prevent submenu from hiding when clicking inside the menu
        menu.find("div").on("click", function (e) {
          e.stopPropagation();
        });
      });
    };

    $(".global-menu-wrapper").etmobilemenu();



    /*---------- Sticky fix ----------*/
    $(window).scroll(function () {
      var topPos = $(this).scrollTop();
      if (topPos > 10) {
        $('.sticky-wrapper').addClass('sticky');
        $('.category-menu').addClass('close-category');
      } else {
        $('.sticky-wrapper').removeClass('sticky')
        $('.category-menu').removeClass('close-category');
      }
    })

    // After
    $('.menu-expand').on('click', function (e) {
      e.preventDefault();
      $('.category-menu').toggleClass('open-category');
    });



    /*---------- Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {

      $($sideMunuOpen).on('click', function (e) {
        e.preventDefault();
        $($sideMenu).addClass($toggleCls);
      });
      $($sideMenu).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls)
      });
      var sideMenuChild = $sideMenu + ' > div';
      $(sideMenuChild).on('click', function (e) {
        e.stopPropagation();
        $($sideMenu).addClass($toggleCls)
      });

      $($sideMenuCls).on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $($sideMenu).removeClass($toggleCls);
      });
    };


    popupSideMenu('.sidemenu-cart', '.sideMenuToggler', '.sideMenuCls', 'show');
    popupSideMenu('.sidemenu-info', '.sideMenuInfo', '.sideMenuCls', 'show');



    /*-----------------------------------
          Counterup 
        -----------------------------------*/
    if ($('.counters-item').length) {
      $('.counters-item').counterUp({
        delay: 10,
        time: 1000,
      });
    }


    /*-----------------------------------
          Wow Animation 
        -----------------------------------*/
    new WOW().init();


    /*-----------------------------------
          Set Background Image & Mask   
        -----------------------------------*/
    if ($("[data-bg-src]").length > 0) {
      $("[data-bg-src]").each(function () {
        var src = $(this).attr("data-bg-src");
        $(this).css("background-image", "url(" + src + ")");
        $(this).removeAttr("data-bg-src").addClass("background-image");
      });
    }


    /*-----------------------------------
          Back to top    
        -----------------------------------*/
    $(window).on("scroll", function () {
      if ($(this).scrollTop() > 20) {
        $("#back-top").addClass("show");
      } else {
        $("#back-top").removeClass("show");
      }
    });

    $(document).on("click", "#back-top", function () {
      $("html, body").animate({ scrollTop: 0 }, 800);
      return false;
    });



    /*-----------------------------------
          MagnificPopup  view    
        -----------------------------------*/
    $(".popup-video").magnificPopup({
      type: "iframe",
      removalDelay: 260,
      mainClass: "mfp-zoom-in",
    });

    $(".img-popup").magnificPopup({
      type: "image",
      gallery: {
        enabled: true,
      },
    });


    /*-----------------------------------
         Text Splitting
      -----------------------------------*/
    Splitting();




    /*-----------------------------------
            13. Progress Bar   
        -----------------------------------*/
    $(".progress-bar").each(function () {
      var $this = $(this);
      var progressWidth = $this.attr("style").match(/width:\s*(\d+)%/)[1] + "%";

      $this.waypoint(
        function () {
          $this.css({
            "--progress-width": progressWidth,
            animation: "animate-positive 1.8s forwards",
            opacity: "1",
          });
        },
        { offset: "75%" }
      );
    });


    /*-----------------------------------
     Slider
     -----------------------------------*/

    //  Slider Animation 
    function applyAnimationProperties() {
      $("[data-ani]").each(function () {
        var animationClass = $(this).data("ani");
        $(this).addClass(animationClass);
      });

      $("[data-ani-delay]").each(function () {
        var delay = $(this).data("ani-delay");
        $(this).css("animation-delay", delay);
      });
    }

    // Call the animation properties function
    applyAnimationProperties();


    // testimonial 
    var testimonialSlider = new Swiper('.testimonial1-slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: false,
      speed: 600,
      navigation: {
        nextEl: ".slider-nav-area .swiper-next",
        prevEl: ".slider-nav-area .swiper-prev",
      },
    });

    // testimonial 
    var testimonialSlider = new Swiper('.testimonial2-slider', {
      slidesPerView: 1.8,
      spaceBetween: 30,
      loop: true,
      autoplay: false,
      speed: 600,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 1.5,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 1.8,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 1.8,
          spaceBetween: 24,
        },
      },
      navigation: {
        nextEl: ".slider-nav-area .swiper-next",
        prevEl: ".slider-nav-area .swiper-prev",
      },
    });

    // testimonial 
    var testimonialSlider = new Swiper('.testimonial1-item-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: false,
      speed: 600,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
      },
    });


    // team Slider
    var teamSlider = new Swiper('.team5-slider', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: false,
      speed: 600,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
      navigation: {
        nextEl: ".slider-nav-area .swiper-next",
        prevEl: ".slider-nav-area .swiper-prev",
      },
    });

    // Project3
    var ProjectSlider = new Swiper('.project3-slider', {
      slidesPerView: 1.8,
      spaceBetween: 30,
      loop: true,
      autoplay: false,
      speed: 600,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 5,
          spaceBetween: 24,
        },
      },
      navigation: {
        nextEl: ".slider-nav-area .swiper-next",
        prevEl: ".slider-nav-area .swiper-prev",
      },
    });

    // Project5
    var ProjectSlider = new Swiper('.project5-slider', {
      slidesPerView: 1.8,
      spaceBetween: 30,
      loop: true,
      autoplay: false,
      speed: 600,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1200: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
      navigation: {
        nextEl: ".slider-nav-area .swiper-next",
        prevEl: ".slider-nav-area .swiper-prev",
      },
    });

    // Partner Slider
    var PartnerSlider = new Swiper('.brand5item-slider', {
      loop: true,
      slidesPerView: 3,
      spaceBetween: 10,
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 13,
        },
        576: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        1440: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },

    });


    var PartnerSlider = new Swiper('.brand5item-slider4', {
      loop: true,
      autoplay: {
        delay: 0, // no delay between transitions
        disableOnInteraction: true, // keep autoplay even after user interaction
      },
      allowTouchMove: true, // disable manual drag (optional)
      grabCursor: true,
      freeMode: true,
      freeModeMomentum: false,
      freeModeMomentumBounce: false,

      slidesPerView: 3,
      spaceBetween: 0,
      speed: 5000,
      breakpoints: {
        0: {
          slidesPerView: 3,
          spaceBetween: 8,
        },
        576: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        992: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
        1440: {
          slidesPerView: 8,
          spaceBetween: 20,
        },
      },
      on: {
        init: function () {
          this.autoplay.running = true;
          this.autoplay.paused = false;
        },
      },

    });


    // Banner Page Number Slider Style 
    var oneGridBannerSlider = new Swiper('.one-grid-pagination-slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: true,
      centeredSlides: true,
      speed: 600,
      effect: "fade",
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          var formattedIndex = (index + 1).toString().padStart(2, '0');
          return '<span class="' + className + '">' + formattedIndex + "</span>";
        },
      },
    });

    // Search Overly 
    $(".others-options .search-box").on("click", function () { $(".search-overlay").toggleClass("search-overlay-active"); });
    $(".search-overlay-close").on("click", function () { $(".search-overlay").removeClass("search-overlay-active"); })


  }); // End Document Ready Function




  /*-----------------------------------
        Preloader   
    -----------------------------------*/

  function loader() {
    $(window).on("load", function () {
      // Animate loader off screen
      $(".preloader").addClass("loaded");
      $(".preloader").delay(600).fadeOut();
    });
  }

  loader();


  const splitText = new SplitText(".paragraph-text p", {
    type: "words, chars",
    charsClass: "text-highlight-onscroll"
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      // pinSpacing: false, // You almost always want pinSpacing: true
      trigger: ".onscroll-section",
      scrub: 1,
      start: "top 100%",
      end: "bottom 90%",
      markers: false
    }
  });
  tl.to(".text-highlight-onscroll", {
    "--highlight-offset": "100%",
    stagger: 0.05
  });




})(jQuery); // End jQuery

