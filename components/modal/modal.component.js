;
(function ($actions, wjModal) {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		wjModal.init();
		openOrderModalBtnInit(0);
	}


	function openOrderModalBtnInit(id) {
		var btns = document.querySelectorAll('[data-modal-trigger="' + id + '"]'),
				i;

		for (i = 0; i < btns.length; i++) {
			new Hammer(btns[i]).on('tap', tapHandler);
		}

		function tapHandler(ev) {
			ev.preventDefault();

			$actions.openOrderModal(id);
		}
	}

})($actions, wjModal);
