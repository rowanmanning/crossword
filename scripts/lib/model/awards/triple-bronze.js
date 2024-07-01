'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class TripleBronzeAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Triple Bronze';
	}

	static get type() {
		return 'triple-bronze';
	}

	static get text() {
		return 'Get the third fastest time three days in a row';
	}

	get position() {
		return 3;
	}

	get streakLength() {
		return 3;
	}
};
