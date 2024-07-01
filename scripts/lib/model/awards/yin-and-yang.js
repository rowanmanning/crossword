'use strict';

const BaseAward = require('./core/base');

module.exports = class YinAndYangAward extends BaseAward {
	static get title() {
		return 'Yin and Yang';
	}

	static get type() {
		return 'yin-and-yang';
	}

	static get text() {
		return 'Get the same time as another person but with flipped seconds';
	}

	calculateDates() {
		const instances = this.person.times.filter((time) => {
			return (
				time.leaderboard.times.filter(({ minutes, secondsPadded }) => {
					const reversedSeconds = `${secondsPadded}`.split('').reverse().join('');
					return (
						time.minutes === minutes &&
						time.secondsPadded !== secondsPadded &&
						time.secondsPadded === reversedSeconds
					);
				}).length >= 1
			);
		});
		if (instances.length) {
			return instances.map(({ leaderboard }) => leaderboard.date);
		}
		return [];
	}
};
