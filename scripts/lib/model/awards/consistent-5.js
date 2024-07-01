'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class ConsistentFiveAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Consistent Position ×5';
	}

	static get type() {
		return 'consistent-5';
	}

	static get text() {
		return 'Get the same position five days in a row';
	}

	get streakLength() {
		return 5;
	}

	isValidPosition(position) {
		return position > 3;
	}
};
