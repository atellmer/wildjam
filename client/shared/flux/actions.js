;
var $actions = (function ($, $store, $constants) {
	'use strict';

	var actions = {
		fetchBloggersRequest: fetchBloggersRequest,
		fetchBloggers: fetchBloggers,
		renderBlogerCard: renderBlogerCard,
		renderPagination: renderPagination,
		setPaginationMetadata: setPaginationMetadata,
		setCurrentPage: setCurrentPage,
		setCardAnimation: setCardAnimation
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

	function renderBlogerCard() {
		var source = $store.select('shared.blogers'), 
				data = [],
				cardsOnPage = $store.select('blogerDetailPage.pagination.metadata.cardsOnPage'),
				currentPage = $store.select('blogerDetailPage.pagination.currentPage'),
				i = 0, j = 0;

		$store.update('', {
			type: $constants['RENDER_BLOGER_CARD_START'],
			data: null
		});

		for (i = currentPage * cardsOnPage - cardsOnPage; i < currentPage * cardsOnPage; i++) {
			if (source[i]) {
				data[j] = source[i];
				j++;
			}
		}

		render(data);

		$store.update('', {
			type: $constants['RENDER_BLOGER_CARD_END'],
			data: null
		});

		function render(source) {
			var box = document.querySelector('[data-lazy-box]'),
					template, i;

			for (i = 0; i < source.length; i++) {
				template += getTemplate({
					name: source[i].name,
					link: '#',
					pic: source[i].catalog_image,
					youtubeLink: '#',
					youtubeSubs: source[i].youtube_subscribers_formatted,
					vkLink: 'https://vk.com/' + source[i].vk_name,
					vkAddress: formateName(source[i].vk_name),
					vkSubs: formateSubs(source[i].vk_subscribers_formatted),
					instaLink: 'https://instagram.com/' + source[i].instagram_name,
					instaAddress: formateName(source[i].instagram_name),
					instaSubs: formateSubs(source[i].instagram_subscribers_formatted)
				});
			}
			
			box.innerHTML = template.replace('undefined', '');

			function getTemplate(data) {
				var template;

				template = [
					'<div data-lazy-card aria-haspopup="true" class="bloger-detail__card card js-is-hide">',
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
									'<div class="card__info-count">' + data.youtubeSubs + '\+' + '</div>',
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

				return template;
			}
		}

		function formateName(source) {
			var str = source + '';

			if (str === 'null') {
				return 'None';
			}

			return str;
		}

		function formateSubs(source) {
			var str = source + '';

			if (str.length === 1) {
				str += ' + тыс.';
				return str;
			}

			if (str.length === 6) {
				str = str.substr(0, 3) + ' тыс.+';
				return str;
			}

			if (str.length === 7) {
				str = str.substr(0, 1) + '.' + str.substr(1, 2) + ' млн.+';
				return str;
			}

			if (str.length === 8) {
				str = str.substr(0, 2) + '.' + str.substr(2, 3) + ' млн.+';
				return str;
			}

			return str;
		}
	}

	function renderPagination() {	
		$store.update('', {
			type: $constants['RENDER_PAGINATION_START'],
			data: null
		});

		render($store.select('blogerDetailPage.pagination.metadata.allPages'));
		addListeners();

		$store.update('', {
			type: $constants['RENDER_PAGINATION_END'],
			data: null
		});

		function render(count) {
			var box = document.querySelector('[data-lazy-pagination-box]'),
					template;

			template = [
				'<div class="wj-pagination">',
					'<div class="wj-pagination__line"></div>',
					'<div class="wj-pagination__cover">',
						'<a href="javascript:void(0);" data-pagination-page-prev class="wj-pagination__btn wj-pagination__btn--prev">',
							'<i class="wj-pagination__icon"></i>',
						'</a>',
						renderButtons(count),
						'<a href="javascript:void(0);" data-pagination-page-next class="wj-pagination__btn wj-pagination__btn--next">',
							'<i class="wj-pagination__icon"></i>',
						'</a>',
					'</div>',
					'<div class="wj-pagination__line"></div>',
				'</div>'
			].join('');

			box.innerHTML = template.replace('undefined', '');

			function renderButtons(count) {
				var template, i;

				for (i = 0; i < count; i++) {
					template += button(i + 1);
				}

				function button(number) {
					return [
						'<a href="javascript:void(0);" data-pagination-page="' + number + '" class="wj-pagination__link">' + number + '</a>'
					].join('');
				}

				return template;
			}
		}

		function addListeners() {
			var elems = document.querySelectorAll('[data-pagination-page]'),
					prevBtn = document.querySelector('[data-pagination-page-prev]'),
					nextBtn = document.querySelector('[data-pagination-page-next]'),
					i;

			new Hammer(prevBtn).on('tap', prevBtnHandler);
			new Hammer(nextBtn).on('tap', nextBtnHandler);

			for (i = 0; i < elems.length; i++) {
				new Hammer(elems[i]).on('tap', btnsHandler);
			}

			function prevBtnHandler(ev) {
				ev.preventDefault();
				var pageNumber = $store.select('blogerDetailPage.pagination.currentPage');

				if (pageNumber > 1) {
					pageNumber--;
				}

				setCurrentPage(pageNumber);
			}

			function nextBtnHandler(ev) {
				ev.preventDefault();
				var pageNumber = $store.select('blogerDetailPage.pagination.currentPage'),
						allPages = $store.select('blogerDetailPage.pagination.metadata.allPages');

				if (pageNumber < allPages) {
					pageNumber++;
				}

				setCurrentPage(pageNumber);
			}

			function btnsHandler(ev) {
				ev.preventDefault();

				var pageNumber = ev.target.getAttribute('data-pagination-page');

				setCurrentPage(pageNumber);
			}
		}
	}

	function setCurrentPage(pageNumber) {
		var elems = document.querySelectorAll('[data-pagination-page]'),
				i;

		for (i = 0; i < elems.length; i++) {
			if (elems[i].classList.contains('is-active')) {
				elems[i].classList.remove('is-active');
			}
			if (Number(elems[i].getAttribute('data-pagination-page')) === Number(pageNumber)) {
				if (!elems[i].classList.contains('is-active')) {
					elems[i].classList.add('is-active');
				}
			}
		}

		$store.update('', {
			type: $constants['SET_CURRENT_PAGE_REQUESTED'],
			data: Number(pageNumber)
		});
	}

	function setPaginationMetadata(source) {
		var cardsOnPage = Number(document.querySelector('[data-lazy-number]').getAttribute('data-lazy-number')),
				allPages = Math.ceil(source.length / cardsOnPage);

		$store.update('', {
			type: $constants['SET_PAGINATION_METADATA_REQUESTED'],
			data: {
				cardsOnPage: cardsOnPage,
				allPages: allPages
			}
		});
	}

	function setCardAnimation() {
		var cards = document.querySelectorAll('[data-lazy-card]'),
				i;

		$store.update('', {
			type: $constants['SET_CARD_ANIMATION_START'],
			data: null
		});

		for (i = 0; i < cards.length; i++) {
			if (cards[i].classList.contains('js-is-hide')) {
				cards[i].classList.remove('js-is-hide');
			}

			if (!cards[i].classList.contains('js-is-show')) {
				cards[i].classList.add('js-is-show');
			}
		}

		$store.update('', {
			type: $constants['SET_CARD_ANIMATION_END'],
			data: null
		});
	}

})($, $store, $constants);
