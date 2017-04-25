'use strict';

const ROOT = 'client';

module.exports = {
  root: ROOT,
  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
  tinyPngApiKey: 'qxIGxLiWrmjcSr4aVcby1RzsZoK-HFML',
	path: {
		root: `${ROOT}/`,
		shared: `${ROOT}/shared`,
		components: `${ROOT}/components`,
		images: `${ROOT}/images`,
		dist: `${ROOT}/dist`
	}
}
