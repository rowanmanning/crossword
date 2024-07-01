'use strict';

const PositionStreakAward = require('./core/position-streak');

module.exports = class EmergencyAward extends PositionStreakAward {
	static get title() {
		return '999';
	}

	static get type() {
		return 'emergency';
	}

	static get text() {
		return `What's your emergency?`;
	}

	get position() {
		return 9;
	}

	get streakLength() {
		return 3;
	}
};
