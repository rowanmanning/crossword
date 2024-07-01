'use strict';

const TimeGroupAward = require('./core/time-group');

module.exports = class TwinningAward extends TimeGroupAward {
	static get title() {
		return 'Twinning';
	}

	static get type() {
		return 'twinning';
	}

	static get text() {
		return 'Get the same time as another person';
	}

	get groupSize() {
		return 2;
	}
};
