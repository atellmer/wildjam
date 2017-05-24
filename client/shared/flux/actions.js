;
var $actions = (function ($, $store, $constants) {
	'use strict';

	var actions = {
		fetchBloggersRequest: fetchBloggersRequest,
		fetchBloggers: fetchBloggers,
		updateBlogers: updateBlogers,
		renderBlogerCard: renderBlogerCard,
		renderPagination: renderPagination
	};

	return actions;

	function fetchBloggersRequest(url) {
		$store.update('', {
			type: $constants['FETCH_BLOGERS_REQUESTED'],
			data: url
		});
	}

	function fetchBloggers(url) {
		$.ajax({
			url: url,
			type: 'GET',
    	crossDomain: true,
			dataType: 'json',
			success: function(data) {
				$store.update('', {
					type: $constants['FETCH_BLOGERS_SUCCEEDED'],
					data: data.bloggers
				});
			},
			error: function() {
				$store.update('', {
					type: $constants['FETCH_BLOGERS_FAILED'],
					data: null
				});
			}
		});
	}

	function updateBlogers(data) {
		$store.update('shared.blogers', {
			type: $constants['FETCH_BLOGERS_UPDATED'],
			data: data
		});
	}

	function renderBlogerCard() {
		render({
			name: 'Лиззтв',
			link: '#',
			pic: './images/pages/bloger-detail/blogers/1.jpg',
			youtubeLink: '#',
			youtubeSubs: '2 742 800+',
			vkLink: '#',
			vkAddress: 'kate_clapp',
			vkSubs: '1.6+ млн.',
			instaLink: '#',
			instaAddress: 'kate_clapp',
			instaSubs: '1.6+ млн.'
		});

		$store.update('', {
			type: $constants['RENDER_BLOGER_CARD'],
			data: null
		});

		function render(data) {
			var box = document.querySelector('[data-lazy-box]'),
					html;

			html = [
				'<div aria-haspopup="true" class="bloger-detail__card card">',
					'<div class="card__title">',
						'<a href="' + data.link + '" class="card__link">'+ data.name + '</a>',
					'</div>',
					'<a href="' + data.link + '" class="card__link">',
						'<div class="card__cover">',
							'<img src="'+ data.pic +'" class="card__pic" alt="' + data.name + '">',
						'</div>',
					'</a>',
					'<div class="card__desc">',
						'<a href="' + data.youtubeLink + '" target="_blank" rel="noopener" class="card__info">',
							'<i class="icon icon-yt card__info-icon card__social-icon"></i>',
							'<div class="card__info-stats">',
								'<div class="card__info-count">' + data.youtubeSubs + '</div>',
								'<div class="card__info-sign">подписчиков</div>',
							'</div>',
						'</a>',
						'<div class="card__social">',
							'<a href="' + data.vkLink + '" target="_blank" rel="noopener" class="card__social-link">',
								'<i class="icon icon-vk card__social-icon"></i>',
								'<div class="card__social-detail">',
									'<div class="card__social-address">' + data.vkAddress + '</div>',
									'<div class="card__social-subs">' + data.vkSubs + '</div>',
								'</div>',
							'</a>',
							'<a href="' + data.instaLink + '" target="_blank" rel="noopener" class="card__social-link">',
								'<i class="icon icon-insta card__social-icon"></i>',
								'<div class="card__social-detail">',
									'<div class="card__social-address">' + data.instaAddress + '</div>',
									'<div class="card__social-subs">' + data.instaSubs + '</div>',
								'</div>',
							'</a>',
						'</div>',
					'</div>',
				'</div>'
			].join('');

			box.innerHTML = html;
		}
	}

	function renderPagination() {
		render(5);

		$store.update('', {
			type: $constants['RENDER_PAGINATION'],
			data: null
		});

		function render(count) {
			var box = document.querySelector('[data-lazy-pagination-box]'),
					html;

			html = [
				'<div class="wj-pagination">',
					'<div class="wj-pagination__line"></div>',
					'<div class="wj-pagination__cover">',
						'<a href="#" class="wj-pagination__btn wj-pagination__btn--prev">',
							'<i class="wj-pagination__icon"></i>',
						'</a>',
						renderButtons(count).replace('undefined', ''),
						'<a href="#" class="wj-pagination__btn wj-pagination__btn--next">',
							'<i class="wj-pagination__icon"></i>',
						'</a>',
					'</div>',
					'<div class="wj-pagination__line"></div>',
				'</div>'
			].join('');

			box.innerHTML = html;

			function renderButtons(count) {
				var html, i;

				for (i = 0; i < count; i++) {
					html += button(i + 1);
				}

				function button(number) {
					return [
						'<a href="#" class="wj-pagination__link">' + number + '</a>'
					].join('');
				}

				return html;
			}
		}
	}

})($, $store, $constants);
