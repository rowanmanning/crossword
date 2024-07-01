'use strict';

module.exports = class Time {
	constructor({ seconds, isGlitch } = {}) {
		this._leaderboard = null;
		this._person = null;
		this._scrapeTime = null;
		this.isGlitch = Boolean(isGlitch);
		this.totalSeconds = seconds;
		this.position = null;
	}

	get minutes() {
		return this.isPending ? null : Math.floor(this.totalSeconds / 60);
	}

	get seconds() {
		return this.isPending ? null : this.totalSeconds % 60;
	}

	get secondsPadded() {
		return this.isPending ? null : `${this.seconds < 10 ? '0' : ''}${this.seconds}`;
	}

	get isPending() {
		return typeof this.totalSeconds !== 'number';
	}

	set leaderboard(value) {
		this._leaderboard = value;
		this._leaderboard.addTime(this);
	}

	get leaderboard() {
		return this._leaderboard;
	}

	set person(value) {
		this._person = value;
		this._person.addTime(this);
	}

	get person() {
		return this._person;
	}

	set scrapeTime(value = null) {
		this._scrapeTime = value === null ? null : new Date(value);
	}

	get scrapeTime() {
		return this._scrapeTime;
	}

	toJSON() {
		return {
			person: this.person ? this.person.name : null,
			leaderboard: this.leaderboard ? this.leaderboard.date : null,
			minutes: this.minutes,
			seconds: this.seconds,
			totalSeconds: this.totalSeconds,
			position: this.position,
			scrapeTime: this.scrapeTime ? this.scrapeTime.toISOString() : null,
			isPending: this.isPending
		};
	}

	valueOf() {
		if (this.isPending) {
			return Number.POSITIVE_INFINITY;
		}
		return this.totalSeconds;
	}
};
