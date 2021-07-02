'use strict';

const LessThanTimeAward = require('./core/less-than-time');

module.exports = class SubMinuteAward extends LessThanTimeAward {

	static get type() {
		return 'sub-60';
	}

	static get text() {
		return 'Complete a puzzle in less than a minute';
	}

	get seconds() {
		return 60;
	}

};
