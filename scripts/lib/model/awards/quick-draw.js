'use strict';

const BaseAward = require('./core/base');

module.exports = class QuickDrawAward extends BaseAward {
	static get title() {
		return 'Quick Draw';
	}

	static get type() {
		return 'quick-draw';
	}

	static get text() {
		return 'Complete a puzzle before anyone else (or within 30 minutes of the first person)';
	}

	calculateDates() {
		return this.person.timesInFirstScraping.map((time) => time.leaderboard.date);
	}
};
