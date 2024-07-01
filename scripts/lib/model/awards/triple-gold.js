'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class TripleGoldAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Triple Gold';
	}

	static get type() {
		return 'triple-gold';
	}

	static get text() {
		return 'Get the fastest time three days in a row';
	}

	get position() {
		return 1;
	}

	get streakLength() {
		return 3;
	}
};
