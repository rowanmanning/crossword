'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class ConsistentThreeAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Consistent Position ×3';
	}

	static get type() {
		return 'consistent-3';
	}

	static get text() {
		return 'Get the same position three days in a row';
	}

	get streakLength() {
		return 3;
	}

	isValidPosition(position) {
		return position > 3;
	}
};
