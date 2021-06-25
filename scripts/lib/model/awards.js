'use strict';

module.exports = class Awards {

	constructor(person) {
		this.person = person;
	}

	get grantedAwards() {
		const awards = [];

		// We reverse the sorting of times so that the first time an award
		// is unlocked is counted rather than the last
		const times = [...this.person.times].reverse();
		const nonPendingTimes = times.filter(({isPending}) => !isPending);
		const timesExcludingToday = times.slice(0, times.length - 1);

		// Group positions for streak calculation
		const positionGroups = timesExcludingToday
			.reduce((groups, {position, leaderboard}) => {
				const group = groups.length ? groups.pop() : null;
				if (group && group.position === position) {
					group.leaderboards.push(leaderboard.date);
					group.length = group.leaderboards.length;
					groups.push(group);
				} else {
					if (group) {
						groups.push(group);
					}
					groups.push({
						position,
						length: 1,
						leaderboards: [
							leaderboard.date
						]
					});
				}
				return groups;
			}, []);

		// Get player streaks
		const playStreaks = times
			.reduce((streaks, {isPending, leaderboard}) => {
				let currentStreak = streaks.pop();
				if (isPending) {
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
					leaderboards: streak
				};
			});

		// Get time differences
		const timeDifferences = times
			.filter(time => !time.isPending)
			.reduce((differences, {totalSeconds, leaderboard}, index, filteredTimes) => {
				const previous = filteredTimes[index - 1];
				if (previous) {
					const from = previous.totalSeconds;
					const to = totalSeconds;
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
		const gold = timesExcludingToday.find(({position}) => position === 1);
		if (gold) {
			awards.push({
				type: 'gold',
				text: 'Get the fastest time for a day',
				leaderboard: gold.leaderboard.date
			});
		}
		const doubleGold = positionGroups.find(({position, length}) => position === 1 && length >= 2);
		if (doubleGold) {
			awards.push({
				type: 'double-gold',
				text: 'Get the fastest time two days in a row',
				leaderboard: doubleGold.leaderboards[1]
			});
		}
		const tripleGold = positionGroups.find(({position, length}) => position === 1 && length >= 3);
		if (tripleGold) {
			awards.push({
				type: 'triple-gold',
				text: 'Get the fastest time three days in a row',
				leaderboard: tripleGold.leaderboards[2]
			});
		}

		// Silver
		const silver = timesExcludingToday.find(({position}) => position === 2);
		if (silver) {
			awards.push({
				type: 'silver',
				text: 'Get the second fastest time for a day',
				leaderboard: silver.leaderboard.date
			});
		}
		const doubleSilver = positionGroups.find(({position, length}) => position === 2 && length >= 2);
		if (doubleSilver) {
			awards.push({
				type: 'double-silver',
				text: 'Get the second fastest time two days in a row',
				leaderboard: doubleSilver.leaderboards[1]
			});
		}
		const tripleSilver = positionGroups.find(({position, length}) => position === 2 && length >= 3);
		if (tripleSilver) {
			awards.push({
				type: 'triple-silver',
				text: 'Get the second fastest time three days in a row',
				leaderboard: tripleSilver.leaderboards[2]
			});
		}

		// Bronze
		const bronze = timesExcludingToday.find(({position}) => position === 3);
		if (bronze) {
			awards.push({
				type: 'bronze',
				text: 'Get the third fastest time for a day',
				leaderboard: bronze.leaderboard.date
			});
		}
		const doubleBronze = positionGroups.find(({position, length}) => position === 3 && length >= 2);
		if (doubleBronze) {
			awards.push({
				type: 'double-bronze',
				text: 'Get the third fastest time two days in a row',
				leaderboard: doubleBronze.leaderboards[1]
			});
		}
		const tripleBronze = positionGroups.find(({position, length}) => position === 3 && length >= 3);
		if (tripleBronze) {
			awards.push({
				type: 'triple-bronze',
				text: 'Get the third fastest time three days in a row',
				leaderboard: tripleBronze.leaderboards[2]
			});
		}

		// Podium
		const podium = (gold && silver && bronze);
		if (podium) {
			awards.push({
				type: 'podium',
				text: 'Unlock first, second, and third place awards',
				leaderboard: times.filter(({position}) => position >= 1 || position <= 3)[2].leaderboard.date
			});
		}

		// Podium climbing
		const positionNumbers = timesExcludingToday.map(({position}) => `[${position}]`).join('');
		const podiumClimbing = positionNumbers.includes('[3][2][1]');
		if (podiumClimbing) {
			awards.push({
				type: 'podium-climbing',
				text: 'Unlock third, second, and first place awards on consecutive days'
				// TODO work out how we can record the date here
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
		const sub120 = times.find(time => time.totalSeconds !== null && time.totalSeconds < 120);
		if (sub120) {
			awards.push({
				type: 'sub-120',
				text: 'Complete a puzzle in less than two minutes',
				leaderboard: sub120.leaderboard.date
			});
		}

		// Sub-minute
		const sub60 = times.find(time => time.totalSeconds !== null && time.totalSeconds < 60);
		if (sub60) {
			awards.push({
				type: 'sub-60',
				text: 'Complete a puzzle in less than a minute',
				leaderboard: sub60.leaderboard.date
			});
		}

		// Sub-45-seconds
		const sub45 = times.find(time => time.totalSeconds !== null && time.totalSeconds < 45);
		if (sub45) {
			awards.push({
				type: 'sub-45',
				text: 'Complete a puzzle in less than 45 seconds',
				leaderboard: sub45.leaderboard.date
			});
		}

		// Sub-30-seconds
		const sub30 = times.find(time => time.totalSeconds !== null && time.totalSeconds < 30);
		if (sub30) {
			awards.push({
				type: 'sub-30',
				text: 'Complete a puzzle in less than 30 seconds',
				leaderboard: sub30.leaderboard.date
			});
		}

		// Sub-20-seconds
		const sub20 = times.find(time => time.totalSeconds !== null && time.totalSeconds < 20);
		if (sub20) {
			awards.push({
				type: 'sub-20',
				text: 'Complete a puzzle in less than 20 seconds',
				leaderboard: sub20.leaderboard.date
			});
		}

		// 5-minutes
		const over300 = times.find(time => time.totalSeconds >= 300);
		if (over300) {
			awards.push({
				type: 'over-300',
				text: 'Complete a puzzle in 5 minutes or more',
				leaderboard: over300.leaderboard.date
			});
		}

		// 3-day streak
		const threeDayStreak = playStreaks.find(({length}) => length >= 3);
		if (threeDayStreak) {
			awards.push({
				type: 'three-day-streak',
				text: 'Play for three days in a row',
				leaderboard: threeDayStreak.leaderboards[2]
			});
		}

		// 7-day streak
		const weekStreak = playStreaks.find(({length}) => length >= 7);
		if (weekStreak) {
			awards.push({
				type: 'week-streak',
				text: 'Play for a full week without breaks',
				leaderboard: weekStreak.leaderboards[6]
			});
		}

		// 30-day streak
		const monthStreak = playStreaks.find(({length}) => length >= 30);
		if (monthStreak) {
			awards.push({
				type: 'month-streak',
				text: 'Play for a full month (30 days) without breaks',
				leaderboard: monthStreak.leaderboards[29]
			});
		}

		// 90-day streak
		const quarterStreak = playStreaks.find(({length}) => length >= 90);
		if (quarterStreak) {
			awards.push({
				type: 'quarter-streak',
				text: 'Play for a full quarter, give that OKR a 1',
				leaderboard: quarterStreak.leaderboards[89]
			});
		}

		// Twinning
		const twinning = nonPendingTimes.find(time => {
			return time.leaderboard.times.filter(({position}) => position === time.position).length >= 2;
		});
		if (twinning) {
			awards.push({
				type: 'twinning',
				text: 'Get the same time as another person',
				leaderboard: twinning.leaderboard.date
			});
		}

		const tripleting = nonPendingTimes.find(time => {
			return time.leaderboard.times.filter(({position}) => position === time.position).length >= 3;
		});
		if (tripleting) {
			awards.push({
				type: 'tripleting',
				text: 'Get the same time as two other people',
				leaderboard: tripleting.leaderboard.date
			});
		}

		const quadrupleting = nonPendingTimes.find(time => {
			return time.leaderboard.times.filter(({position}) => position === time.position).length >= 4;
		});
		if (quadrupleting) {
			awards.push({
				type: 'quadrupleting',
				text: 'Get the same time as three other people',
				leaderboard: quadrupleting.leaderboard.date
			});
		}

		// Arjun
		const arjun = (
			times.find(time => time.totalSeconds === 97) ||
			times.find(time => time.totalSeconds === 137)
		);
		if (arjun) {
			awards.push({
				type: 'arjun',
				text: 'Join us',
				leaderboard: arjun.leaderboard.date
			});
		}

		// Nice
		const nice = times.find(time => time.totalSeconds === 69);
		if (nice) {
			awards.push({
				type: 'nice',
				text: 'Nice',
				leaderboard: nice.leaderboard.date
			});
		}

		// Pi
		const pi = times.find(time => time.totalSeconds === 194);
		if (pi) {
			awards.push({
				type: 'pi',
				text: '3.141 592 653 589 793 238 462 643…',
				leaderboard: pi.leaderboard.date
			});
		}

		// Blaze
		const blaze = times.find(time => time.totalSeconds === 260);
		if (blaze) {
			awards.push({
				type: 'blaze',
				text: 'That\'s illegal and I don\'t condone it',
				leaderboard: blaze.leaderboard.date
			});
		}

		// Beast
		const beast = timesExcludingToday.filter(({position}) => position === 6);
		if (beast.length >= 3) {
			awards.push({
				type: 'beast',
				text: 'His number is six hundred and sixty-six',
				leaderboard: beast[2].leaderboard.date
			});
		}

		// 999
		const emergency = timesExcludingToday.filter(({position}) => position === 9);
		if (emergency.length >= 3) {
			awards.push({
				type: 'emergency',
				text: 'What\'s your emergency?',
				leaderboard: emergency[2].leaderboard.date
			});
		}

		return awards;
	}

	toJSON() {
		return this.grantedAwards;
	}

};
