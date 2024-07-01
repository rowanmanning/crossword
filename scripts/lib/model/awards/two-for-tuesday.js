'use strict';

const TimeAndDayAward = require('./core/time-and-day');

module.exports = class TwoForTuesdayAward extends TimeAndDayAward {
	static get title() {
		return 'Two for Tuesday';
	}

	static get type() {
		return 'two-for-tuesday';
	}

	static get text() {
		return 'Get a time of exactly 2:00 on a Tuesday';
	}

	get seconds() {
		return 120;
	}

	get day() {
		return 'Tuesday';
	}
};
