'use strict';

const TimeAward = require('./core/time');

module.exports = class DentistAward extends TimeAward {
	static get title() {
		return 'Dentist';
	}

	static get type() {
		return 'dentist';
	}

	static get text() {
		return "Now this won't hurt a bit…";
	}

	get seconds() {
		return 150;
	}
};
