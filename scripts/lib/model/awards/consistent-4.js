'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class ConsistentFourAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Consistent Position ×4';
	}

	static get type() {
		return 'consistent-4';
	}

	static get text() {
		return 'Get the same position four days in a row';
	}

	get streakLength() {
		return 4;
	}

	isValidPosition(position) {
		return position > 3;
	}
};
