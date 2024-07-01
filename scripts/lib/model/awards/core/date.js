'use strict';

const BaseAward = require('./base');

module.exports = class DateAward extends BaseAward {
	get month() {
		throw new Error(`${this.constructor.name}.month must be implemented`);
	}

	get dayOfMonth() {
		throw new Error(`${this.constructor.name}.dayOfMonth must be implemented`);
	}

	get startYear() {
		return null;
	}

	isValidDate(leaderboard) {
		if (this.startYear && leaderboard.year < this.startYear) {
			return false;
		}
		return leaderboard.month === this.month && leaderboard.dayOfMonth === this.dayOfMonth;
	}

	calculateDates() {
		const instances = this.person.times.filter(({ isPending, leaderboard }) => {
			return !isPending && this.isValidDate(leaderboard);
		});
		if (instances.length) {
			return instances.map(({ leaderboard }) => leaderboard.date);
		}
		return [];
	}
};
