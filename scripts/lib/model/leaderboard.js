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
		const seconds = this.times.filter(time => time < Infinity).map(time => time.totalSeconds);
		if (!seconds.length) {
			return new Time();
		}
		return new Time(Math.ceil(seconds.reduce((numA, numB) => numA + numB, 0) / seconds.length));
	}

	get best() {
		return this.times.length ? this.times[0] : null;
	}

	get diff() {
		const seconds = this.times.filter(time => time < Infinity).map(time => time.totalSeconds);
		if (seconds.length <= 1) {
			return new Time();
		}
		return new Time(seconds[seconds.length - 1] - seconds[0]);
	}

	get day() {
		const days = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		];
		const timestamp = Date.parse(`${this.date}`);
		const date = timestamp ? new Date(timestamp) : null;
		return date ? days[date.getUTCDay()] : null;
	}

	get timesByScrapeTime() {
		if (this.memo.timesByScrapeTime) {
			return this.memo.timesByScrapeTime;
		}
		this.memo.timesByScrapeTime = this.times
			.filter(time => time.scrapeTime !== null)
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
