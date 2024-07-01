'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class QuadrupleGoldAward extends PositionStreakConsecutiveAward {
	static get title() {
		return 'Quadruple Gold';
	}

	static get type() {
		return 'quadruple-gold';
	}

	static get text() {
		return 'Get the fastest time four days in a row';
	}

	get position() {
		return 1;
	}

	get streakLength() {
		return 4;
	}
};
