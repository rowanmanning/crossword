'use strict';

const LessThanTimeAward = require('./core/less-than-time');

module.exports = class SubFortyFiveSecondsAward extends LessThanTimeAward {

	static get type() {
		return 'sub-45';
	}

	static get text() {
		return 'Complete a puzzle in less than 45 seconds';
	}

	get seconds() {
		return 45;
	}

};
