'use strict';

const PositionAward = require('./core/position');

module.exports = class BronzeAward extends PositionAward {
	static get title() {
		return 'Bronze';
	}

	static get type() {
		return 'bronze';
	}

	static get text() {
		return 'Get the third fastest time for a day';
	}

	get position() {
		return 3;
	}
};
