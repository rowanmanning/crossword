'use strict';

const TimeAward = require('./time');

module.exports = class TimeRangeAward extends TimeAward {
	get maxSeconds() {
		throw new Error(`${this.constructor.name}.maxSeconds must be implemented`);
	}

	get minSeconds() {
		throw new Error(`${this.constructor.name}.minSeconds must be implemented`);
	}

	get seconds() {
		return this.maxSeconds;
	}

	isValidTime(seconds) {
		return seconds <= this.maxSeconds && seconds >= this.minSeconds;
	}
};
