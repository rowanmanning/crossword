'use strict';

const TimeRangeAward = require('./core/time-range');

module.exports = class SubThirtySecondsAward extends TimeRangeAward {
	static get title() {
		return 'Sub 30 Seconds';
	}

	static get type() {
		return 'sub-30';
	}

	static get text() {
		return 'Complete a puzzle in less than 30 seconds';
	}

	get maxSeconds() {
		return 29;
	}

	get minSeconds() {
		return 20;
	}
};
