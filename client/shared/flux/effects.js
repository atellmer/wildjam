;
(function (SpawnEffects, $store, $constants, $actions) {
	'use strict';

	var effects = {
		blogersEffect: blogersEffect,
		renderEffect: renderEffect,
		paginationEffect: paginationEffect
	};

	SpawnEffects.effects.run(effects.blogersEffect);
	SpawnEffects.effects.run(effects.renderEffect);
	SpawnEffects.effects.run(effects.paginationEffect);

	function blogersEffect(store, action) {
		switch (action.type) {
			case $constants['FETCH_BLOGERS_REQUESTED']:
				{
					$actions.fetchBloggers(action.data);
					break;
				}
			case $constants['FETCH_BLOGERS_SUCCEEDED']:
				{
					$store.update('shared.blogers', {
						type: $constants['FETCH_BLOGERS_UPDATE_START'],
						data: action.data
					});
					$store.update('', {
						type: $constants['FETCH_BLOGERS_UPDATE_END'],
						data: null
					});
					break;
				}

			default: return;
		}
	}

	function renderEffect(store, action) {
		switch (action.type) {
			case $constants['FETCH_BLOGERS_UPDATE_END']:
				{
					$actions.setPaginationMetadata($store.select('shared.blogers'));
					$actions.renderBlogerCard();
					break;
				}
			case $constants['SET_PAGINATION_METADATA_REQUESTED']:
				{
					$store.update('blogerDetailPage.pagination.metadata', {
						type: $constants['SET_PAGINATION_METADATA_START'],
						data: action.data
					});
					$store.update('', {
						type: $constants['SET_PAGINATION_METADATA_END'],
						data: null
					});
					break;
				}
			case $constants['SET_PAGINATION_METADATA_END']:
				{
					$actions.renderPagination();
					break;
				}
			case $constants['SET_CURRENT_PAGE_END']:
				{
					$actions.renderBlogerCard();
					break;
				}

			case $constants['RENDER_BLOGER_CARD_END']:
				{
					$actions.setCardAnimation();
					break;
				}

			default: return;
		}
	}

	function paginationEffect(store, action) {
		switch (action.type) {
			case $constants['RENDER_PAGINATION_END']:
				{
					$actions.setCurrentPage(1);
					break;
				}
			case $constants['SET_CURRENT_PAGE_REQUESTED']:
				{
					$store.update('blogerDetailPage.pagination.currentPage', {
						type: $constants['SET_CURRENT_PAGE_START'],
						data: action.data
					});
					$store.update('', {
						type: $constants['SET_CURRENT_PAGE_END'],
						data: null
					});
					break;
				}

			default: return;
		}
	}

})(SpawnEffects, $store, $constants, $actions);
