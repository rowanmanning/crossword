'use strict';

const TimeAndDayAward = require('./core/time-and-day');

module.exports = class FridayStreetAward extends TimeAndDayAward {
	static get title() {
		return '1 Friday Street';
	}

	static get type() {
		return 'friday-street';
	}

	static get text() {
		return 'Get a time of exactly 1:00 on a Friday';
	}

	get seconds() {
		return 60;
	}

	get day() {
		return 'Friday';
	}
};
