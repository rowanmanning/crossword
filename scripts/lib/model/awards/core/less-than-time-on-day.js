'use strict';

const LessThanTimeAward = require('./less-than-time');

module.exports = class LessThanTimeOnDayAward extends LessThanTimeAward {
	get day() {
		throw new Error(`${this.constructor.name}.day must be implemented`);
	}

	isValidDay(day) {
		return day === this.day;
	}

	calculateDates() {
		const instances = this.person.timesExcludingPending.filter((time) => {
			return this.isValidTime(time.totalSeconds) && this.isValidDay(time.leaderboard.day);
		});
		if (instances.length) {
			return instances.map(({ leaderboard }) => leaderboard.date);
		}
		return [];
	}
};
