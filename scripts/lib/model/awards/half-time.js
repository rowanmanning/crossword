'use strict';

const TimeDifferenceAward = require('./core/time-difference');

module.exports = class HalfTimeAward extends TimeDifferenceAward {
	static get title() {
		return 'Half Time';
	}

	static get type() {
		return 'half-time';
	}

	static get text() {
		return 'Half your completion time from one day to the next';
	}

	isValidTimeMultiplier(timeMultiplier) {
		return timeMultiplier <= 0.5 && timeMultiplier > 0.25;
	}
};
