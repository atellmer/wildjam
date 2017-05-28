;
(function ($actions, wjModal) {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		wjModal.init();
		openOrderModalBtnInit(1);
		sendOrderBtnInit();
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

	function sendOrderBtnInit() {
		var btn = document.querySelector('[data-modal-btn-send="order"]'),
				form = document.querySelector('[data-form="order"]');

		//new Hammer(btn).on('tap', tapHandler);
		// for cursor: not-allowed;, without pointer-events: none;
		btn.addEventListener('click', tapHandler);

		function tapHandler(ev) {

			$actions.tapSendOrderBtn({
				name: encodeURIComponent(form.name.value),
				email: encodeURIComponent(form.email.value),
				phone: encodeURIComponent(form.phone.value),
				message: encodeURIComponent(form.message.value)
			});
		}
	}

})($actions, wjModal);
