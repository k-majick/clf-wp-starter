<<<<<<< Updated upstream
(function($) {
  $.fn.GeoLocation = function(options) {

    var myLongitude = $('input[name=longitude]').val(),
      myLatitude = $('input[name=latitude]').val(),
      place_name = $('input[name=place_name]').val(),
      place_address = $('input[name=place_address]').val();

    var settings = $.extend({
      home: {
        latitude: myLatitude,
        longitude: myLongitude
      },
    }, options);

    var home = new google.maps.LatLng(settings.home.latitude, settings.home.longitude);

    return this.each(function() {
      var element = $(this),
        msg = $('.message'),
        loc = $('.location'),
        add = $('.address');
      msg.text('Ustalam lokalizację');

      function displayCurrentPosition(data) {
        loc.html('<div class="map-canvas"></div>');
        add.html(place_name + '<br>' + place_address);

        var current = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);

        var options = {
          center: current,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoom: 10,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          styles: [{
              "featureType": "all",
              "elementType": "labels.text",
              "stylers": [{
                  "weight": "0.01"
                },
                {
                  "saturation": "-100"
                },
                {
                  "lightness": "100"
                },
                {
                  "visibility": "simplified"
                },
                {
                  "color": "#007aa7"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [{
                "color": "#444444"
              }]
            },
            {
              "featureType": "administrative.country",
              "elementType": "geometry.stroke",
              "stylers": [{
                  "saturation": "1"
                },
                {
                  "weight": "0.43"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text",
              "stylers": [{
                "visibility": "on"
              }]
            },
            {
              "featureType": "administrative.province",
              "elementType": "geometry.stroke",
              "stylers": [{
                  "weight": "0.01"
                },
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [{
                "color": "#f2f2f2"
              }]
            },
            {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [{
                "visibility": "off"
              }]
            },
            {
              "featureType": "road",
              "elementType": "all",
              "stylers": [{
                  "saturation": -100
                },
                {
                  "lightness": 45
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [{
                "visibility": "off"
              }]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [{
                "visibility": "off"
              }]
            },
            {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [{
                "visibility": "off"
              }]
            },
            {
              "featureType": "water",
              "elementType": "all",
              "stylers": [{
                  "color": "#46bcec"
                },
                {
                  "visibility": "on"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [{
                "visibility": "on"
              }]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [{
                  "color": "##000000"
                },
                {
                  "lightness": "60"
                }
              ]
            }
          ]
        };

        var map = new google.maps.Map(element[0], options);

        var directions = {
          origin: current,
          destination: home,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        var display = new google.maps.DirectionsRenderer({
          map: map
        });

        var service = new google.maps.DirectionsService();
        service.route(directions, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            display.setDirections(response);
          } else
            msg.text('Niepowodzenie przy pobraniu wskazówek');
        });
      }

      function onError(error) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg.text('Dostęp do API zablokowany przez użytkownika');
            break;
          case error.POSITION_UNAVAILABLE:
            msg.text('Nie można zlokalizować pozycji');
            break;
          case error.TIMEOUT:
            msg.text('Nie można zlokalizować pozycji, termin żądania minął');
            break;
          case error.UNKNOWN_ERROR:
            msg.text('Wystąpił nieznany błąd');
            break;
        }
      }

      var opts = {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 0
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayCurrentPosition, onError, opts);
      } else {
        msg.text('Geolokalizacja nie jest dostępna dla Twojej przeglądarki. Wykonaj aktualizację i spróbuj ponownie.');
      }
    });

  };

}(jQuery));

$(document).ready(function() {
  $('div.location').GeoLocation();
});
=======
>>>>>>> Stashed changes
