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
			case $constants['TAP_SEND_ORDER_BUTTON']:
				{
					$store.update('shared.order.metadata', {
						type: $constants['WRITE_ORDER_DATA_START'],
						data: action.data
					});
					$store.update('', {
						type: $constants['WRITE_ORDER_DATA_END'],
						data: action.data
					});

					break;
				}

			default: return;
		}
	}

	function validationEffect(store, action) {
		switch (action.type) {
			case $constants['WRITE_ORDER_DATA_END']:
				{
					$store.update('', {
						type: $constants['VALIDATION_DATA_REQUESTED'],
						data: action.data
					});

					break;
				}
			case $constants['VALIDATION_DATA_REQUESTED']:
				{
					$actions.validateData(action.data);

					break;
				}

			case $constants['VALIDATION_DATA_SUCCEEDED']:
				{
					$store.update('', {
						type: $constants['SEND_DATA_TO_SERVER_REQUESTED'],
						data: action.data
					});

					break;
				}

			case $constants['VALIDATION_DATA_FAILED']:
				{
					/*TODO*/

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
