;
(function () {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var menuBtn = document.querySelector('#menuBtn'),
				menuIcon = document.querySelector('#menuBtnIcon'),
				menuContent = document.querySelector('#menuContent'),
				menuOverlay = document.querySelector('#menuOverlay'),
				hammerMenuBtn = new Hammer(menuBtn),
				hammerMenuOverlay = new Hammer(menuOverlay),
				click = 0;

		hammerMenuBtn.on('tap', clickMenuBtnHandler);
		hammerMenuOverlay.on('tap panleft', clickMenuOverlayHandler);

		function clickMenuBtnHandler() {
			click++;

			if (click % 2) {
				showMenuContent();
			} else {
				hideMenuContent();
			}
		}

		function clickMenuOverlayHandler() {
			click = 0;
			hideMenuContent();
		}

		function showMenuContent() {
			$(menuBtn).addClass('is-open');
			$(menuContent).css('transform', 'translateX(0px)');
			$(menuOverlay).css('display', 'block');
		}

		function hideMenuContent() {
			$(menuBtn).removeClass('is-open');
			$(menuContent).css('transform', 'translateX(-240px)');
			$(menuOverlay).css('display', 'none');
		}
	};
})();
