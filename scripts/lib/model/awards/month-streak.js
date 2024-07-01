'use strict';

const PlayStreakAward = require('./core/play-streak');

module.exports = class MonthStreakAward extends PlayStreakAward {
	static get title() {
		return 'Month-Long Streak';
	}

	static get type() {
		return 'month-streak';
	}

	static get text() {
		return 'Play for a full month (30 days) without breaks';
	}

	get streakLength() {
		return 30;
	}
};
