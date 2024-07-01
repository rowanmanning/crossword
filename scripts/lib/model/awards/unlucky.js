'use strict';

const PositionStreakAward = require('./core/position-streak');

module.exports = class UnluckyForSomeAward extends PositionStreakAward {
	static get title() {
		return 'Unlucky for Some';
	}

	static get type() {
		return 'unlucky';
	}

	static get text() {
		return 'Come 13th three times';
	}

	get position() {
		return 13;
	}

	get streakLength() {
		return 3;
	}
};
