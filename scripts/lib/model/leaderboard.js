'use strict';

const Time = require('./time');

module.exports = class Leaderboard {
	constructor(date) {
		this.date = date;
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
			if (timeA.totalSeconds === null) {
				return 1;
			}
			if (timeB.totalSeconds === null) {
				return -1;
			}
			if (timeB.totalSeconds === null && timeA.totalSeconds === null) {
				return 0;
			}
			if (timeA.totalSeconds < timeB.totalSeconds) {
				return -1;
			}
			if (timeA.totalSeconds > timeB.totalSeconds) {
				return 1;
			}
			return 0;
		});
		let position = 0;
		let previousTime;
		for (const time of this.times) {
			if (time.isPending) {
				time.position = null;
			} else if (previousTime && previousTime.totalSeconds === time.totalSeconds) {
				time.position = position;
			} else {
				position += 1;
				time.position = position;
			}
			previousTime = time;
		}
	}

	get mean() {
		const seconds = this.times
			.filter((time) => time < Number.POSITIVE_INFINITY)
			.map((time) => time.totalSeconds);
		if (!seconds.length) {
			return new Time();
		}
		return new Time({
			seconds: Math.ceil(seconds.reduce((numA, numB) => numA + numB, 0) / seconds.length)
		});
	}

	get best() {
		return this.times.length ? this.times[0] : null;
	}

	get diff() {
		const seconds = this.times
			.filter((time) => time < Number.POSITIVE_INFINITY)
			.map((time) => time.totalSeconds);
		if (seconds.length <= 1) {
			return new Time();
		}
		return new Time({
			seconds: seconds[seconds.length - 1] - seconds[0]
		});
	}

	get dateObject() {
		const timestamp = Date.parse(`${this.date}`);
		return timestamp ? new Date(timestamp) : null;
	}

	get day() {
		const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		const date = this.dateObject;
		return date ? days[date.getUTCDay()] : null;
	}

	get dayOfMonth() {
		const date = this.dateObject;
		return date ? date.getUTCDate() : null;
	}

	get month() {
		const date = this.dateObject;
		return date ? date.getUTCMonth() + 1 : null;
	}

	get year() {
		const date = this.dateObject;
		return date ? date.getUTCFullYear() : null;
	}

	get timesByScrapeTime() {
		if (this.memo.timesByScrapeTime) {
			return this.memo.timesByScrapeTime;
		}
		this.memo.timesByScrapeTime = this.times
			.filter((time) => time.scrapeTime !== null)
			.sort((timeA, timeB) => {
				if (timeA.scrapeTime < timeB.scrapeTime) {
					return -1;
				}
				if (timeA.scrapeTime > timeB.scrapeTime) {
					return 1;
				}
				return 0;
			});
		return this.memo.timesByScrapeTime;
	}

	get timesGroupedByScrapeTime() {
		if (this.memo.timesGroupedByScrapeTime) {
			return this.memo.timesGroupedByScrapeTime;
		}
		this.memo.timesGroupedByScrapeTime = Object.values(
			this.timesByScrapeTime.reduce((groups, time) => {
				groups[time.scrapeTime] = groups[time.scrapeTime] || [];
				groups[time.scrapeTime].push(time);
				return groups;
			}, {})
		);
		return this.memo.timesGroupedByScrapeTime;
	}

	get timesGroupedBySequence() {
		if (this.memo.timesGroupedBySequence) {
			return this.memo.timesGroupedBySequence;
		}
		this.memo.timesGroupedBySequence = [...this.times].reduce(
			(streaks, time) => {
				let currentStreak = streaks.pop();
				if (time.isPending) {
					streaks.push(currentStreak);
					currentStreak = {
						times: [],
						length: 0
					};
				} else if (
					currentStreak.times.length &&
					time.totalSeconds ===
						currentStreak.times[currentStreak.times.length - 1].totalSeconds + 1
				) {
					currentStreak.times.push(time);
					currentStreak.length += 1;
				} else if (
					currentStreak.times.length &&
					time.totalSeconds ===
						currentStreak.times[currentStreak.times.length - 1].totalSeconds
				) {
					currentStreak.times.push(time);
				} else {
					streaks.push(currentStreak);
					currentStreak = {
						times: [time],
						length: 1
					};
				}
				streaks.push(currentStreak);
				return streaks;
			},
			[
				{
					times: [],
					length: 0
				}
			]
		);
		return this.memo.timesGroupedBySequence;
	}

	toJSON() {
		return {
			title: this.date,
			date: this.date,
			times: this.times,
			best: this.best,
			mean: this.mean,
			diff: this.diff
		};
	}
};
