'use strict';

const TimeAward = require('./time');

module.exports = class GreaterThanTimeAward extends TimeAward {
	isValidTime(seconds) {
		return seconds > this.seconds;
	}
};
