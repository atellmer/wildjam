;
(function ($actions, wjModal) {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		activateForms();
	}

	function activateForms() {
		var btns = document.querySelectorAll('[data-form-btn-send]'),
				i;

		for (i = 0; i < btns.length; i++) {
			btns[i].addEventListener('click', formHandler);
		}
	}

	function formHandler(ev) {
		var formName = ev.target.closest('[data-form]').getAttribute('data-form');

		$actions.tapSendBtn(formName);
	}

})($actions, wjModal);
