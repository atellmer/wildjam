;
var $actions = (function () {
	'use strict';

	var actions = {
		fetchLazyItemsRequest: null,
		fetchLazyItems: null,
		renderCard: null,
		renderPagination: null,
		setPaginationMetadata: null,
		setCurrentPage: null,
		setCardAnimation: null,

		openOrderModal: null,
		closeOrderModal: null,
		closeOrderModalHandler: null,
		tapSendOrderBtn: null,
		validateData: null,
		sendDataToServer: null,
		successOrderFinished: null,
		blockSendBtn: null,
		unblockSendBtn: null
	};

	return actions;

})();