;
(function ($actions) {
	'use strict';

	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		fetchBlogers();
	}

	function fetchBlogers() {
		var lazyBox = document.querySelector('[data-lazy-box]'),
				url;

		if (lazyBox) {
			url = lazyBox.getAttribute('data-lazy-endpoint');

			$actions.fetchBloggersRequest(url);
		}
	}

})($actions);
