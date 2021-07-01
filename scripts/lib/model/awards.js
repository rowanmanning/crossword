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

		// Get groups of third + second + first
		const podiumGroups = timesExcludingToday
			.reduce((groups, {position, leaderboard}) => {
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
			.filter(group => group.length === 3);

		// Get groups of third + second + first (unordered)
		const podiumGroupsUnordered = timesExcludingToday
			.reduce((groups, {position, leaderboard}) => {
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
			.map(group => group.filter(item => typeof item !== 'number'))
			.filter(group => group.length === 3);

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
		const golds = timesExcludingToday.filter(({position}) => position === 1);
		if (golds.length) {
			awards.push({
				type: 'gold',
				text: 'Get the fastest time for a day',
				dates: golds.map(({leaderboard}) => leaderboard.date)
			});
		}
		const doubleGolds = positionGroups.filter(({position, length}) => position === 1 && length >= 2);
		if (doubleGolds.length) {
			awards.push({
				type: 'double-gold',
				text: 'Get the fastest time two days in a row',
				dates: doubleGolds.map(({leaderboards}) => leaderboards[1])
			});
		}
		const tripleGolds = positionGroups.filter(({position, length}) => position === 1 && length >= 3);
		if (tripleGolds.length) {
			awards.push({
				type: 'triple-gold',
				text: 'Get the fastest time three days in a row',
				dates: tripleGolds.map(({leaderboards}) => leaderboards[2])
			});
		}

		// Silver
		const silvers = timesExcludingToday.filter(({position}) => position === 2);
		if (silvers.length) {
			awards.push({
				type: 'silver',
				text: 'Get the second fastest time for a day',
				dates: silvers.map(({leaderboard}) => leaderboard.date)
			});
		}
		const doubleSilvers = positionGroups.filter(({position, length}) => position === 2 && length >= 2);
		if (doubleSilvers.length) {
			awards.push({
				type: 'double-silver',
				text: 'Get the second fastest time two days in a row',
				dates: doubleSilvers.map(({leaderboards}) => leaderboards[1])
			});
		}
		const tripleSilvers = positionGroups.filter(({position, length}) => position === 2 && length >= 3);
		if (tripleSilvers.length) {
			awards.push({
				type: 'triple-silver',
				text: 'Get the second fastest time three days in a row',
				dates: tripleSilvers.map(({leaderboards}) => leaderboards[2])
			});
		}

		// Bronze
		const bronzes = timesExcludingToday.filter(({position}) => position === 3);
		if (bronzes.length) {
			awards.push({
				type: 'bronze',
				text: 'Get the third fastest time for a day',
				dates: bronzes.map(({leaderboard}) => leaderboard.date)
			});
		}
		const doubleBronzes = positionGroups.filter(({position, length}) => position === 3 && length >= 2);
		if (doubleBronzes.length) {
			awards.push({
				type: 'double-bronze',
				text: 'Get the third fastest time two days in a row',
				dates: doubleBronzes.map(({leaderboards}) => leaderboards[1])
			});
		}
		const tripleBronzes = positionGroups.filter(({position, length}) => position === 3 && length >= 3);
		if (tripleBronzes.length) {
			awards.push({
				type: 'triple-bronze',
				text: 'Get the third fastest time three days in a row',
				dates: tripleBronzes.map(({leaderboards}) => leaderboards[2])
			});
		}

		// Consistent position
		const consistent2 = positionGroups.filter(({position, length}) => position > 3 && length >= 2);
		if (consistent2.length) {
			awards.push({
				type: 'consistent-2',
				text: 'Get the same position two days in a row',
				dates: consistent2.map(({leaderboards}) => leaderboards[1])
			});
		}
		const consistent3 = positionGroups.filter(({position, length}) => position > 3 && length >= 3);
		if (consistent3.length) {
			awards.push({
				type: 'consistent-3',
				text: 'Get the same position three days in a row',
				dates: consistent3.map(({leaderboards}) => leaderboards[2])
			});
		}
		const consistent4 = positionGroups.filter(({position, length}) => position > 3 && length >= 4);
		if (consistent4.length) {
			awards.push({
				type: 'consistent-4',
				text: 'Get the same position four days in a row',
				dates: consistent4.map(({leaderboards}) => leaderboards[3])
			});
		}
		const consistent5 = positionGroups.filter(({position, length}) => position > 3 && length >= 5);
		if (consistent5.length) {
			awards.push({
				type: 'consistent-5',
				text: 'Get the same position five days in a row',
				dates: consistent5.map(({leaderboards}) => leaderboards[4])
			});
		}

		// Podium
		if (podiumGroupsUnordered.length) {
			awards.push({
				type: 'podium',
				text: 'Unlock third, second, and first place awards',
				dates: podiumGroupsUnordered.map(group => group[2])
			});
		}

		// Podium climbing
		if (podiumGroups.length) {
			awards.push({
				type: 'podium-climbing',
				text: 'Unlock third, second, then first place awards in order',
				dates: podiumGroups.map(group => group[2])
			});
		}

		// Half time
		const halfTimes = timeDifferences.filter(({timeMultiplier}) => timeMultiplier <= 0.5);
		if (halfTimes.length) {
			awards.push({
				type: 'half-time',
				text: 'Half your completion time from one day to the next',
				dates: halfTimes.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Quarter time
		const quarterTimes = timeDifferences.filter(({timeMultiplier}) => timeMultiplier <= 0.25);
		if (quarterTimes.length) {
			awards.push({
				type: 'quarter-time',
				text: 'Quarter your completion time from one day to the next',
				dates: quarterTimes.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Double time
		const doubleTimes = timeDifferences.filter(({timeMultiplier}) => timeMultiplier >= 2);
		if (doubleTimes.length) {
			awards.push({
				type: 'double-time',
				text: 'Double your completion time from one day to the next',
				dates: doubleTimes.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Sub-two-minutes
		const sub120s = times.filter(time => time.totalSeconds !== null && time.totalSeconds < 120);
		if (sub120s.length) {
			awards.push({
				type: 'sub-120',
				text: 'Complete a puzzle in less than two minutes',
				dates: sub120s.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Sub-minute
		const sub60s = times.filter(time => time.totalSeconds !== null && time.totalSeconds < 60);
		if (sub60s.length) {
			awards.push({
				type: 'sub-60',
				text: 'Complete a puzzle in less than a minute',
				dates: sub60s.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Sub-45-seconds
		const sub45s = times.filter(time => time.totalSeconds !== null && time.totalSeconds < 45);
		if (sub45s.length) {
			awards.push({
				type: 'sub-45',
				text: 'Complete a puzzle in less than 45 seconds',
				dates: sub45s.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Sub-30-seconds
		const sub30s = times.filter(time => time.totalSeconds !== null && time.totalSeconds < 30);
		if (sub30s.length) {
			awards.push({
				type: 'sub-30',
				text: 'Complete a puzzle in less than 30 seconds',
				dates: sub30s.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Sub-20-seconds
		const sub20s = times.filter(time => time.totalSeconds !== null && time.totalSeconds < 20);
		if (sub20s.length) {
			awards.push({
				type: 'sub-20',
				text: 'Complete a puzzle in less than 20 seconds',
				dates: sub20s.map(({leaderboard}) => leaderboard.date)
			});
		}

		// 5-minutes
		const over300s = times.filter(time => time.totalSeconds >= 300);
		if (over300s.length) {
			awards.push({
				type: 'over-300',
				text: 'Complete a puzzle in 5 minutes or more',
				dates: over300s.map(({leaderboard}) => leaderboard.date)
			});
		}

		// 3-day streak
		const threeDayStreaks = playStreaks.filter(({length}) => length >= 3);
		if (threeDayStreaks.length) {
			awards.push({
				type: 'three-day-streak',
				text: 'Play for three days in a row',
				dates: threeDayStreaks.map(({leaderboards}) => leaderboards[2])
			});
		}

		// 7-day streak
		const weekStreaks = playStreaks.filter(({length}) => length >= 7);
		if (weekStreaks.length) {
			awards.push({
				type: 'week-streak',
				text: 'Play for a full week without breaks',
				dates: weekStreaks.map(({leaderboards}) => leaderboards[6])
			});
		}

		// 30-day streak
		const monthStreaks = playStreaks.filter(({length}) => length >= 30);
		if (monthStreaks.length) {
			awards.push({
				type: 'month-streak',
				text: 'Play for a full month (30 days) without breaks',
				dates: monthStreaks.map(({leaderboards}) => leaderboards[29])
			});
		}

		// 90-day streak
		const quarterStreaks = playStreaks.filter(({length}) => length >= 90);
		if (quarterStreaks.length) {
			awards.push({
				type: 'quarter-streak',
				text: 'Play for a full quarter, give that OKR a 1',
				dates: quarterStreaks.map(({leaderboards}) => leaderboards[89])
			});
		}

		// Twinning
		const twinnings = nonPendingTimes.filter(time => {
			return time.leaderboard.times.filter(({position}) => position === time.position).length >= 2;
		});
		if (twinnings.length) {
			awards.push({
				type: 'twinning',
				text: 'Get the same time as another person',
				dates: twinnings.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Tripleting
		const tripletings = nonPendingTimes.filter(time => {
			return time.leaderboard.times.filter(({position}) => position === time.position).length >= 3;
		});
		if (tripletings.length) {
			awards.push({
				type: 'tripleting',
				text: 'Get the same time as two other people',
				dates: tripletings.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Quadrupleting
		const quadrupletings = nonPendingTimes.filter(time => {
			return time.leaderboard.times.filter(({position}) => position === time.position).length >= 4;
		});
		if (quadrupletings.length) {
			awards.push({
				type: 'quadrupleting',
				text: 'Get the same time as three other people',
				dates: quadrupletings.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Arjun TODO
		const arjuns = times.filter(time => time.totalSeconds === 97 || time.totalSeconds === 137);
		if (arjuns.length) {
			awards.push({
				type: 'arjun',
				text: 'Join us',
				dates: arjuns.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Nice
		const nices = times.filter(time => time.totalSeconds === 69);
		if (nices.length) {
			awards.push({
				type: 'nice',
				text: 'Nice',
				dates: nices.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Pi
		const pis = times.filter(time => time.totalSeconds === 194);
		if (pis.length) {
			awards.push({
				type: 'pi',
				text: '3.141 592 653 589 793 238 462 643…',
				dates: pis.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Blaze
		const blazes = times.filter(time => time.totalSeconds === 260);
		if (blazes.length) {
			awards.push({
				type: 'blaze',
				text: 'That\'s illegal and I don\'t condone it',
				dates: blazes.map(({leaderboard}) => leaderboard.date)
			});
		}

		// Beast
		const beasts = timesExcludingToday.filter(({position}) => position === 6);
		if (beasts.length >= 3) {
			const unlockDates = beasts.filter((_, index) => (index + 1) % 3 === 0);
			awards.push({
				type: 'beast',
				text: 'His number is six hundred and sixty-six',
				dates: unlockDates.map(({leaderboard}) => leaderboard.date)
			});
		}

		// 999
		const emergencies = timesExcludingToday.filter(({position}) => position === 9);
		if (emergencies.length >= 3) {
			const unlockDates = emergencies.filter((_, index) => (index + 1) % 3 === 0);
			awards.push({
				type: 'emergency',
				text: 'What\'s your emergency?',
				leaderboard: unlockDates.map(({leaderboard}) => leaderboard.date)
			});
		}

		return awards;
	}

	toJSON() {
		return this.grantedAwards;
	}

};
