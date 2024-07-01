'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class TripleSilverAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Triple Silver';
	}

	static get type() {
		return 'triple-silver';
	}

	static get text() {
		return 'Get the second fastest time three days in a row';
	}

	get position() {
		return 2;
	}

	get streakLength() {
		return 3;
	}
};
