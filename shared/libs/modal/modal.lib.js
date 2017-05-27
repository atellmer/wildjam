;
var wjModal = (function () {

	var modal = {
		init: init,
		open: open,
		close: close
	};

	return modal;

	function init() {
		var btns = document.querySelectorAll('[data-modal-trigger]'),
				overlay = document.querySelector('.modals__overlay'),
				closeBtns = document.querySelectorAll('[data-modal-close]'),
				id,
				i;

		for (i = 0; i < btns.length; i++) {
			new Hammer(btns[i]).on('tap', clickModalBtnsHandler);
		}

		for (i = 0; i < closeBtns.length; i++) {
			id = Number(closeBtns[i]
				.closest('[data-modal-target]')
				.getAttribute('data-modal-target')
			);

			new Hammer(closeBtns[i]).on('tap', close.bind(null, [id]));
			new Hammer(overlay).on('tap', close.bind(null, [id]));
		}

		function clickModalBtnsHandler(ev) {
			var id,
					overlay = document.querySelector('.modals__overlay'),
					closeBtn;

			if (ev.target.hasAttribute('data-modal-trigger')) {
				id = ev.target.getAttribute('data-modal-trigger');
			} else {
				id = ev.target.closest('[data-modal-trigger]').getAttribute('data-modal-trigger');
			}

			closeBtn = document.querySelector('[data-modal-target="' + id + '"] [data-modal-close]');

			open(id);
		}
	}

	function open(id) {
		var overlay = document.querySelector('.modals__overlay'),
				target,
				closeBtn;

		target = document.querySelector('[data-modal-target="' + id + '"]');
		closeBtn = document.querySelector('[data-modal-target="' + id + '"] [data-modal-close]');

		overlay.setAttribute('data-modal-opened', id);

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

		_blockScroll();
	}

	function close(id) {
		var target = document.querySelector('[data-modal-target="' + id + '"]'),
				overlay = document.querySelector('.modals__overlay');

		overlay.removeAttribute('data-modal-opened');

		_toggleVisibility(target);
	}

	function _toggleVisibility(target) {
		var overlay = document.querySelector('.modals__overlay');

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

			setTimeout(function () {
				target.style.display = 'none';
				overlay.style.display = 'none';
			}, 500);

			_unblockScroll();
	}

	function _blockScroll() {
		var body = document.querySelector('body');

		if (_isScrollDesktop()) {
			body.style.paddingRight = '17px';
		}
		body.style.overflow = 'hidden';
	}

	function _unblockScroll() {
		var body = document.querySelector('body');

		body.style.overflow = 'auto';
		if (_isScrollDesktop()) {
			body.style.paddingRight = '0px';
		}
	}

	function _isScrollDesktop() {
		if (window.innerWidth !== document.documentElement.clientWidth) {
			return true;
		}

		return false;
	}

})();