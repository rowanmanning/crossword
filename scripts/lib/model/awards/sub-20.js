'use strict';

const LessThanTimeAward = require('./core/less-than-time');

module.exports = class SubTwentySecondsAward extends LessThanTimeAward {
	static get title() {
		return 'Sub 20 Seconds';
	}

	static get type() {
		return 'sub-20';
	}

	static get text() {
		return 'Complete a puzzle in less than 20 seconds';
	}

	get seconds() {
		return 20;
	}
};
