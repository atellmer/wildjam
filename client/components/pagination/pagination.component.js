;
(function ($actions) {
	'use strict';

	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		fetchLazyItems();
	}

	function fetchLazyItems() {
		var lazyBox = document.querySelector('[data-lazy-box]'),
				url;

		if (lazyBox) {
			url = lazyBox.getAttribute('data-lazy-endpoint');

			$actions.fetchLazyItemsRequest(url);
		}
	}

})($actions);
