/**
 * Frontend JS
 */

'use strict';

(function($) {
    var rtDocfind = rtDocfind || {};

    /**
	 * Predefined variables.
	 */
    var $window = $(window),
        $document = $(document),
        $body = $('body'),
        $preLoader = $('#preloader'),
        $toTop = $('.rt-scroll-to-top'),
        $intelHeader = $('.intelligent-header'),
        $headerSpace = $('.fixed-header-space'),
        $elCarousel = $(".element-carousel"),
        $rtMobileMenu = $(".offscreen-navigation .mobile-menu"),
        $rtTabWrappers = document.querySelectorAll('.rt-tabs-wrapper');
    

    /**
	 * Check if element exists.
	 */
	$.fn.elExists = function () {
		return this.length > 0;
	};


	/**
	 * Functions.
	 */
    rtDocfind.functions = {
		preLoaderInit: function () {
			if (!$preLoader.elExists()) {
				return false;
			}

            $preLoader.delay(300).fadeOut('fast');
		},

        //sticky header
		scrollToTop: function () {

            $window.on("scroll", function () {
                var scroll = $(window).scrollTop();
                if (scroll < 200) {
                    $("header").removeClass("affix");
                } else {
                    $("header").addClass("affix");
                }
            });

			$toTop.on('click', function () {
				$('html, body').animate(
					{
						scrollTop: 0
					},
					{
						duration: 500,
						easing: 'swing'
					}
				);
			});
		},

        //counter-up
        counterUp: function () {
            var observer = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    // If the element is in view, start counter animation
                    if (entry.isIntersecting) {
                    $(entry.target).prop("Counter", 0).animate(
                        {
                        Counter: $(entry.target).text(),
                        },
                        {
                        duration: 3000,
                        easing: "swing",
                        step: function (now) {
                            $(entry.target).text(Math.ceil(now));
                        },
                        }
                    );
                    // Stop observing the element to prevent duplicate animations
                    observer.unobserve(entry.target);
                    }
                });
            });
            
            // Observe each .counterup element
            $(".counterup").each(function () {
            observer.observe(this);
            });
        },

        //mobile-menu-dropdown
        mobileMenuDropdown: function () {

            if (!$rtMobileMenu.elExists()) {
				return false;
			}

            $rtMobileMenu.children("li").addClass("menu-item-parent");
            $rtMobileMenu.find(".menu-item-has-children > a").on("click", function(e) {
                e.preventDefault();
                $(this).toggleClass("opened");
                var n = $(this).next(".sub-menu"),
                    s = $(this).closest(".menu-item-parent").find(".sub-menu");
                $rtMobileMenu
                    .find(".sub-menu")
                    .not(s)
                    .slideUp(250)
                    .prev("a")
                    .removeClass("opened"),
                    n.slideToggle(250);
            });
            $rtMobileMenu
                .find(".menu-item:not(.menu-item-has-children) > a")
                .on("click", function(e) {
                    $(".rt-slide-nav").slideUp();
                    $("body").removeClass("slidemenuon");
            });
        },


        //mobile-menu-toggle
        mobileToggleMenu: function () {
            $(".sidebarBtn").on("click", function(e) {
                e.preventDefault();
                if ($(".rt-slide-nav").is(":visible")) {
                    $(".rt-slide-nav").slideUp();
                    $("body").removeClass("slidemenuon");
                } else {
                    $(".rt-slide-nav").slideDown();
                    $("body").addClass("slidemenuon");
                }
            });
        },

        //search-overlay
        searchOverlay: function () {
            $('a[href="#template-search"]').on("click", function (event) {
                console.log('hello')
                event.preventDefault();
                var target = $("#template-search");
                target.addClass("open");
                setTimeout(function () {
                    target.find("input").focus();
                }, 600);
                return false;
            });
  
            $("#template-search, #template-search button.close").on(
                "click keyup",
                function (event) {
                    if (
                    event.target === this ||
                    event.target.className === "close" ||
                    event.keyCode === 27
                    ) {
                    $(this).removeClass("open");
                    }
                }
            );
        },

        //mouse-parallax
        mouseParallax: function () {
            var parallaxInstances = [];
            $('.rt-mouse-parallax').each(function(index, element) {
                var $this = $(this);
                $this.attr('id', "rt-parallax-instance-" + index);
                parallaxInstances[index] = new Parallax($("#rt-parallax-instance-" + index).get(0), {
                    // hoverOnly: true,
                    // relativeInput: true,
                });
            })
        },

        
        //Elements Carousel
        elementsCarousel: function () {
            if ($elCarousel.elExists()) {
                $elCarousel.each(function (index, element) {

                    var $this = $(this);

                    // Fetching from data attributes
                    var visibleSlides = $this.attr("data-visible-slide") ? parseInt($this.attr("data-visible-slide"), 10) : 4;
                    var visibleSlides_xxxl = $this.attr("data-visible-xxxl-slide") ? parseInt($this.attr("data-visible-xxxl-slide"), 10) : 4;
                    var visibleSlides_xxl = $this.attr("data-visible-xxl-slide") ? parseInt($this.attr("data-visible-xxl-slide"), 10) : 4;
                    var visibleSlides_xl = $this.attr("data-visible-xl-slide") ? parseInt($this.attr("data-visible-xl-slide"), 10) : 4;
                    var visibleSlides_lg = $this.attr("data-visible-lg-slide") ? parseInt($this.attr("data-visible-lg-slide"), 10) : 3;
                    var visibleSlides_md = $this.attr("data-visible-md-slide") ? parseInt($this.attr("data-visible-md-slide"), 10) : 2;
                    var visibleSlides_sm = $this.attr("data-visible-sm-slide") ? parseInt($this.attr("data-visible-sm-slide"), 10) : 1;
                    var visibleSlides_xs = $this.attr("data-visible-xs-slide") ? parseInt($this.attr("data-visible-xs-slide"), 10) : 1;
                    var slideSpeed = $this.attr("data-speed") ? parseInt($this.attr("data-speed"), 10) : 1000;
                    var slideLoop = $this.attr("data-loop") === 'true' ? 1 : 0;
                    var slideSpace = $this.attr("data-space-between") ? parseInt($this.attr("data-space-between"), 10) : 30;
                    var slideAutoPlayDelay = $this.attr("data-autoplay-delay") ? parseInt($this.attr("data-autoplay-delay"), 10) : 100000000;
                    var slideEffect = $this.attr("data-effect") ? $this.attr("data-effect") : 'slide';
                    var direction = $this.attr("data-direction") ? $this.attr("data-direction") : 'horizontal';
                    // var effect = $this.attr('data-effect')? $this.attr('data-effect') : ''

                    // Adding slider and slider-nav instances to use multiple times in a page
                    $this.parent().find(".prev").addClass("prev-" + index);
                    $this.parent().find(".next").addClass("next-" + index);

                    var rtSlider = new Swiper(element, {
                        slidesPerView: visibleSlides,
                        spaceBetween: slideSpace,
                        speed: slideSpeed,
                        loop: slideLoop,
                        direction: direction,
                        effect: slideEffect,

                        // effect:'coverflow',
                        // coverflowEffect: {
                        //     rotate: 0,
                        //     stretch: 0,
                        //     depth: 100,
                        //     modifier: 12,
                        //     initialSlide: 3,
                        //     slideShadows: true
                        // },
                        // centeredSlides: true,
                        // initialSlide: 2,
                        // grabCursor: true,
                        // centeredSlides: false,

                        observer: true,
                        observeParents: true,
                        watchSlidesProgress: true,
                        watchSlidesVisibility: true,
                        loopAdditionalSlides: 10,
                        direction: direction,
                        
                        autoplay: {
                            delay: slideAutoPlayDelay
                        },

                        navigation: {
                            nextEl: '.swiper-arrow.next',
                            prevEl: '.swiper-arrow.prev'
                        },

                        pagination: {
                            // el: '.pagination-' + index,
                            el: '.swiper-pagination',
                            // type: 'bullets',
                            clickable: true,
                        },

                        // Responsive breakpoints
                        breakpoints: {
                            0: {
                                slidesPerView: visibleSlides_xs,
                            },
                            576: {
                                slidesPerView: visibleSlides_sm,
                                spaceBetween: 30,
                            },
                            768: {
                                slidesPerView: visibleSlides_md,
                                spaceBetween: 30,
                            },
                            992: {
                                slidesPerView: visibleSlides_lg,
                                spaceBetween: 30,
                            },
                            1200: {
                                slidesPerView: visibleSlides_xl,
                                spaceBetween: 30,
                            },
                            1400: {
                                slidesPerView: visibleSlides_xxl,
                                spaceBetween: 30,
                            },
                            1600: {
                                slidesPerView: visibleSlides,
                                spaceBetween: 30,
                            },
                            1950: {
                                slidesPerView: visibleSlides_xxxl,
                                spaceBetween: 30,
                            }
                        },
                        on: {
                            afterInit: function (slider) {
                                $(slider.$wrapperEl).find('.swiper-slide').removeClass('visible-first visible-last');
                                $(slider.$wrapperEl).find('.swiper-slide.swiper-slide-visible').first().addClass('visible-first');
                                $(slider.$wrapperEl).find('.swiper-slide.swiper-slide-visible').last().addClass('visible-last');
                            },
                            slideChange: function (slider) {
                                $(slider.$wrapperEl).find('.swiper-slide').removeClass('visible-first visible-last');
                                $(slider.$wrapperEl).find('.swiper-slide.swiper-slide-visible').first().addClass('visible-first');
                                $(slider.$wrapperEl).find('.swiper-slide.swiper-slide-visible').last().addClass('visible-last');
                            },
                            sliderMove: function (slider) {
                                $(slider.$wrapperEl).find('.swiper-slide').removeClass('visible-first visible-last');
                                $(slider.$wrapperEl).find('.swiper-slide.swiper-slide-visible').first().addClass('visible-first');
                                $(slider.$wrapperEl).find('.swiper-slide.swiper-slide-visible').last().addClass('visible-last');
                            },
                        }
                    });
                });
            }
        },


        activeMenu: function () {
            $("#main-menu ul a")    
            .click(function(e) {
                var link = $(this);

                var item = link.parent("li");
                
                if (item.hasClass("active")) {
                    item.removeClass("active").children("a").removeClass("active");
                } else {
                    item.addClass("active").children("a").addClass("active");
                }

                if (item.children("ul").length > 0) {
                    var href = link.attr("href");
                    link.attr("href", "#");
                    setTimeout(function () { 
                        link.attr("href", href);
                    }, 300);
                    e.preventDefault();
                }
            })
            .each(function() {
                var link = $(this);
                if (link.get(0).href === location.href) {
                    link.addClass("active").parents("li").addClass("active");
                    return false;
                }
            }); 
        },

        isotope: function () {
            // init Isotope
            $('.isotope-items').isotope({
                itemSelector: '.item',
                layoutMode: 'fitRows'
            });
            
            $('.isotope-menu ul li').click(function() {
                $('.isotope-menu ul li').removeClass('active');
                $(this).addClass('active');
            
                var selector = $(this).attr('data-filter');
                $('.isotope-items').isotope({
                filter: selector
                });
                return false;
            });


            
            $('.isotope-items2').isotope({
                itemSelector: '.item',
                layoutMode: 'fitRows'
            });
            
            $('.isotope-menu2 ul li').click(function() {
                $('.isotope-menu2 ul li').removeClass('active');
                $(this).addClass('active');
            
                var selector = $(this).attr('data-filter');
                $('.isotope-items2').isotope({
                filter: selector
                });
                return false;
            });
        },

        backToTop: function() {
            var toTop = $('.to-top');

            toTop.on('click', function() {
                $('html, body').animate({
                scrollTop: $('html, body').offset().top,
                });
            });
        },

		bodyClass: function () {
			$body.addClass('document-loaded');
		},

        select2Dropdown: function() {
            //select2 initialize
            $('.select').select2();
        }

	};

    /**
	 * Scripts to run on document ready event.
	 */
	$document.ready(function () {
		rtDocfind.functions.scrollToTop();
        rtDocfind.functions.counterUp();
        rtDocfind.functions.mobileMenuDropdown();
        rtDocfind.functions.mobileToggleMenu();
        rtDocfind.functions.searchOverlay();
        rtDocfind.functions.mouseParallax();
        rtDocfind.functions.elementsCarousel();
        rtDocfind.functions.activeMenu();
        rtDocfind.functions.isotope();
        rtDocfind.functions.backToTop();
        rtDocfind.functions.select2Dropdown();
        
	});

	/**
	 * Scripts to run on window load event.
	 */
	$window.on('load', function() {
        rtDocfind.functions.preLoaderInit();
		rtDocfind.functions.bodyClass();
	});

	/**
	 * Scripts to run on window resize event.
	 */
	$window.on('resize', function() {
	});

  
    /*==============================
    //  WOW
    ===============================*/
    
    var wow = new WOW({
    boxClass: "wow",
    animateClass: "animate__animated",
    offset: 0,
    mobile: false,
    live: true,
    scrollContainer: null,
    });
    wow.init();




    //docfind Home1 testimonial slider
    
    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
      direction: 'vertical',
      
    });

    var swiper2 = new Swiper(".mySwiper2", {
        spaceBetween: 10,
        direction: 'vertical',
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });


    //docfind Home4 testimonial slider

    var galleryThumbs = new Swiper('.swiper-container.gallery-thumbs', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        hashNavigation: {
            watchState: true,
        },
        
        coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 12,
                slideShadows : false,
            },
            
        });
        
        
        var galleryTop = new Swiper('.swiper-container.testimonial', {
        speed: 400,
        spaceBetween: 50,
        direction: 'vertical',
        pagination: {
            clickable: true,
            el: '.swiper-pagination',
            type: 'bullets',
        },
        thumbs: {
            swiper: galleryThumbs
        }
    });


    //cursor effect

    // $('.testimonial-section--style-2').css('cursor', 'none');


})(jQuery);