'use strict';

const BaseAward = require('./base');

module.exports = class TimeAward extends BaseAward {
	get seconds() {
		throw new Error(`${this.constructor.name}.seconds must be implemented`);
	}

	isValidTime(seconds) {
		return seconds === this.seconds;
	}

	calculateDates() {
		const instances = this.person.timesExcludingPending.filter(({ totalSeconds }) =>
			this.isValidTime(totalSeconds)
		);
		if (instances.length) {
			return instances.map(({ leaderboard }) => leaderboard.date);
		}
		return [];
	}
};
