'use strict';

const Time = require('./time');

module.exports = class Leaderboard {

	constructor(date) {
		this.date = date;
		this.times = [];
	}

	addTime(person, seconds) {
		this.times.push({
			person,
			time: new Time(seconds)
		});
		this.sortTimes();
	}

	sortTimes() {
		this.times.sort((entryA, entryB) => {
			if (entryA.time < entryB.time) {
				return -1;
			}
			if (entryA.time > entryB.time) {
				return 1;
			}
			return 0;
		});
	}

	toJSON() {
		return {
			title: this.date,
			date: this.date,
			times: this.times.map(({person, time}) => ({
				person: person.name,
				time
			}))
		};
	}

};
