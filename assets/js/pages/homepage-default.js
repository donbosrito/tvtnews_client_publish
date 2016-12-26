jQuery(function($) {
    "use strict";

    var SLZ = window.SLZ || {};

    /*=======================================
    =             MAIN FUNCTION             =
    =======================================*/

    SLZ.mainFunction = function() {

        var html = "";
        $.simpleWeather({
            location: 'New York',
            woeid: '',
            unit: 'c',
            success: function(weather) {
                html = '<div class="weather-icons"><i class="icon-weather icon-'+weather.code+'"></i></div><div class="weather-info"><div class="weather-temp"> '
                    + weather.temp +'<sup>&deg;'+ weather.units.temp +'</sup></div><div class="weather-region">'+weather.city+
                    ', '+weather.region+'</div></div>';

                $("#travel-weather").html(html);
            },
            error: function(error) {
                $("#travel-weather").html('<div class="weather-error">'+ error +'</div>');
            }
        });
    };


    /*======================================
    =            INIT FUNCTIONS            =
    ======================================*/

    $(document).ready(function() {
        SLZ.mainFunction();
    });

    /*=====  End of INIT FUNCTIONS  ======*/

    $(window).on('load', function() {

    });


});
