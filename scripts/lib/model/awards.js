'use strict';

module.exports = class Awards {

	constructor(person) {
		this.person = person;
	}

	get grantedAwards() {
		const awards = [];

		// We reverse the sorting of times so that the first time an award
		// is unlocked is counted rather than the last
		const placements = [...this.person.placements].reverse();
		const times = [...this.person.times].reverse();

		// Ignore the most recent placement, because it will change over the day
		placements.pop();

		// Get placement numbers for streak calculation
		const placementNumbers = placements.map(({placement}) => `[${placement}]`).join('');

		// Gold
		const gold = placements.find(({placement}) => placement === 1);
		if (gold) {
			awards.push({
				type: 'gold',
				text: 'The fastest time on a single day',
				leaderboard: gold.leaderboard.date
			});
		}
		if (placementNumbers.includes('[1][1]')) {
			awards.push({
				type: 'double-gold',
				text: 'The fastest time two days in a row'
			});
		}
		if (placementNumbers.includes('[1][1][1]')) {
			awards.push({
				type: 'triple-gold',
				text: 'The fastest time three days in a row'
			});
		}

		// Silver
		const silver = placements.find(({placement}) => placement === 2);
		if (silver) {
			awards.push({
				type: 'silver',
				text: 'The second fastest time on a single day',
				leaderboard: silver.leaderboard.date
			});
		}
		if (placementNumbers.includes('[2][2]')) {
			awards.push({
				type: 'double-silver',
				text: 'The second fastest time two days in a row'
			});
		}
		if (placementNumbers.includes('[2][2][2]')) {
			awards.push({
				type: 'triple-silver',
				text: 'The second fastest time three days in a row'
			});
		}

		// Bronze
		const bronze = placements.find(({placement}) => placement === 3);
		if (bronze) {
			awards.push({
				type: 'bronze',
				text: 'The third fastest time on a single day',
				leaderboard: bronze.leaderboard.date
			});
		}
		if (placementNumbers.includes('[3][3]')) {
			awards.push({
				type: 'double-bronze',
				text: 'The third fastest time two days in a row'
			});
		}
		if (placementNumbers.includes('[3][3][3]')) {
			awards.push({
				type: 'triple-bronze',
				text: 'The third fastest time three days in a row'
			});
		}

		// Sub-two-minutes
		const sub120 = times.find(({time}) => time.totalSeconds !== null && time.totalSeconds < 120);
		if (sub120) {
			awards.push({
				type: 'sub-120',
				text: 'Completed in less than two minutes',
				leaderboard: sub120.leaderboard.date
			});
		}

		// Sub-minute
		const sub60 = times.find(({time}) => time.totalSeconds !== null && time.totalSeconds < 60);
		if (sub60) {
			awards.push({
				type: 'sub-60',
				text: 'Completed in less than a minute',
				leaderboard: sub60.leaderboard.date
			});
		}

		// Sub-45-seconds
		const sub45 = times.find(({time}) => time.totalSeconds !== null && time.totalSeconds < 45);
		if (sub45) {
			awards.push({
				type: 'sub-45',
				text: 'Completed in less than 45 seconds',
				leaderboard: sub45.leaderboard.date
			});
		}

		// Sub-30-seconds
		const sub30 = times.find(({time}) => time.totalSeconds !== null && time.totalSeconds < 30);
		if (sub30) {
			awards.push({
				type: 'sub-30',
				text: 'Completed in less than 30 seconds',
				leaderboard: sub30.leaderboard.date
			});
		}

		// Sub-20-seconds
		const sub20 = times.find(({time}) => time.totalSeconds !== null && time.totalSeconds < 20);
		if (sub20) {
			awards.push({
				type: 'sub-20',
				text: 'Completed in less than 20 seconds',
				leaderboard: sub20.leaderboard.date
			});
		}

		// 5-minutes
		const over300 = times.find(({time}) => time.totalSeconds >= 300);
		if (over300) {
			awards.push({
				type: 'over-300',
				text: 'Completed in 5 minutes or more',
				leaderboard: over300.leaderboard.date
			});
		}

		// Arjun
		const arjun = (
			times.find(({time}) => time.totalSeconds === 97) ||
			times.find(({time}) => time.totalSeconds === 137)
		);
		if (arjun) {
			awards.push({
				type: 'arjun',
				text: 'Join us',
				leaderboard: arjun.leaderboard.date
			});
		}

		// Nice
		const nice = times.find(({time}) => time.totalSeconds === 69);
		if (nice) {
			awards.push({
				type: 'nice',
				text: 'Nice',
				leaderboard: nice.leaderboard.date
			});
		}

		return awards;
	}

	toJSON() {
		return this.grantedAwards;
	}

};
