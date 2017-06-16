;
(function() {
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var counterAreas = document.querySelectorAll('[data-case-stats-area]');

		if (counterAreas.length > 0) {
			caseStatsComponentInit();
		}
	}

	function caseStatsComponentInit() {
		var counterAreas = document.querySelectorAll('[data-case-stats-area]'),
				flag = true,
				i;

		document.addEventListener('scroll', scrollHandler);

		function scrollHandler(ev) {
			var scrollPosition = document.documentElement.scrollTop,
					i;

			if (flag) {
				for (i = 0; i < counterAreas.length; i++) {
					if (isVisibleSection(i)) {
						animateCounters();
					}
				}
			}
		}

		function animateCounters() {
			var attr = 'data-stats-counter',
					counters = document.querySelectorAll('[' + attr + ']'),
					i;

			for (i = 0; i < counters.length; i++) {
				startCounter(counters[i].getAttribute('id'), 0, counters[i].getAttribute(attr));
			}

			flag = false;

			function startCounter(id, start, end) {
				var options = {
					useEasing : true, 
					useGrouping : true, 
					separator : ' ', 
					decimal : '.', 
					suffix: ' +'
				};
	
				new CountUp(id, Number(start), Number(end), 0, 2.5, options).start();
			}
		}

		function getStaticTopCoords(id) {
			var top = counterAreas[id].getBoundingClientRect().top;

			return top + window.pageYOffset;
		}

		function isVisibleSection(id) {
			var elScrollStart = getStaticTopCoords(id),
					elScrollEnd = elScrollStart + counterAreas[id].clientHeight,
					scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

			if (scrollPosition >= elScrollStart - 100 && scrollPosition < elScrollEnd) {
				return true;
			}
			
			return false;
		}
	}

})();
