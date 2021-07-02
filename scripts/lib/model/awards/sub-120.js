'use strict';

const LessThanTimeAward = require('./core/less-than-time');

module.exports = class SubTwoMinutesAward extends LessThanTimeAward {

	static get type() {
		return 'sub-120';
	}

	static get text() {
		return 'Complete a puzzle in less than two minutes';
	}

	get seconds() {
		return 120;
	}

};
