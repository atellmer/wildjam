;
(function () {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		modalInit();
	}

	function modalInit() {
		var btns = document.querySelectorAll('[data-modal-trigger]'),
				overlay = document.querySelector('.modals__overlay'),
				hammerOverlay,
				hammerCloseBtn,
				i;

		for (i = 0; i < btns.length; i++) {
			new Hammer(btns[i]).on('tap', clickModalBtnsHandler);
		}

		function clickModalBtnsHandler(ev) {
			var id, target, closeBtn, i;

			if (ev.target.hasAttribute('data-modal-trigger')) {
				id = ev.target.getAttribute('data-modal-trigger');
			} else {
				id = ev.target.closest('[data-modal-trigger]').getAttribute('data-modal-trigger');
			}

			target = document.querySelector('[data-modal-target="' + id + '"]');
			closeBtn = document.querySelector('[data-modal-target="' + id + '"] [data-modal-close]');

			hammerOverlay = new Hammer(overlay).on('tap', clickCloseBtnHandler);
			hammerCloseBtn = new Hammer(closeBtn).on('tap', clickCloseBtnHandler);

			target.style.display = 'block';
			overlay.style.display = 'block';

			if (target.classList.contains('js-is-close')) {
				target.classList.remove('js-is-close');
			}

			if (overlay.classList.contains('js-is-close')) {
				overlay.classList.remove('js-is-close');
			}

			if (!target.classList.contains('js-is-open')) {
				target.classList.add('js-is-open');
			}

			if (!overlay.classList.contains('js-is-open')) {
				overlay.classList.add('js-is-open');
			}

			blockScroll();

			function clickCloseBtnHandler() {
				if (!target.classList.contains('js-is-close')) {
					target.classList.add('js-is-close');
				}

				if (!overlay.classList.contains('js-is-close')) {
					overlay.classList.add('js-is-close');
				}

				if (target.classList.contains('js-is-open')) {
					target.classList.remove('js-is-open');
				}

				if (overlay.classList.contains('js-is-open')) {
					overlay.classList.remove('js-is-open');
				}

				setTimeout(function() {
					target.style.display = 'none';
					overlay.style.display = 'none';
				}, 500);

				unblockScroll();
			}
		}

		function blockScroll() {
			var body = document.querySelector('body');

			if (isScrollDesktop()) {
				body.style.paddingRight = '17px';
			}
			body.style.overflow = 'hidden';
		}

		function unblockScroll() {
			var body = document.querySelector('body');

			body.style.overflow = 'auto';
			if (isScrollDesktop()) {
				body.style.paddingRight = '0px';
			}
		}

		function isScrollDesktop() {
			if (window.innerWidth !== document.documentElement.clientWidth) {
				return true;
			}

			return false;
		}
	}

})();