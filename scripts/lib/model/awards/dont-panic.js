'use strict';

const TimeAward = require('./core/time');

module.exports = class DontPanicAward extends TimeAward {
	static get title() {
		return "Don't Panic";
	}

	static get type() {
		return 'dont-panic';
	}

	static get text() {
		return 'A towel is about the most massively useful thing an interstellar hitchhiker can have';
	}

	get seconds() {
		return 42;
	}
};
