'use strict';

const PositionStreakAward = require('./core/position-streak');

module.exports = class BeastAward extends PositionStreakAward {
	static get title() {
		return 'The Number of The Beast';
	}

	static get type() {
		return 'beast';
	}

	static get text() {
		return 'His number is six hundred and sixty-six';
	}

	get position() {
		return 6;
	}

	get streakLength() {
		return 3;
	}
};
