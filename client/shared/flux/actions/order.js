;
(function ($, $store, $constants, $actions, wjModal) {
	'use strict';

	$actions.openOrderModal = openOrderModal;
	$actions.closeOrderModal = closeOrderModal;
	$actions.closeOrderModalHandler = closeOrderModalHandler;
	$actions.tapSendOrderBtn = tapSendOrderBtn;
	$actions.validateData = validateData;
	$actions.sendDataToServer = sendDataToServer;
	$actions.successOrderFinished = successOrderFinished;
	$actions.blockSendBtn = blockSendBtn;
	$actions.unblockSendBtn = unblockSendBtn;
	$actions.showFlashMessage = showFlashMessage;
	$actions.hideFlashMessage = hideFlashMessage;
	$actions.setInvalidFileds = setInvalidFileds;
	$actions.removeInvalidFileds = removeInvalidFileds;
	$actions.cleanInputs = cleanInputs;

	function openOrderModal(id) {
		$store.update('', {
			type: $constants['OPEN_MODAL_WINDOW_START'],
			data: id
		});

		wjModal.open(id);

		$store.update('', {
			type: $constants['OPEN_MODAL_WINDOW_END'],
			data: id
		});
	}

	function closeOrderModal(id) {
		$store.update('', {
			type: $constants['CLOSE_MODAL_WINDOW_START'],
			data: id
		});

		wjModal.close(id);

		$store.update('', {
			type: $constants['CLOSE_MODAL_WINDOW_END'],
			data: id
		});
	}

	function closeOrderModalHandler(id) {
		var btn = document.querySelector('[data-modal-target="' + id + '"] [data-modal-close]'),	
				overlay = document.querySelector('[data-modal-opened="' + id + '"]'),
				btnHammer, overlayHammer;

		btnHammer = new Hammer(btn).on('tap', tapHandler);
		overlayHammer = new Hammer(overlay).on('tap', tapHandler);
		
		function tapHandler(ev) {
			ev.preventDefault();

			closeOrderModal(id);
			btnHammer.off('tap', tapHandler);
			overlayHammer.off('tap', tapHandler);
		}
	}

	function tapSendOrderBtn(data) {
		$store.update('', {
			type: $constants['TAP_SEND_ORDER_BUTTON'],
			data: data
		});
	}

	function validateData(data) {
		var valid = true,
				errorFields = [],
				i;

		for (i in data) {
			if (data.hasOwnProperty(i)) {
				if (isEmpty(data[i])) {
					errorFields.push(i);
					valid = false;
				}
			}
		}

		if (valid) {
			$store.update('', {
				type: $constants['CLIENT_VALIDATION_DATA_SUCCEEDED'],
				data: data
			});
		} else {
			$store.update('', {
				type: $constants['CLIENT_VALIDATION_DATA_FAILED'],
				data: errorFields
			});
		}

		function isEmpty(data) {
			if (data === null || data === undefined || data === '') {
				return true;
			}

			return false;
		}
	}

	function sendDataToServer(data) {
		var id = $store.select('shared.modal.active'),
				url = document.querySelector('[data-modal-target="' + id + '"] [data-form-endpoint]')
					.getAttribute('data-form-endpoint');

		$store.update('', {
			type: $constants['SEND_DATA_TO_SERVER_START'],
			data: null
		});

		/*
		$store.update('', {
			type: $constants['SERVER_VALIDATION_DATA_FAILED'],
			data: ['name', 'email', 'phone']
		});
		*/
	
		$.ajax({
			url: url,
			type: 'POST',
    	crossDomain: true,
			data: data,
			dataType: 'json',
			success: function(data) {
				if (data.status === 'ok') {
					$store.update('', {
						type: $constants['SERVER_VALIDATION_DATA_SUCCEEDED'],
						data: null
					});
					$store.update('', {
						type: $constants['SEND_DATA_TO_SERVER_SUCCEEDED'],
						data: null
					});
				}
				if (data.status === 'error') {
					$store.update('', {
						type: $constants['SERVER_VALIDATION_DATA_FAILED'],
						data: data.fields
					});
				}
			},
			error: function(data) {
				$store.update('', {
					type: $constants['SEND_DATA_TO_SERVER_FAILED'],
					data: null
				});
			}
		});
	}

	function successOrderFinished() {
		var activeId = $store.select('shared.modal.active'),
				successId = $store.select('shared.modal.success'), 
				timeout;

		closeOrderModal(activeId);

		timeout = setTimeout(function() {
			openOrderModal(successId);

			$store.update('', {
				type: $constants['SUCCESS_ORDER_FINISHED'],
				data: null
			});

			clearTimeout(timeout);
		}, 500);
	}

	function blockSendBtn() {
		var id = $store.select('shared.modal.active'),
				btn = document.querySelector('[data-modal-target="' + id + '"] [data-modal-btn-send]');

		$store.update('', {
			type: $constants['BLOCK_SEND_BUTTON_START'],
			data: null
		});

		if (btn) {
			btn.innerHTML = renderButtonLoader('Отправка...');
			btn.setAttribute('disabled', '');
		}

		$store.update('', {
			type: $constants['BLOCK_SEND_BUTTON_END'],
			data: null
		});

		function renderButtonLoader(text) {
			return [
				'<div class="loader">',
					'<svg class="circular" viewbox="25 25 50 50">',
						'<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>',
					'</svg>',
				'</div>',
				'<span>' + text + '</span>'
			].join('');
		}
	}

	function unblockSendBtn() {
		var id = $store.select('shared.modal.active'),
				btn = document.querySelector('[data-modal-target="' + id + '"] [data-modal-btn-send]');

		$store.update('', {
			type: $constants['UNBLOCK_SEND_BUTTON_START'],
			data: null
		});

		if (btn) {
			btn.innerHTML = renderContentButton('Отправить');
			btn.removeAttribute('disabled');
		}

		$store.update('', {
			type: $constants['UNBLOCK_SEND_BUTTON_END'],
			data: null
		});

		function renderContentButton(text) {
			return [
				'<span>' + text + '</span>'
			].join('');
		}
	}

	function showFlashMessage() {
		var target = document.querySelector('[data-form="order"] [data-flash-container]');

		$store.update('', {
			type: $constants['SHOW_FLASH_MESSAGE_START'],
			data: null
		});

		if (target) {
			target.innerHTML = renderFlashMessage('Проверьте правильность заполнения полей');
		}

		$store.update('', {
			type: $constants['SHOW_FLASH_MESSAGE_END'],
			data: null
		});

		function renderFlashMessage(text) {
			return [
				'<div class="flash-message">' + text + '</div>'
			].join('');
		}
	}

	function hideFlashMessage() {
		var target = document.querySelector('[data-form="order"] [data-flash-container]');

		$store.update('', {
			type: $constants['HIDE_FLASH_MESSAGE_START'],
			data: null
		});

		if (target) {
			target.innerHTML = '';
		}

		$store.update('', {
			type: $constants['HIDE_FLASH_MESSAGE_END'],
			data: null
		});
	}

	function setInvalidFileds(data) {
		var target = document.querySelector('[data-form="order"]'),
				i;

		$store.update('', {
			type: $constants['SET_INVALID_FIELDS_START'],
			data: null
		});

		for (i = 0; i < data.length; i++) {
			if (target[data[i]] && !target[data[i]].classList.contains('js-is-invalid')) {
				target[data[i]].classList.add('js-is-invalid');
			}
		}

		$store.update('', {
			type: $constants['SET_INVALID_FIELDS_END'],
			data: null
		});
	}

	function removeInvalidFileds() {
		var targets = document.querySelectorAll('[data-form="order"] [name]'),
				i;

		$store.update('', {
			type: $constants['REMOVE_INVALID_FIELDS_START'],
			data: null
		});

		for (i = 0; i < targets.length; i++) {
			if (targets[i] && targets[i].classList.contains('js-is-invalid')) {
				targets[i].classList.remove('js-is-invalid');
			}
		}

		$store.update('', {
			type: $constants['REMOVE_INVALID_FIELDS_END'],
			data: null
		});
	}

	function cleanInputs() {
		var targets = document.querySelectorAll('[data-form="order"] [name]'),
				i;

		for (i = 0; i < targets.length; i++) {
			targets[i].value = '';
		}

		$store.update('', {
			type: $constants['CLEAN_INPUTS_START'],
			data: null
		});

		$store.update('', {
			type: $constants['CLEAN_INPUTS_END'],
			data: null
		});
	}

})($, $store, $constants, $actions, wjModal);
