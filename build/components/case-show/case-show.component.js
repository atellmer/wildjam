;
(function() {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var root = document.querySelector('[data-case-show]');

		if (root) {
			caseShowInit(root);
		}
	}

	function caseShowInit(root) {
		var btn = document.querySelector('[data-case-show-btn="0"]');
		var items = root.querySelectorAll('[data-case-show-item]');
		var COUNT = 3;
		var i;

		new Hammer(btn).on('tap', tapHandler);

		function tapHandler(ev) {
			var count = 0;
			var targetClassName = 'js-is-hide';
			var animationClassName = 'js-is-animatable'

			for (i = 0; i < items.length; i++) {
				if (items[i].classList.contains(targetClassName)) {
					items[i].classList.remove(targetClassName)
					items[i].classList.add(animationClassName);
					count++;

					if (i === items.length - 1) {
						btn.style.display='none';
					}

					if (count >= COUNT) {
						break;
					}
				}
			}
		}
	}
})();
