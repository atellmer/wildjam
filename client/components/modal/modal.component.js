;
(function (wjModal) {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		wjModal.init();
		sendBtnInit();
	}

	function sendBtnInit() {
		var btns = document.querySelectorAll('[data-modal-btn-send]'),
				i;

		for (i = 0; i < btns.length; i++) {
			new Hammer(btns[i]).on('tap', tapHandler);
		}

		function tapHandler(ev) {
			ev.preventDefault();

			wjModal.close(1);

			var timeout = setTimeout(function() {
				wjModal.open(2);

				clearTimeout(timeout);
			}, 1000);
		}
	}

})(wjModal);