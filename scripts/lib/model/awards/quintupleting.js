'use strict';

const TimeGroupAward = require('./core/time-group');

module.exports = class QuintupletingAward extends TimeGroupAward {
	static get title() {
		return 'Quintupleting';
	}

	static get type() {
		return 'quintupleting';
	}

	static get text() {
		return 'Get the same time as four other people';
	}

	get groupSize() {
		return 5;
	}
};
