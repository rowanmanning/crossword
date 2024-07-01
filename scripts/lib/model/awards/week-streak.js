'use strict';

const PlayStreakAward = require('./core/play-streak');

module.exports = class WeekStreakAward extends PlayStreakAward {
	static get title() {
		return 'Week-Long Streak';
	}

	static get type() {
		return 'week-streak';
	}

	static get text() {
		return 'Play for a full week without breaks';
	}

	get streakLength() {
		return 7;
	}
};
