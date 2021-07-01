'use strict';

const Awards = require('./awards');
const Time = require('./time');

module.exports = class Person {

	constructor(name) {
		this.name = name;
		this.times = [];
		this.awards = new Awards(this);
	}

	addTime(time) {
		this.times.push(time);
		this.sortTimes();
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

	get best() {
		return this.times.reduce((best, current) => {
			return (current < best ? current : best);
		});
	}

	get mean() {
		const seconds = this.times.filter(time => time < Infinity).map(time => time.totalSeconds);
		if (!seconds.length) {
			return new Time();
		}
		return new Time(Math.ceil(seconds.reduce((numA, numB) => numA + numB, 0) / seconds.length));
	}

	toJSON() {
		const awards = this.awards.toJSON();
		return {
			title: this.name,
			name: this.name,
			times: this.times,
			best: this.best,
			mean: this.mean,
			awardCount: awards.reduce((total, {dates}) => total + dates.length, 0),
			awards
		};
	}

};
