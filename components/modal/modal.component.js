;
(function (wjModal) {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		// инициализируем модальные окна
		wjModal.init();

		/*
		открыть программно окно
		wjModal.open(id), где id - это номер окна в атрибуте data-modal-target

		закрыть программно окно
		wjModal.close(id), где id - это номер окна в атрибуте data-modal-target
		*/
	}

})(wjModal);