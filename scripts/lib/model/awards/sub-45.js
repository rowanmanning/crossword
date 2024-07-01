'use strict';

const TimeRangeAward = require('./core/time-range');

module.exports = class SubFortyFiveSecondsAward extends TimeRangeAward {
	static get title() {
		return 'Sub 45 Seconds';
	}

	static get type() {
		return 'sub-45';
	}

	static get text() {
		return 'Complete a puzzle in less than 45 seconds';
	}

	get maxSeconds() {
		return 44;
	}

	get minSeconds() {
		return 30;
	}
};
