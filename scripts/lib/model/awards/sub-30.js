'use strict';

const LessThanTimeAward = require('./core/less-than-time');

module.exports = class SubThirtySecondsAward extends LessThanTimeAward {

	static get title() {
		return 'Sub 30 Seconds';
	}

	static get type() {
		return 'sub-30';
	}

	static get text() {
		return 'Complete a puzzle in less than 30 seconds';
	}

	get seconds() {
		return 30;
	}

};
