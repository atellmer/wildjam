;
(function() {

	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var scrollbars = $('[data-custom-scrollbar]');

		if (scrollbars) {
			scrollbars.mCustomScrollbar({
				theme: 'dark'
			});
		}
	}

})();