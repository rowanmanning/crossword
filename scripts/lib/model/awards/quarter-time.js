'use strict';

const TimeDifferenceAward = require('./core/time-difference');

module.exports = class QuarterTimeAward extends TimeDifferenceAward {
	static get title() {
		return 'Quarter Time';
	}

	static get type() {
		return 'quarter-time';
	}

	static get text() {
		return 'Quarter your completion time from one day to the next';
	}

	isValidTimeMultiplier(timeMultiplier) {
		return timeMultiplier <= 0.25;
	}
};
