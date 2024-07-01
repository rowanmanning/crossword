'use strict';

const GreaterThanTimeAward = require('./core/greater-than-time');

module.exports = class OverTenMinutesAward extends GreaterThanTimeAward {
	static get title() {
		return 'Over Ten Minutes';
	}

	static get type() {
		return 'over-600';
	}

	static get text() {
		return 'Complete a puzzle in more than 10 minutes';
	}

	get seconds() {
		return 600;
	}
};
