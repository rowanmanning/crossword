'use strict';

const BaseAward = require('./core/base');

module.exports = class HolidayAward extends BaseAward {
	static get title() {
		return 'Holiday';
	}

	static get type() {
		return 'holiday';
	}

	static get text() {
		return 'Come back to the crossword after a week off';
	}

	calculateDates() {
		const times = [...this.person.times].reverse();
		const streaks = [];
		let currentStreak = null;
		for (const time of times) {
			if (currentStreak) {
				if (time.totalSeconds === null) {
					currentStreak.push(time);
				} else {
					currentStreak.push(time);
					streaks.push(currentStreak);
					currentStreak = null;
				}
			} else if (time.totalSeconds === null) {
				currentStreak = [time];
			}
		}
		if (currentStreak && currentStreak[currentStreak.length - 1].totalSeconds !== null) {
			streaks.push(currentStreak);
		}
		return streaks
			.filter((streak) => streak.length >= 8)
			.map((streak) => streak.pop().leaderboard.date);
	}
};
