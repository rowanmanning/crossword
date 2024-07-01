'use strict';

const DateAward = require('./core/date');

module.exports = class ChristmasAward extends DateAward {
	static get title() {
		return 'Ho Ho Ho';
	}

	static get type() {
		return 'christmas';
	}

	static get text() {
		return 'Play the crossword on Christmas day';
	}

	get month() {
		return 12;
	}

	get dayOfMonth() {
		return 25;
	}
};
