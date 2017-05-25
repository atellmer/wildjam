;
(function (SpawnEffects, $store, $constants, $actions) {
	'use strict';

	var effects = {
		lazyItemsEffect: lazyItemsEffect,
		renderEffect: renderEffect,
		paginationEffect: paginationEffect
	};

	SpawnEffects.effects.run(effects.lazyItemsEffect);
	SpawnEffects.effects.run(effects.renderEffect);
	SpawnEffects.effects.run(effects.paginationEffect);

	function lazyItemsEffect(store, action) {
		switch (action.type) {
			case $constants['FETCH_LAZY_ITEMS_REQUESTED']:
				{
					$actions.fetchLazyItems(action.data);
					break;
				}
			case $constants['FETCH_LAZY_ITEMS_SUCCEEDED']:
				{
					$store.update('shared.lazy.items', {
						type: $constants['FETCH_LAZY_ITEMS_UPDATE_START'],
						data: action.data
					});
					$store.update('', {
						type: $constants['FETCH_LAZY_ITEMS_UPDATE_END'],
						data: null
					});
					break;
				}

			default: return;
		}
	}

	function renderEffect(store, action) {
		switch (action.type) {
			case $constants['FETCH_LAZY_ITEMS_UPDATE_END']:
				{
					$actions.setPaginationMetadata($store.select('shared.lazy.items'));
					$actions.renderCard();
					break;
				}
			case $constants['SET_PAGINATION_METADATA_REQUESTED']:
				{
					$store.update('shared.lazy.pagination.metadata', {
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
					$actions.renderCard();
					break;
				}

			case $constants['RENDER_CARD_END']:
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
					$store.update('shared.lazy.pagination.currentPage', {
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
