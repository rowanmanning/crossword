'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class DoubleGoldAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Double Gold';
	}

	static get type() {
		return 'double-gold';
	}

	static get text() {
		return 'Get the fastest time two days in a row';
	}

	get position() {
		return 1;
	}

	get streakLength() {
		return 2;
	}
};
