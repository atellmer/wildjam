;
(function() {

	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var slider = $('[data-bloger-slider]');

		if (slider) {
			slider.slick({
				infinite: true,
				speed: 300,
				autoplay: true,
				autoplaySpeed: 5000,
				arrows: false,
				pauseOnHover: false
			});
		}
	}

})();