'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class QuadrupleSilverAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Quadruple Silver';
	}

	static get type() {
		return 'quadruple-silver';
	}

	static get text() {
		return 'Get the second fastest time four days in a row';
	}

	get position() {
		return 2;
	}

	get streakLength() {
		return 4;
	}
};
