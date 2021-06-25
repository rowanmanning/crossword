#!/usr/bin/env node
'use strict';

const fs = require('fs/promises');
const loadAllJSON = require('./lib/utils/load-all-json');
const Leaderboard = require('./lib/model/leaderboard');
const Person = require('./lib/model/person');
const Time = require('./lib/model/time');

generatePages();

async function generatePages() {

	console.log('Loading raw leaderboard JSON');
	const files = await loadAllJSON(`${__dirname}/../data/leaderboards`);

	// Gather up leaderboards
	const leaderboards = new Map();
	const people = new Map();

	// Create leaderboard and people representations
	for (const {name: date, data} of files) {

		// Create the leaderboard if it doesn't exist
		if (!leaderboards.has(date)) {
			leaderboards.set(date, new Leaderboard(date));
		}
		const leaderboard = leaderboards.get(date);

		// Loop over people for leaderboard data
		for (const {name, seconds} of data) {
			const time = new Time(seconds);

			// Create person if they don't exist
			if (!people.has(name)) {
				people.set(name, new Person(name));
			}
			const person = people.get(name);

			// Set the person and leaderboard on the time
			time.leaderboard = leaderboard;
			time.person = person;
		}

	}

	// Save all of the leaderboard pages
	console.log('Creating leaderboard pages');
	for (const leaderboard of leaderboards.values()) {
		await fs.writeFile(
			`${__dirname}/../content/leaderboards/${leaderboard.date}.md`,
			JSON.stringify(leaderboard, null, 2)
		);
	}

	// Save all of the people pages
	console.log('Creating people pages');
	for (const person of people.values()) {
		await fs.writeFile(
			`${__dirname}/../content/people/${person.name}.md`,
			JSON.stringify(person, null, 2)
		);
	}

}
