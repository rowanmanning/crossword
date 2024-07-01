'use strict';

const TimeAward = require('./core/time');

module.exports = class BlazeAward extends TimeAward {
	static get title() {
		return 'Blaze It';
	}

	static get type() {
		return 'blaze';
	}

	static get text() {
		return `That's illegal and I don't condone it`;
	}

	get seconds() {
		return 260;
	}
};
