'use strict';

const ChainAward = require('./core/chain');

module.exports = class ChainThreeAward extends ChainAward {
	static get title() {
		return 'Chain 3';
	}

	static get type() {
		return 'chain-3';
	}

	static get text() {
		return 'Participate in a chain of three sequential times';
	}

	get chainLength() {
		return 3;
	}
};
