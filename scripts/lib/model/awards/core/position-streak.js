'use strict';

const PositionAward = require('./position');

module.exports = class PositionStreakAward extends PositionAward {
	get streakLength() {
		throw new Error(`${this.constructor.name}.streakLength must be implemented`);
	}

	calculateDates() {
		const instances = this.person.timesExcludingToday.filter(({ position }) =>
			this.isValidPosition(position)
		);
		if (instances.length >= this.streakLength) {
			return instances
				.filter((_, index) => (index + 1) % this.streakLength === 0)
				.map(({ leaderboard }) => leaderboard.date);
		}
		return [];
	}
};
