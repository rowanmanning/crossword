'use strict';

const BaseAward = require('./core/base');

module.exports = class SlowAndSteadyAward extends BaseAward {
	static get title() {
		return 'Slow and Steady';
	}

	static get type() {
		return 'slow-and-steady';
	}

	static get text() {
		return 'Complete a puzzle after everyone else but with the fastest time';
	}

	calculateDates() {
		return this.person.timesInLastScraping
			.filter((time) => time.position === 1)
			.map((time) => time.leaderboard.date);
	}
};
