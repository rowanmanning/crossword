'use strict';

const Awards = require('./awards');
const Time = require('./time');

module.exports = class Person {

	constructor(name) {
		this.name = name;
		this.times = [];
		this.memo = {};
	}

	addTime(time) {
		this.times.push(time);
		this.sortTimes();
		this.memo = {};
	}

	sortTimes() {
		this.times.sort((timeA, timeB) => {
			if (timeA.leaderboard.date < timeB.leaderboard.date) {
				return 1;
			}
			if (timeA.leaderboard.date > timeB.leaderboard.date) {
				return -1;
			}
			return 0;
		});
	}

	get timesExcludingGlitched() {
		return this.times.filter(({isGlitch}) => !isGlitch);
	}

	get timesExcludingToday() {
		if (this.memo.timesExcludingToday) {
			return this.memo.timesExcludingToday;
		}
		const times = [...this.times].reverse();
		this.memo.timesExcludingToday = times.slice(0, times.length - 1);
		return this.memo.timesExcludingToday;
	}

	get timesExcludingPending() {
		if (this.memo.timesExcludingPending) {
			return this.memo.timesExcludingPending;
		}
		const times = [...this.times].reverse();
		this.memo.timesExcludingPending = times.filter(({isPending}) => !isPending);
		return this.memo.timesExcludingPending;
	}

	get timesGroupedByPosition() {
		if (this.memo.timesGroupedByPosition) {
			return this.memo.timesGroupedByPosition;
		}
		this.memo.timesGroupedByPosition = this.timesExcludingToday.reduce((groups, time) => {
			const group = groups.length ? groups.pop() : null;
			if (group && group.position === time.position) {
				group.times.push(time);
				group.length = group.times.length;
				groups.push(group);
			} else {
				if (group) {
					groups.push(group);
				}
				groups.push({
					position: time.position,
					length: 1,
					times: [time]
				});
			}
			return groups;
		}, []);
		return this.memo.timesGroupedByPosition;
	}

	get timesGroupedByPlayStreak() {
		if (this.memo.timesGroupedByPlayStreak) {
			return this.memo.timesGroupedByPlayStreak;
		}
		this.memo.timesGroupedByPlayStreak = [...this.times].reverse()
			.reduce((streaks, time) => {
				let currentStreak = streaks.pop();
				if (time.isPending) {
					streaks.push(currentStreak);
					currentStreak = [];
				} else {
					currentStreak.push(time);
				}
				streaks.push(currentStreak);
				return streaks;
			}, [[]])
			.map(streak => {
				return {
					length: streak.length,
					times: streak
				};
			});
		return this.memo.timesGroupedByPlayStreak;
	}

	get timeDifferences() {
		if (this.memo.timeDifferences) {
			return this.memo.timeDifferences;
		}
		this.memo.timeDifferences = [...this.times].reverse()
			.filter(time => !time.isPending)
			.reduce((differences, time, index, filteredTimes) => {
				const previous = filteredTimes[index - 1];
				if (previous) {
					const from = previous.totalSeconds;
					const to = time.totalSeconds;
					const timeDifference = to - from;
					const timeMultiplier = Math.round((to / from) * 100) / 100;
					differences.push({
						timeDifference,
						timeMultiplier,
						time
					});
				}
				return differences;
			}, []);
		return this.memo.timeDifferences;
	}

	get timesInFirstScraping() {
		if (this.memo.timesInFirstScraping) {
			return this.memo.timesInFirstScraping;
		}
		this.memo.timesInFirstScraping = [...this.times].reverse().filter(time => {
			const timesGroupedByScrapeTime = time.leaderboard.timesGroupedByScrapeTime;
			return (timesGroupedByScrapeTime[0] && timesGroupedByScrapeTime[0].includes(time));
		});
		return this.memo.timesInFirstScraping;
	}

	get timesInLastScraping() {
		if (this.memo.timesInLastScraping) {
			return this.memo.timesInLastScraping;
		}
		this.memo.timesInLastScraping = this.timesExcludingToday.filter(time => {
			const timesGroupedByScrapeTime = time.leaderboard.timesGroupedByScrapeTime;
			return (
				timesGroupedByScrapeTime.length > 1 &&
				timesGroupedByScrapeTime[timesGroupedByScrapeTime.length - 1].includes(time)
			);
		});
		return this.memo.timesInLastScraping;
	}

	get best() {
		if (this.memo.best) {
			return this.memo.best;
		}
		this.memo.best = this.timesExcludingGlitched.reduce((best, current) => {
			return (current < best ? current : best);
		});
		return this.memo.best;
	}

	get mean() {
		if (this.memo.mean) {
			return this.memo.mean;
		}
		const seconds = this.timesExcludingGlitched
			.filter(time => time < Infinity)
			.map(time => time.totalSeconds);

		if (!seconds.length) {
			this.memo.mean = new Time();
			return this.memo.mean;
		}
		this.memo.mean = new Time({
			seconds: Math.ceil(seconds.reduce((numA, numB) => numA + numB, 0) / seconds.length)
		});
		return this.memo.mean;
	}

	get median() {
		if (this.memo.median) {
			return this.memo.median;
		}

		const seconds = this.timesExcludingGlitched
			.filter(time => time < Infinity)
			.map(time => time.totalSeconds);


		if (!seconds.length) {
			this.memo.median = new Time();
			return this.memo.median;
		}

		if (seconds.length % 2) {
			this.memo.median = new Time({
				seconds: seconds[Math.floor(seconds.length / 2)]
			})

			return this.memo.median;
		}

		this.memo.median = new Time({
			seconds: (seconds[seconds.length / 2 - 1] + seconds[seconds.length / 2]) / 2
		});
		return this.memo.median;
	}

	get awards() {
		if (this.memo.awards) {
			return this.memo.awards;
		}
		this.memo.awards = [];
		for (const Award of Object.values(Awards)) {
			const award = new Award(this);
			if (award.isUnlocked) {
				this.memo.awards.push(award);
			}
		}
		return this.memo.awards;
	}

	toJSON() {
		return {
			title: this.name,
			name: this.name,
			times: this.times,
			best: this.best,
			mean: this.mean,
			awardCount: this.awards.reduce((total, {dates}) => total + dates.length, 0),
			awards: this.awards
		};
	}

};
