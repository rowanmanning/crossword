'use strict';

const TimeGroupAward = require('./core/time-group');

module.exports = class SextupletingAward extends TimeGroupAward {
	static get title() {
		return 'Sextupleting';
	}

	static get type() {
		return 'sextupleting';
	}

	static get text() {
		return 'Get the same time as five other people';
	}

	get groupSize() {
		return 6;
	}
};
