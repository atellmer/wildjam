;
(function () {
	'use strict';
	document.addEventListener('DOMContentLoaded', ready);

	function ready() {
		var root = document.querySelector('[data-diagram]');

		if (root) {
			diagramInit(root);
		}
	}

	function diagramInit(root) {
		horizontalBarChartInit(root);
	}

	function horizontalBarChartInit(root) {
		var canvas = root.querySelector('[data-diagram-horizontal-barchart]');
		var ctx = canvas.getContext('2d');

		var data = {
			labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
			datasets: [
				{
					label: 'Мужчины',
					data: $diagramData.men,
					backgroundColor: 'rgba(62, 188, 255, 0.3)',
					borderColor: 'rgba(62, 188, 255, 0.4)',
					hoverBackgroundColor: 'rgba(62, 188, 255, 0.5)',
					borderWidth: 1
				},
				{
					label: 'Женщины',
					data: $diagramData.women,
					backgroundColor: 'rgba(84, 39, 127, 0.3)',
					borderColor: 'rgba(84, 39, 127, 0.4)',
					hoverBackgroundColor: 'rgba(84, 39, 127, 0.5)',
					borderWidth: 1
				}
			]
		};

		var chart = new Chart(ctx, {
			type: 'horizontalBar',
			options: {
				legend: {
					display: false
				},
				scales: {
					xAxes: [
						{
							ticks: {
								callback: formatTicks
							},
							stacked: true
						}
					],
					yAxes: [
						{
							stacked: true
						}
					]
				},
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: formatTooltip
					}
        }
			},
			data: data
		});

		function formatTicks(label, index, labels) {
			return Math.abs(label) + '%';
		}

		function formatTooltip(tooltipItems, data) {
			if (tooltipItems.xLabel < 0) {
				return Math.abs(tooltipItems.xLabel) + '% (мужчины)';
			}

			return Math.abs(tooltipItems.xLabel) + '% (женщины)';
		}
	}

})();
