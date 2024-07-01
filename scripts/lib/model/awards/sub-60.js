'use strict';

const TimeRangeAward = require('./core/time-range');

module.exports = class SubMinuteAward extends TimeRangeAward {
	static get title() {
		return 'Sub Minute';
	}

	static get type() {
		return 'sub-60';
	}

	static get text() {
		return 'Complete a puzzle in less than a minute';
	}

	get maxSeconds() {
		return 59;
	}

	get minSeconds() {
		return 45;
	}
};
