'use strict';

const DateAward = require('./core/date');

module.exports = class AnniversaryAward extends DateAward {
	static get title() {
		return 'Happy Anniversary!';
	}

	static get type() {
		return 'anniversary';
	}

	static get text() {
		return 'Play the crossword on the anniversary of this website';
	}

	get month() {
		return 6;
	}

	get dayOfMonth() {
		return 21;
	}

	get startYear() {
		return 2022;
	}
};
