'use strict';

const TimeAward = require('./time');

module.exports = class LessThanTimeAward extends TimeAward {
	isValidTime(seconds) {
		return seconds < this.seconds;
	}
};
