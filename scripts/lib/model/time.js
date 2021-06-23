'use strict';

module.exports = class Time {

	constructor(seconds) {
		this.totalSeconds = seconds;
	}

	get minutes() {
		return Math.floor(this.totalSeconds / 60);
	}

	get seconds() {
		return this.totalSeconds % 60;
	}

	get isPending() {
		return (typeof this.totalSeconds !== 'number');
	}

	toJSON() {
		if (this.isPending) {
			return null;
		}
		return {
			minutes: this.minutes,
			seconds: this.seconds,
			totalSeconds: this.totalSeconds
		};
	}

	valueOf() {
		if (this.isPending) {
			return Infinity;
		}
		return this.totalSeconds;
	}

};
