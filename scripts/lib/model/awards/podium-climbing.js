'use strict';

const BaseAward = require('./core/base');

module.exports = class PodiumClimbingAward extends BaseAward {
	static get title() {
		return 'Podium Climbing';
	}

	static get type() {
		return 'podium-climbing';
	}

	static get text() {
		return 'Unlock third, second, then first place awards in order';
	}

	get podiumGroups() {
		return this.person.timesExcludingToday
			.reduce((groups, { position, leaderboard }) => {
				let group = groups.length ? groups.pop() : [];
				if (group.length === 3) {
					groups.push(group);
					group = [];
				}
				if (position === 3) {
					groups.push([leaderboard.date]);
				} else if (group.length === 1 && position === 2) {
					group.push(leaderboard.date);
					groups.push(group);
				} else if (group.length === 2 && position === 1) {
					group.push(leaderboard.date);
					groups.push(group);
				}
				return groups;
			}, [])
			.filter((group) => group.length === 3);
	}

	calculateDates() {
		const { podiumGroups } = this;
		if (podiumGroups.length) {
			return podiumGroups.map((group) => group[2]);
		}
		return [];
	}
};
