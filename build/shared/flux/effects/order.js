;
(function (SpawnEffects, $store, $constants, $actions) {
	'use strict';

	var effects = {
		modalControlEffect: modalControlEffect,
		validationEffect: validationEffect,
		sendDataToServerEffect: sendDataToServerEffect
	};

	SpawnEffects.effects.run(effects.modalControlEffect);
	SpawnEffects.effects.run(effects.validationEffect);
	SpawnEffects.effects.run(effects.sendDataToServerEffect);

	function modalControlEffect(store, action) {
		switch (action.type) {
			case $constants['OPEN_MODAL_WINDOW_END']:
				{
					$store.update('shared.modal.active', {
						type: $constants['SET_ACTIVE_MODAL_WINDOW_START'],
						data: action.data
					});
					$store.update('', {
						type: $constants['SET_ACTIVE_MODAL_WINDOW_END'],
						data: action.data
					});
					
					break;
				}
			case $constants['SET_ACTIVE_MODAL_WINDOW_END']:
				{
					$actions.closeOrderModalHandler(action.data);

					break;
				}
			case $constants['TAP_SEND_BUTTON']:
				{
					$store.update('shared.form.active', {
						type: $constants['SET_ACTIVE_FORM_START'],
						data: action.data
					});
					$store.update('', {
						type: $constants['SET_ACTIVE_FORM_END'],
						data: null
					});
					$store.update('', {
						type: $constants['CLIENT_VALIDATION_FORM_REQUESTED'],
						data: null
					});

					break;
				}

			default: return;
		}
	}

	function validationEffect(store, action) {
		switch (action.type) {
			case $constants['CLIENT_VALIDATION_FORM_REQUESTED']:
				{
					$actions.removeInvalidFileds();
					$actions.validateForm();

					break;
				}

			case $constants['CLIENT_VALIDATION_FORM_SUCCEEDED']:
				{
					$actions.hideFlashMessage();

					$store.update('shared.order.metadata', {
						type: $constants['WRITE_ORDER_DATA_START'],
						data: action.data
					});
					$store.update('', {
						type: $constants['WRITE_ORDER_DATA_END'],
						data: null
					});
					$store.update('', {
						type: $constants['SEND_DATA_TO_SERVER_REQUESTED'],
						data: action.data
					});

					break;
				}

			case $constants['CLIENT_VALIDATION_FORM_FAILED']:
				{
					$actions.showFlashMessage();
					$actions.setInvalidFileds(action.data);

					break;
				}

			case $constants['SERVER_VALIDATION_DATA_FAILED']:
				{
					$actions.unblockSendBtn();
					$actions.showFlashMessage();
					$actions.setInvalidFileds(action.data);

					break;
				}

			default: return;
		}
	}

	function sendDataToServerEffect(store, action) {
		switch (action.type) {
			case  $constants['SEND_DATA_TO_SERVER_REQUESTED']:
			{
				$actions.sendDataToServer(action.data);

				break;
			}
			case  $constants['SEND_DATA_TO_SERVER_START']:
			{
				$actions.blockSendBtn();

				break;
			}
			case  $constants['SEND_DATA_TO_SERVER_SUCCEEDED']:
			{
				$actions.unblockSendBtn();
				$actions.cleanInputs();
				$actions.successOrderFinished();

				break;
			}
			case  $constants['SEND_DATA_TO_SERVER_FAILED']:
			{
				$actions.unblockSendBtn();
				break;
			}

			default: return;
		}
	}

})(SpawnEffects, $store, $constants, $actions);
