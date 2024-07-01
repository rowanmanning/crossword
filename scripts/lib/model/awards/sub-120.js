'use strict';

const TimeRangeAward = require('./core/time-range');

module.exports = class SubTwoMinutesAward extends TimeRangeAward {
	static get title() {
		return 'Sub Two Minutes';
	}

	static get type() {
		return 'sub-120';
	}

	static get text() {
		return 'Complete a puzzle in less than two minutes';
	}

	get maxSeconds() {
		return 119;
	}

	get minSeconds() {
		return 60;
	}
};
