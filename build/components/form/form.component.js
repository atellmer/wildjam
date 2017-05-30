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
		var formName = ev.target.closest('[data-form]').getAttribute('data-form'),
				form = document.querySelector('[data-form="' + formName + '"]'),
				fields = [],
				data = {},
				i;

		if (form) {
			fields = form.querySelectorAll('[name]');
		}

		for (i = 0; i < fields.length; i++) {
			data[fields[i].getAttribute('name')] = encodeURIComponent(fields[i].value);
		}

		$actions.tapSendBtn(data, formName);
	}

})($actions, wjModal);
