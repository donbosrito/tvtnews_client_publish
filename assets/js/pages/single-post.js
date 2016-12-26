
jQuery(function($){
   "use strict";

   var SLZ = window.SLZ || {};


   /*=======================================
   =             MAIN FUNCTION             =
   =======================================*/

   SLZ.singlepostFunction = function(){
       $('.button-more').on('click', function () {
           $('.item.other-share-wrapper').toggleClass('activeOtherShare');
           $('.button-more .ic-more').toggleClass('hide');
           $('.button-more .share-text.more').toggleClass('hide');
           $('.button-more .ic-less').toggleClass('hide');
           $('.button-more .share-text.less').toggleClass('hide');
       });
   };

   /*======================================
   =            INIT FUNCTIONS            =
   ======================================*/

   $(document).ready(function(){
       SLZ.singlepostFunction();
   });

   /*======================================
   =          END INIT FUNCTIONS          =
   ======================================*/

});
