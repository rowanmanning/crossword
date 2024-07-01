'use strict';

const BaseAward = require('./base');

module.exports = class TimeDifferenceAward extends BaseAward {
	isValidTimeMultiplier() {
		throw new Error(`${this.constructor.name}.isValidTimeMultiplier must be implemented`);
	}

	calculateDates() {
		const instances = this.person.timeDifferences.filter(({ timeMultiplier }) =>
			this.isValidTimeMultiplier(timeMultiplier)
		);
		if (instances.length) {
			return instances.map(({ time }) => time.leaderboard.date);
		}
		return [];
	}
};
