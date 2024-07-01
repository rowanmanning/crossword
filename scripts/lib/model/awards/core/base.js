'use strict';

module.exports = class BaseAward {
	constructor(person) {
		this.person = person;
	}

	static get title() {
		throw new Error(`${this.name}.title must be implemented`);
	}

	static get type() {
		throw new Error(`${this.name}.type must be implemented`);
	}

	static get text() {
		throw new Error(`${this.name}.text must be implemented`);
	}

	get dates() {
		if (this._dates) {
			return this._dates;
		}
		this._dates = this.calculateDates();
		return this._dates;
	}

	get isUnlocked() {
		return this.dates.length > 0;
	}

	calculateDates() {
		throw new Error(`${this.constructor.name}.calculateDates must be implemented`);
	}

	toJSON() {
		return {
			title: this.constructor.title,
			type: this.constructor.type,
			text: this.constructor.text,
			dates: this.dates
		};
	}

	static getUnlocks(people) {
		return people
			.filter((person) => person.awards.find((award) => award instanceof this))
			.map((person) => person.awards.find((award) => award instanceof this))
			.map((award) => ({
				person: award.person.name,
				count: award.dates.length,
				dates: award.dates
			}))
			.sort((unlockA, unlockB) => {
				if (unlockA.count < unlockB.count) {
					return 1;
				}
				if (unlockA.count > unlockB.count) {
					return -1;
				}
				if (unlockA.dates[0] > unlockB.dates[0]) {
					return 1;
				}
				if (unlockA.dates[0] < unlockB.dates[0]) {
					return -1;
				}
				if (unlockA.person.toLowerCase() > unlockB.person.toLowerCase()) {
					return 1;
				}
				if (unlockA.person.toLowerCase() < unlockB.person.toLowerCase()) {
					return -1;
				}
				return 0;
			});
	}
};
