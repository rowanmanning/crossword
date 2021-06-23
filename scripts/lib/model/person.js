'use strict';

const Awards = require('./awards');
const Time = require('./time');

module.exports = class Person {

	constructor(name) {
		this.name = name;
		this.times = [];
		this.awards = new Awards(this);
	}

	addTime(leaderboard, seconds) {
		this.times.push({
			leaderboard,
			time: new Time(seconds)
		});
		this.sortTimes();
	}

	sortTimes() {
		this.times.sort((entryA, entryB) => {
			if (entryA.leaderboard.date < entryB.leaderboard.date) {
				return 1;
			}
			if (entryA.leaderboard.date > entryB.leaderboard.date) {
				return -1;
			}
			return 0;
		});
	}

	get best() {
		return this.times.reduce((best, current) => {
			return (current.time < best.time ? current : best);
		});
	}

	get mean() {
		const seconds = this.times.filter(({time}) => time < Infinity).map(({time}) => time.totalSeconds);
		if (!seconds.length) {
			return {time: new Time()};
		}
		return {
			time: new Time(Math.ceil(seconds.reduce((numA, numB) => numA + numB, 0) / seconds.length))
		};
	}

	get placements() {
		return this.times.map(({leaderboard, time}) => {
			const placement = leaderboard.times.find(({person}) => person.name === this.name);
			return {
				leaderboard,
				time,
				placement: leaderboard.times.indexOf(placement) + 1
			};
		});
	}

	toJSON() {
		return {
			title: this.name,
			name: this.name,
			times: this.times.map(this.constructor.flattenTime),
			best: this.constructor.flattenTime(this.best),
			mean: this.mean,
			awards: this.awards
		};
	}

	static flattenTime({leaderboard, time}) {
		return {
			leaderboard: leaderboard.date,
			time
		};
	}

};
