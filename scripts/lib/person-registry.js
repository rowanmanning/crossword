'use strict';

const Person = require('./model/person');

module.exports = class PersonRegistry {
	constructor() {
		this.people = new Set();
		this.peopleMap = new Map();
	}

	add(person) {
		if (!(person instanceof Person)) {
			throw new TypeError('Only Person instances can be added to a PersonRegistry');
		}
		this.people.add(person);
		this.peopleMap.set(person.name, person);
	}

	get(name) {
		return this.peopleMap.get(name);
	}
};
