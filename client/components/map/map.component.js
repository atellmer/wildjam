;
(function() {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		googleMapsInit();
	}

	function googleMapsInit() {
		var iconPath, mapStyles, markers, map, i, j;

		iconPath = './images/icons/location.png';
		mapStyles = [{
			"featureType": "water",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#d3d3d3"
			}]
		}, {
			"featureType": "transit",
			"stylers": [{
				"color": "#808080"
			}, {
				"visibility": "off"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.stroke",
			"stylers": [{
				"visibility": "on"
			}, {
				"color": "#b3b3b3"
			}]
		}, {
			"featureType": "road.highway",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#ffffff"
			}]
		}, {
			"featureType": "road.local",
			"elementType": "geometry.fill",
			"stylers": [{
				"visibility": "on"
			}, {
				"color": "#ffffff"
			}, {
				"weight": 1.8
			}]
		}, {
			"featureType": "road.local",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#d7d7d7"
			}]
		}, {
			"featureType": "poi",
			"elementType": "geometry.fill",
			"stylers": [{
				"visibility": "on"
			}, {
				"color": "#ebebeb"
			}]
		}, {
			"featureType": "administrative",
			"elementType": "geometry",
			"stylers": [{
				"color": "#a7a7a7"
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#ffffff"
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#ffffff"
			}]
		}, {
			"featureType": "landscape",
			"elementType": "geometry.fill",
			"stylers": [{
				"visibility": "on"
			}, {
				"color": "#efefef"
			}]
		}, {
			"featureType": "road",
			"elementType": "labels.text.fill",
			"stylers": [{
				"color": "#696969"
			}]
		}, {
			"featureType": "administrative",
			"elementType": "labels.text.fill",
			"stylers": [{
				"visibility": "on"
			}, {
				"color": "#737373"
			}]
		}, {
			"featureType": "poi",
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "on"
			}]
		}, {
			"featureType": "poi",
			"elementType": "labels",
			"stylers": [{
				"visibility": "on"
			}]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry.stroke",
			"stylers": [{
				"color": "#d6d6d6"
			}]
		}, {
			"featureType": "road",
			"elementType": "labels.icon",
			"stylers": [{
				"visibility": "on"
			}]
		}, {}, {
			"featureType": "poi",
			"elementType": "geometry.fill",
			"stylers": [{
				"color": "#dadada"
			}]
		}];

		markers = [{
				title: 'Москва, Нижний сусальный переулок, д. 5 стр. 10',
				lat: 55.7605962,
				lng: 37.6643733,
			}
		];

		map = new GMaps({
			el: '#googleMap',
			lat: markers[0].lat,
			lng: markers[0].lng,
			zoom: 14,
			//scrollwheel: false
		});

		map.addStyle({
			styledMapName: 'Styled Map',
			styles: mapStyles,
			mapTypeId: 'custom_style'
		});

		map.setStyle('custom_style');

		for (i = 0; i < markers.length; i++) {
			(function(i) {
				map.addMarker({
					lat: markers[i].lat,
					lng: markers[i].lng,
					title: markers[i].title,
					icon: iconPath
				});
			})(i);
		}
	}

})();
