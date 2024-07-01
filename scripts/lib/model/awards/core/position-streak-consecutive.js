'use strict';

const PositionStreakAward = require('./position-streak');

module.exports = class PositionStreakConsecutiveAward extends PositionStreakAward {
	calculateDates() {
		const instances = this.person.timesGroupedByPosition.filter(
			({ position, length }) => this.isValidPosition(position) && length >= this.streakLength
		);
		if (instances.length) {
			return instances.map(({ times }) => times[this.streakLength - 1].leaderboard.date);
		}
		return [];
	}
};
