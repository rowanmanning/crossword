'use strict';

const TimeAward = require('./core/time');

module.exports = class ArjunAward extends TimeAward {
	static get title() {
		return 'Arjun';
	}

	static get type() {
		return 'arjun';
	}

	static get text() {
		return 'Join us';
	}

	get seconds() {
		return [97, 137];
	}

	isValidTime(seconds) {
		return this.seconds.includes(seconds);
	}
};
