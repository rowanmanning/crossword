'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class ConsistentSixAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Consistent Position ×6';
	}

	static get type() {
		return 'consistent-6';
	}

	static get text() {
		return 'Get the same position six days in a row';
	}

	get streakLength() {
		return 6;
	}

	isValidPosition(position) {
		return position > 3;
	}
};
