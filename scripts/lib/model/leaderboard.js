'use strict';

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

	toJSON() {
		return {
			title: this.date,
			date: this.date,
			times: this.times
		};
	}

};
