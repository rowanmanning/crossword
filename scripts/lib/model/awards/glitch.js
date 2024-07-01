'use strict';

const BaseAward = require('./core/base');

module.exports = class GlitchAward extends BaseAward {
	static get title() {
		return 'Glitch';
	}

	static get type() {
		return 'glitch';
	}

	static get text() {
		return 'Get a glitched time (and admit to it!)';
	}

	calculateDates() {
		return [...this.person.times]
			.filter(({ isGlitch }) => isGlitch)
			.map((time) => time.leaderboard.date)
			.reverse();
	}
};
