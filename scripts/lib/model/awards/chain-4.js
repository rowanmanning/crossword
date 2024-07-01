'use strict';

const ChainAward = require('./core/chain');

module.exports = class ChainFourAward extends ChainAward {
	static get title() {
		return 'Chain 4';
	}

	static get type() {
		return 'chain-4';
	}

	static get text() {
		return 'Participate in a chain of four sequential times';
	}

	get chainLength() {
		return 4;
	}
};
