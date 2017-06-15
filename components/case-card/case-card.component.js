;
(function() {
	'use strict';

	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		sliderInit('[data-case-video-slider]');
	}

	function sliderInit(selector) {
		waitImages(selector);
	}

	function waitImages(selector) {
		$(selector).waitForImages(waitImagesHandler);

		function waitImagesHandler() {
			showSlider(selector);
		}
	}

	function showSlider(selector) {
		var root = document.querySelector(selector),
				options = {
					infinite: true,
					speed: 300,
					autoplay: true,
					autoplaySpeed: 5000,
					arrows: false,
					pauseOnHover: false,
					dots: true
				};

		$(selector).slick(options);

		root.classList.contains('js-is-hide')
		? root.classList.remove('js-is-hide')
		: false;
	}

})();
