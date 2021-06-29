'use strict';

const Time = require('./time');

module.exports = class Leaderboard {

	constructor(date) {
		this.date = date;
		this.times = [];
	}

	addTime(time) {
		this.times.push(time);
		this.sortTimes();
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
