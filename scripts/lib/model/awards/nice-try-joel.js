'use strict';

const LessThanTimeOnDayAward = require('./core/less-than-time-on-day');

module.exports = class NiceTryJoelAward extends LessThanTimeOnDayAward {
	static get title() {
		return 'Nice Try, Joel';
	}

	static get type() {
		return 'nice-try-joel';
	}

	static get text() {
		return 'Complete a puzzle in less than a minute on a Saturday';
	}

	get seconds() {
		return 61;
	}

	get day() {
		return 'Saturday';
	}
};
