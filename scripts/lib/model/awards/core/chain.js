'use strict';

const BaseAward = require('./base');

module.exports = class ChainAward extends BaseAward {
	get chainLength() {
		throw new Error(`${this.constructor.name}.chainLength must be implemented`);
	}

	calculateDates() {
		return this.person.times.reduce((dates, time) => {
			const sequences = time.leaderboard.timesGroupedBySequence.filter(
				({ length }) => length === this.chainLength
			);
			const matchingSequences = sequences.filter(({ times }) => times.includes(time));
			if (matchingSequences.length) {
				dates.push(time.leaderboard.date);
			}
			return dates;
		}, []);
	}
};
