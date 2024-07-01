'use strict';

const DateAward = require('./core/date');

module.exports = class ValentinesAward extends DateAward {
	static get title() {
		return 'I Choo Choo Choose You';
	}

	static get type() {
		return 'valentines';
	}

	static get text() {
		return 'Play the crossword on Valentines day';
	}

	get month() {
		return 2;
	}

	get dayOfMonth() {
		return 14;
	}
};
