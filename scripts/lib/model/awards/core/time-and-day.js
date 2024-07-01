'use strict';

const TimeAward = require('./time');

module.exports = class TimeAndDayAward extends TimeAward {
	get day() {
		throw new Error(`${this.constructor.name}.day must be implemented`);
	}

	isValidTime(seconds) {
		return seconds === this.seconds;
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
