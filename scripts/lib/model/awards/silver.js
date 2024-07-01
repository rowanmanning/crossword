'use strict';

const PositionAward = require('./core/position');

module.exports = class SilverAward extends PositionAward {
	static get title() {
		return 'Silver';
	}

	static get type() {
		return 'silver';
	}

	static get text() {
		return 'Get the second fastest time for a day';
	}

	get position() {
		return 2;
	}
};
