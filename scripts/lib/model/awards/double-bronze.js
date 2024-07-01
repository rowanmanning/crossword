'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class DoubleBronzeAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Double Bronze';
	}

	static get type() {
		return 'double-bronze';
	}

	static get text() {
		return 'Get the third fastest time two days in a row';
	}

	get position() {
		return 3;
	}

	get streakLength() {
		return 2;
	}
};
