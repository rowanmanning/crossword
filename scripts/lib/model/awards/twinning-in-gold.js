'use strict';

const TimeAndPositionGroupAward = require('./core/time-and-position-group');

module.exports = class TwinningInGoldAward extends TimeAndPositionGroupAward {
	static get title() {
		return 'Twinning In Gold';
	}

	static get type() {
		return 'twinning-in-gold';
	}

	static get text() {
		return 'Get the twinning award and the fastest time for a day';
	}

	get position() {
		return 1;
	}

	get groupSize() {
		return 2;
	}
};
