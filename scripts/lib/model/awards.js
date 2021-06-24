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

		// Get player streaks
		const playStreaks = times
			.reduce((streaks, {time, leaderboard}) => {
				let currentStreak = streaks.pop();
				if (time.isPending) {
					streaks.push(currentStreak);
					currentStreak = [];
				} else {
					currentStreak.push(leaderboard.date);
				}
				streaks.push(currentStreak);
				return streaks;
			}, [[]])
			.map(streak => {
				return {
					length: streak.length,
					leaderboard: streak.pop()
				};
			});

		// Get time differences
		const timeDifferences = times
			.filter(({time}) => !time.isPending)
			.reduce((differences, {time, leaderboard}, index, filteredTimes) => {
				const previous = filteredTimes[index - 1];
				if (previous) {
					const from = previous.time.totalSeconds;
					const to = time.totalSeconds;
					const timeDifference = to - from;
					const timeMultiplier = Math.round((to / from) * 100) / 100;
					differences.push({
						timeDifference,
						timeMultiplier,
						leaderboard
					});
				}
				return differences;
			}, []);

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

		// Podium
		const podium = (gold && silver && bronze);
		if (podium) {
			awards.push({
				type: 'podium',
				text: 'Unlock first, second, and third place awards'
			});
		}

		// Podium climbing
		const podiumClimbing = placementNumbers.includes('[3][2][1]');
		if (podiumClimbing) {
			awards.push({
				type: 'podium-climbing',
				text: 'Unlock third, second, and first place awards on consecutive days'
			});
		}

		// Half time
		const halfTime = timeDifferences.find(({timeMultiplier}) => timeMultiplier <= 0.5);
		if (halfTime) {
			awards.push({
				type: 'half-time',
				text: 'Half your completion time from one day to the next',
				leaderboard: halfTime.leaderboard.date
			});
		}

		// Quarter time
		const quarterTime = timeDifferences.find(({timeMultiplier}) => timeMultiplier <= 0.25);
		if (quarterTime) {
			awards.push({
				type: 'quarter-time',
				text: 'Quarter your completion time from one day to the next',
				leaderboard: quarterTime.leaderboard.date
			});
		}

		// Double time
		const doubleTime = timeDifferences.find(({timeMultiplier}) => timeMultiplier >= 2);
		if (doubleTime) {
			awards.push({
				type: 'double-time',
				text: 'Double your completion time from one day to the next',
				leaderboard: doubleTime.leaderboard.date
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

		// 3-day streak
		const threeDayStreak = playStreaks.find(({length}) => length >= 3);
		if (threeDayStreak) {
			awards.push({
				type: 'three-day-streak',
				text: 'Played for three days in a row',
				leaderboard: threeDayStreak.leaderboard
			});
		}

		// 7-day streak
		const weekStreak = playStreaks.find(({length}) => length >= 7);
		if (weekStreak) {
			awards.push({
				type: 'week-streak',
				text: 'Played for a full week without breaks',
				leaderboard: weekStreak.leaderboard
			});
		}

		// 30-day streak
		const monthStreak = playStreaks.find(({length}) => length >= 30);
		if (monthStreak) {
			awards.push({
				type: 'month-streak',
				text: 'Played for a full month (30 days) without breaks',
				leaderboard: monthStreak.leaderboard
			});
		}

		// 90-day streak
		const quarterStreak = playStreaks.find(({length}) => length >= 90);
		if (quarterStreak) {
			awards.push({
				type: 'quarter-streak',
				text: 'Played for a full quarter, give that OKR a 1',
				leaderboard: quarterStreak.leaderboard
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

		// Pi
		const pi = times.find(({time}) => time.totalSeconds === 194);
		if (pi) {
			awards.push({
				type: 'pi',
				text: '3.141 592 653 589 793 238 462 643…',
				leaderboard: pi.leaderboard.date
			});
		}

		// Blaze
		const blaze = times.find(({time}) => time.totalSeconds === 260);
		if (blaze) {
			awards.push({
				type: 'blaze',
				text: 'That\'s illegal and I don\'t condone it',
				leaderboard: blaze.leaderboard.date
			});
		}

		// Beast
		const beast = placements.filter(({placement}) => placement === 6);
		if (beast.length >= 3) {
			awards.push({
				type: 'beast',
				text: 'His number is six hundred and sixty-six',
				leaderboard: beast[2].leaderboard.date
			});
		}

		return awards;
	}

	toJSON() {
		return this.grantedAwards;
	}

};
