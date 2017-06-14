;
(function() {
	'use strict';

	window.addEventListener('load', ready);

	function ready() {
		var slider = $('[data-case-video-slider]');

		if (slider) {
			slider.slick({
				infinite: true,
				speed: 300,
				autoplay: true,
				autoplaySpeed: 5000,
				arrows: false,
				pauseOnHover: false,
				dots: true
			});

			renderDotsSign();
		}
	}

	function renderDotsSign() {
		var root = document.querySelector('[data-case-video-slider]'),
				dots, list, count,
				sign = ' рекламных роликов: ';

		if (root) {
			list = root.querySelectorAll('[data-case-video-item]');
			dots = root.querySelector('.slick-dots'),
			count = list.length - 2;

			count < 5 ? sign = ' рекламных ролика: ' : sign = sign;

			if (dots) {
				dots.insertAdjacentHTML('beforebegin', render({
					sign: count + sign
				}));
			}

			root.classList.contains('js-is-hide') ? root.classList.remove('js-is-hide') : false;
		}

		function render(props) {
			return [
				'<span class="case-card__dots-sign">',
					props.sign,
				'</span>'
			].join('');
		}
	}


})();