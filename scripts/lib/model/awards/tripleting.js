'use strict';

const TimeGroupAward = require('./core/time-group');

module.exports = class TripletingAward extends TimeGroupAward {
	static get title() {
		return 'Tripleting';
	}

	static get type() {
		return 'tripleting';
	}

	static get text() {
		return 'Get the same time as two other people';
	}

	get groupSize() {
		return 3;
	}
};
