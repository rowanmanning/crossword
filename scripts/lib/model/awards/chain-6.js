'use strict';

const ChainAward = require('./core/chain');

module.exports = class ChainSixAward extends ChainAward {
	static get title() {
		return 'Chain 6';
	}

	static get type() {
		return 'chain-6';
	}

	static get text() {
		return 'Participate in a chain of six sequential times';
	}

	get chainLength() {
		return 6;
	}
};
