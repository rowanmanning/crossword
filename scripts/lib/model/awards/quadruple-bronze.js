'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class QuadrupleBronzeAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Quadruple Bronze';
	}

	static get type() {
		return 'quadruple-bronze';
	}

	static get text() {
		return 'Get the third fastest time four days in a row';
	}

	get position() {
		return 3;
	}

	get streakLength() {
		return 4;
	}
};
