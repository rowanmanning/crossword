'use strict';

const BaseAward = require('./base');

module.exports = class TimeGroupAward extends BaseAward {
	get groupSize() {
		throw new Error(`${this.constructor.name}.groupSize must be implemented`);
	}

	calculateDates() {
		const instances = this.person.timesExcludingPending.filter((time) => {
			return (
				time.leaderboard.times.filter(({ position }) => position === time.position)
					.length === this.groupSize
			);
		});
		if (instances.length) {
			return instances.map(({ leaderboard }) => leaderboard.date);
		}
		return [];
	}
};
