'use strict';

const TimeRangeAward = require('./core/time-range');

module.exports = class OverFiveMinutesAward extends TimeRangeAward {
	static get title() {
		return 'Over Five Minutes';
	}

	static get type() {
		return 'over-300';
	}

	static get text() {
		return 'Complete a puzzle in more than 5 minutes';
	}

	get maxSeconds() {
		return 600;
	}

	get minSeconds() {
		return 301;
	}
};
