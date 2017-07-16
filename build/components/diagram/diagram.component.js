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
		barChartInit(root);
		pieChartInit(root);
	}

	function barChartInit(root) {
		var canvas = root.querySelector('[data-diagram-barchart]');
		var ctx = canvas.getContext('2d');

		var data = {
			labels: ['13-17', '18-24', '25-34', '35+'],
			datasets: [
				{
					label: 'Мужчины',
					data: [15, 30.5, 19.7, 11.8],
					backgroundColor: 'rgba(62, 188, 255, 0.8)',
					borderColor: 'rgba(1, 176, 220, 1)',
					borderWidth: 1
				},
				{
					label: 'Женщины',
					data: [4.4, 10, 8.5, 2.1],
					backgroundColor: 'rgba(84, 43, 126, 0.8)',
					borderColor: 'rgba(84, 43, 126, 1)',
					borderWidth: 1
				}
			]
		};

		var chart = new Chart(ctx, {
			type: 'bar',
			options: {
				legend: {
					display: false
				},
				tooltips: {
					callbacks: {
						label: function(tooltip) {
							return formatTooltip(data, tooltip)
						}
					}
				},
				scales: {
					yAxes: [{
						ticks: {
							callback: function(value, index, values) {
								return value + '%';
							},
							min: 0,
							beginAtZero: true
						}
					}]
				}
			},
			data: data
		});

		function formatTooltip(data, tooltip) {
			return data.datasets[tooltip.datasetIndex].label + ': ' + tooltip.yLabel + '%';
		}
	}

	function pieChartInit(root) {
		var canvas = root.querySelector('[data-diagram-piechart]');
		var ctx = canvas.getContext('2d');

		var data = {
			labels: ['13-17', '18-24', '25-34', '35+'],
			datasets: [
				{
					label: 'Группа',
					data: [19.4, 40.5, 28.2, 13.9],
					backgroundColor: [
						'rgba(156, 39, 176, 0.8)',
						'rgba(244, 67, 54, 0.8)',
						'rgba(76, 175, 80, 0.8)',
						'rgba(33, 150, 243, 0.8)'
					]
				}
			]
		};

		var chart = new Chart(ctx, {
			type: 'pie',
			options: {
				legend: {
					display: false
				},
				tooltips: {
					callbacks: {
						label: function(tooltip) {
							return formatTooltip(data, tooltip);
						}
					}
				},
				pieceLabel: {
					mode: 'label',
					fontSize: 15,
					fontStyle: 'bold',
					fontColor: '#fff',
					fontFamily: '"Gotham Pro", Monaco, monospace'
				}
			},
			data: data
		});

		function formatTooltip(data, tooltip) {
			return (data.datasets[tooltip.datasetIndex].label + ' ' + data.labels[tooltip.index] + 
				' лет: ' + data.datasets[tooltip.datasetIndex].data[tooltip.index] + '%');
		}
	}

})();