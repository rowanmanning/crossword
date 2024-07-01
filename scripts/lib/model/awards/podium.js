'use strict';

const BaseAward = require('./core/base');

module.exports = class PodiumAward extends BaseAward {
	static get title() {
		return 'Podium';
	}

	static get type() {
		return 'podium';
	}

	static get text() {
		return 'Unlock third, second, and first place awards';
	}

	get podiumGroups() {
		return this.person.timesExcludingToday
			.reduce((groups, { position, leaderboard }) => {
				let group = groups.length ? groups.pop() : [];
				if (group.length === 6) {
					groups.push(group);
					group = [];
				}
				if (position >= 1 && position <= 3) {
					if (group.includes(position)) {
						groups.push(group);
					} else {
						group.push(leaderboard.date);
						group.push(position);
						groups.push(group);
					}
				}
				return groups;
			}, [])
			.map((group) => group.filter((item) => typeof item !== 'number'))
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
