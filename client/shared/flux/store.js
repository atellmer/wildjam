;
var $store = (function (Spawn, SpawnEffects) {
	'use strict';

	var initialState = {
		shared: {
			blogers: []
		}
	};

	var store = Spawn.createStore(
		initialState,
		Spawn.addInterceptor(logger, SpawnEffects.effects)
	);

	return store;

	function logger(store) {
		return function(next) {
			return function (action) {
				console.log('action: ', action.type + ' -> ', JSON.parse(JSON.stringify(action.data)));
				next(action);
			}
		}
	}

})(Spawn, SpawnEffects);