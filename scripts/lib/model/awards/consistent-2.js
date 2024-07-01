'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class ConsistentTwoAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Consistent Position ×2';
	}

	static get type() {
		return 'consistent-2';
	}

	static get text() {
		return 'Get the same position two days in a row';
	}

	get streakLength() {
		return 2;
	}

	isValidPosition(position) {
		return position > 3;
	}
};
