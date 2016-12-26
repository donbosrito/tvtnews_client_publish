
jQuery(function($){
   "use strict";

   var SLZ = window.SLZ || {};


   /*=======================================
   =             MAIN FUNCTION             =
   =======================================*/

   SLZ.aboutusFunction = function(){
        $('.slider-our-clients').slick({
            dots: true,
            arrows: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
              {
                breakpoint: 481,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
              },
               {
                breakpoint: 321,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              }
            ]
          });

        $('.slider-feedbacks').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            // adaptiveHeight: true,
            fade: true
        });

        $('.feedback-wrapper .btn-slick-prev').click(function(){
            $(".slider-feedbacks").slick('slickPrev');
        });

        $('.feedback-wrapper .btn-slick-next').click(function(){
            $(".slider-feedbacks").slick('slickNext');
        });

        $('.statistics-item-figure').text('0');
        setTimeout(function() {
            $('.statistics-item-figure').appear(function() {
                var data_value = $(this).attr('data-value');
                $(this).countTo({
                    to: data_value,
                    speed: 3000,
                    refreshInterval: 100
                });
            });
        }, 1000);
        var heights_feeback_content = $('.feedback-wrapper .feedback-content').map(function() {
            return $(this).outerHeight();
        }).get(),

        maxHeight = Math.max.apply(null, heights_feeback_content);
        $('.feedback-wrapper .feedback-content').height(maxHeight);
        $('.feedback-wrapper .quotation').height($('.feedback-wrapper .feedback-content').height() - 15);

   };

   /*======================================
   =            INIT FUNCTIONS            =
   ======================================*/

   $(document).ready(function(){
       SLZ.aboutusFunction();
   });

   /*======================================
   =          END INIT FUNCTIONS          =
   ======================================*/

});
