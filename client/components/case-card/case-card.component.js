;
(function() {
	'use strict';

	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var selector = '[data-case-video-slider]';

		if (document.querySelector(selector)) {
			sliderInit(selector);
		}
	}

	function sliderInit(selector) {
		waitImages(selector);
	}

	function waitImages(selector) {
		$(selector).waitForImages(waitImagesHandler);

		function waitImagesHandler() {
			renderLoader(selector, false);
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

	function renderLoader(selector, insert) {
		var root = document.querySelector(selector);

		insert
			? root.insertAdjacentHTML('afterbegin', render())
			: root.removeChild(root.querySelector('[data-loader]'));

		function render() {
			return [
				'<div data-loader class="wj-loader">',
					'<svg class="circular" viewbox="25 25 50 50">',
						'<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>',
					'</svg>',
				'</div>'
			].join('');
		}
	}

})();
