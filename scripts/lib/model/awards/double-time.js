'use strict';

const TimeDifferenceAward = require('./core/time-difference');

module.exports = class DoubleTimeAward extends TimeDifferenceAward {
	static get title() {
		return 'Double Time';
	}

	static get type() {
		return 'double-time';
	}

	static get text() {
		return 'Double your completion time from one day to the next';
	}

	isValidTimeMultiplier(timeMultiplier) {
		return timeMultiplier >= 2;
	}
};
