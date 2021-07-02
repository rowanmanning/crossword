'use strict';

const PositionStreakConsecutiveAward = require('./core/position-streak-consecutive');

module.exports = class DoubleSilverAward extends PositionStreakConsecutiveAward {

	static get type() {
		return 'double-silver';
	}

	static get text() {
		return 'Get the second fastest time two days in a row';
	}

	get position() {
		return 2;
	}

	get streakLength() {
		return 2;
	}

};
