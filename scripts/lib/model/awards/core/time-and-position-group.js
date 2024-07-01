'use strict';

const PositionAward = require('./position');

module.exports = class TimeAndPositionGroupAward extends PositionAward {
	get groupSize() {
		throw new Error(`${this.constructor.name}.groupSize must be implemented`);
	}

	calculateDates() {
		const instances = this.person.timesExcludingToday.filter((time) => {
			return (
				time.leaderboard.times.filter(({ position }) => {
					return this.isValidPosition(position) && position === time.position;
				}).length >= this.groupSize
			);
		});
		if (instances.length) {
			return instances.map(({ leaderboard }) => leaderboard.date);
		}
		return [];
	}
};
