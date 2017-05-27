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
				errorFields = {};

		/*TODO*/

		if (valid) {
			$store.update('', {
				type: $constants['VALIDATION_DATA_SUCCEEDED'],
				data: data
			});
		} else {
			$store.update('', {
				type: $constants['VALIDATION_DATA_FAILED'],
				data: errorFields
			});
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
		$.ajax({
			url: url,
			type: 'POST',
    	crossDomain: true,
			data: data,
			success: function(data) {
				$store.update('', {
					type: $constants['SEND_DATA_TO_SERVER_SUCCEEDED'],
					data: null
				});
			},
			error: function(data) {
				$store.update('', {
					type: $constants['SEND_DATA_TO_SERVER_FAILED'],
					data: null
				});
			}
		});
		*/
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

		renderButtonLoader(btn, 'Отправка...');
		btn.setAttribute('disabled', '');

		$store.update('', {
			type: $constants['BLOCK_SEND_BUTTON_END'],
			data: null
		});

		function renderButtonLoader(target, text) {
			var template;

			template = [
				'<div class="loader">',
					'<svg class="circular" viewbox="25 25 50 50">',
						'<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10"/>',
					'</svg>',
				'</div>',
				'<span>' + text + '</span>'
			].join('');

			target.innerHTML = template;
		}
	}

	function unblockSendBtn() {
		var id = $store.select('shared.modal.active'),
				btn = document.querySelector('[data-modal-target="' + id + '"] [data-modal-btn-send]');

		$store.update('', {
			type: $constants['UNBLOCK_SEND_BUTTON_START'],
			data: null
		});

		renderContentButton(btn, 'Отправить');
		btn.removeAttribute('disabled');

		$store.update('', {
			type: $constants['UNBLOCK_SEND_BUTTON_END'],
			data: null
		});

		function renderContentButton(target, text) {
			var template;

			template = [
				'<span>' + text + '</span>'
			].join('');

			target.innerHTML = template;
		}
	}

})($, $store, $constants, $actions, wjModal);
