'use strict';

const BaseAward = require('./base');

module.exports = class PlayStreakAward extends BaseAward {
	get streakLength() {
		throw new Error(`${this.constructor.name}.streakLength must be implemented`);
	}

	calculateDates() {
		const instances = this.person.timesGroupedByPlayStreak.filter(
			({ length }) => length >= this.streakLength
		);
		if (instances.length) {
			return instances.map(({ times }) => times[this.streakLength - 1].leaderboard.date);
		}
		return [];
	}
};
