;
(function() {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var btn = document.querySelector('[data-scroll-btn]');

		if (btn) {
			scrollBtnInit();
		}
	}

	function scrollBtnInit() {
		var scrollBtn = document.querySelector('[data-scroll-btn]'),
				scrollTarget = document.querySelector('[data-scroll-target=' + '\"2\"' + ']');

		new Hammer(scrollBtn).on('tap', tapHandler);

		function tapHandler() {
			$('html, body').stop().animate({
					scrollTop: $(scrollTarget).offset().top
			}, 500);
		}
	}

})();
