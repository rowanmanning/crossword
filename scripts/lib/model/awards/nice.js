'use strict';

const TimeAward = require('./core/time');

module.exports = class NiceAward extends TimeAward {

	static get type() {
		return 'nice';
	}

	static get text() {
		return 'Nice';
	}

	get seconds() {
		return 69;
	}

};
