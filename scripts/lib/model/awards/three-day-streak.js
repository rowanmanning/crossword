'use strict';

const PlayStreakAward = require('./core/play-streak');

module.exports = class ThreeDayStreakAward extends PlayStreakAward {
	static get title() {
		return 'Three Day Streak';
	}

	static get type() {
		return 'three-day-streak';
	}

	static get text() {
		return 'Play for three days in a row';
	}

	get streakLength() {
		return 3;
	}
};
