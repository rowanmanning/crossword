'use strict';

const TimeGroupAward = require('./core/time-group');

module.exports = class QuadrupletingAward extends TimeGroupAward {
	static get title() {
		return 'Quadrupleting';
	}

	static get type() {
		return 'quadrupleting';
	}

	static get text() {
		return 'Get the same time as three other people';
	}

	get groupSize() {
		return 4;
	}
};
