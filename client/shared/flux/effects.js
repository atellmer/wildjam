;
(function (SpawnEffects, $store, $constants, $actions) {
	'use strict';

	var effects = {
		blogersEffect: blogersEffect,
		renderEffect: renderEffect
	};

	SpawnEffects.effects.run(effects.blogersEffect);
	SpawnEffects.effects.run(effects.renderEffect);

	function blogersEffect(store, action) {
		switch (action.type) {
			case $constants['FETCH_BLOGERS_REQUESTED']:
				{
					$actions.fetchBloggers(action.data);
					break;
				}
			case $constants['FETCH_BLOGERS_SUCCEEDED']:
				{
					$actions.updateBlogers(action.data);
					break;
				}

			default: return;
		}
	}

	function renderEffect(store, action) {
		switch (action.type) {
			case $constants['FETCH_BLOGERS_UPDATED']:
				{
					$actions.renderBlogerCard();
					break;
				}
			case $constants['RENDER_BLOGER_CARD']:
				{
					$actions.renderPagination();
					break;
				}

			default: return;
		}
	}

})(SpawnEffects, $store, $constants, $actions);
