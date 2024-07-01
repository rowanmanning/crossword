'use strict';

const BaseAward = require('./base');

module.exports = class PositionAward extends BaseAward {
	get position() {
		throw new Error(`${this.constructor.name}.position must be implemented`);
	}

	isValidPosition(position) {
		return position === this.position;
	}

	calculateDates() {
		const instances = this.person.timesExcludingToday.filter(({ position }) =>
			this.isValidPosition(position)
		);
		if (instances.length) {
			return instances.map(({ leaderboard }) => leaderboard.date);
		}
		return [];
	}
};
