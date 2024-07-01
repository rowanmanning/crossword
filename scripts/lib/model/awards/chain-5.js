'use strict';

const ChainAward = require('./core/chain');

module.exports = class ChainFiveAward extends ChainAward {
	static get title() {
		return 'Chain 5';
	}

	static get type() {
		return 'chain-5';
	}

	static get text() {
		return 'Participate in a chain of five sequential times';
	}

	get chainLength() {
		return 5;
	}
};
