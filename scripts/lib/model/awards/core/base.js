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

};
