'use strict';

const GreaterThanTimeAward = require('./core/greater-than-time');

module.exports = class OverFiveMinutesAward extends GreaterThanTimeAward {

	static get type() {
		return 'over-300';
	}

	static get text() {
		return 'Complete a puzzle in more than 5 minutes';
	}

	get seconds() {
		return 300;
	}

};
