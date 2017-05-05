;
(function() {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var btns = document.querySelectorAll('[data-dots-component-btn]');

		if (btns.length > 0) {
			dotsComponentInit();
		}
	}

	function dotsComponentInit() {
		var dotsBtns = document.querySelectorAll('[data-dots-component-btn]'),
				scrollTargets = document.querySelectorAll('[data-scroll-target]'),
				i;

		for (i = 0; i < dotsBtns.length; i++) {
			new Hammer(dotsBtns[i]).on('tap', tapHandler);
		}

		document.addEventListener('scroll', scrollHandler);

		function scrollHandler(ev) {
			var scrollPosition = document.documentElement.scrollTop,
					i;

			for (i = 0; i < scrollTargets.length; i++) {
				if (isVisibleSection(i)) {
					setActiveBtn(i + 1);
				}
			}
		}

		function tapHandler(ev) {
			var id = Number(ev.target.getAttribute('data-dots-component-btn'));

			scrollTo(id);
		}

		function scrollTo(id) {
			var target = document.querySelector('[data-scroll-target=' + '\"' + id + '\"' + ']'),
					shift = $(target).offset().top;

			$('html, body').stop().animate({
					scrollTop: shift
			}, 500);
		}

		function setActiveBtn(id) {
			var i;

			for (i = 0; i < dotsBtns.length; i++) {
				if (dotsBtns[i].classList.contains('js-is-active')) {
					dotsBtns[i].classList.remove('js-is-active');
				}
				if (Number(dotsBtns[i].getAttribute('data-dots-component-btn')) === id) {
					dotsBtns[i].classList.add('js-is-active');
				}
			}
		}

		function getStaticTopCoords(id) {
			var top = scrollTargets[id].getBoundingClientRect().top;

			return top + window.pageYOffset;
		}


		function isVisibleSection(id) {
			var elScrollStart = getStaticTopCoords(id),
					elScrollEnd = elScrollStart + scrollTargets[id].clientHeight,
					scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

			if (scrollPosition >= elScrollStart - 100 && scrollPosition < elScrollEnd) {
				return true;
			}
			
			return false;
		}
	}

})();
