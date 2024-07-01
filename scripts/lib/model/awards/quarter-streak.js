'use strict';

const PlayStreakAward = require('./core/play-streak');

module.exports = class QuarterStreakAward extends PlayStreakAward {
	static get title() {
		return 'Quarter-Long Streak';
	}

	static get type() {
		return 'quarter-streak';
	}

	static get text() {
		return 'Play for a full quarter, give that OKR a 1';
	}

	get streakLength() {
		return 90;
	}
};
