'use strict';

const PositionAward = require('./core/position');

module.exports = class GoldAward extends PositionAward {
	static get title() {
		return 'Gold';
	}

	static get type() {
		return 'gold';
	}

	static get text() {
		return 'Get the fastest time for a day';
	}

	get position() {
		return 1;
	}
};
