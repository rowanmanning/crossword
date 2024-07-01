'use strict';

const TimeAward = require('./core/time');

module.exports = class PiAward extends TimeAward {
	static get title() {
		return 'Pi';
	}

	static get type() {
		return 'pi';
	}

	static get text() {
		return '3.141 592 653 589 793 238 462 643…';
	}

	get seconds() {
		return 194;
	}
};
