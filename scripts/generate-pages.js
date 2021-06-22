#!/usr/bin/env node
'use strict';

const fs = require('fs/promises');

generatePages();

async function generatePages() {

	console.log('Loading raw leaderboard JSON');
	const dataDirectory = `${__dirname}/../data/leaderboards`;
	const files = await fs.readdir(dataDirectory);

	const mapOfPeople = {};
	const leaderboards = [];

	// Gather data from files
	console.log('Parsing files');
	for (const file of files) {
		const date = file.replace('.json', '');
		const leaderboard = JSON.parse(await fs.readFile(`${dataDirectory}/${file}`, 'utf-8'));
		leaderboards.push({
			date,
			times: leaderboard
		});
		for (const entry of leaderboard) {
			mapOfPeople[entry.name] = mapOfPeople[entry.name] || {
				name: entry.name,
				times: []
			};
			mapOfPeople[entry.name].times.push({
				date,
				time: entry.time,
				fullTimeInSeconds: entry.fullTimeInSeconds
			});
		}
	}

	// Create people pages
	console.log('Creating people pages');
	const peopleFolder = `${__dirname}/../content/people`;
	await fs.mkdir(peopleFolder, {recursive: true});
	for (const person of Object.values(mapOfPeople)) {

		const nonNullTimes = person.times.filter(time => time.time);

		// Work out the person's best time
		let best = null;
		for (const time of nonNullTimes) {
			if (!best || time.fullTimeInSeconds < best.fullTimeInSeconds) {
				best = time;
			}
		}

		// Work out the person's average time
		const allTimesInSeconds = nonNullTimes.map(time => time.fullTimeInSeconds);
		const sumOfAllTimes = allTimesInSeconds.reduce((total, time) => total + time, 0);
		const averageInSeconds = Math.ceil(sumOfAllTimes / allTimesInSeconds.length);
		const average = {
			time: {
				minutes: Math.floor(averageInSeconds / 60),
				seconds: averageInSeconds % 60
			},
			fullTimeInSeconds: averageInSeconds
		};

		const personFrontMatter = {
			title: person.name,
			times: person.times.sort(sortByProperty('date')).reverse(),
			average,
			best
		};
		await fs.writeFile(`${peopleFolder}/${person.name}.md`, `
			${JSON.stringify(personFrontMatter, null, '  ')}
		`.trim().replace(/\t+/g, ''));
	}

	// Create leaderboard pages
	console.log('Creating leaderboard pages');
	const leaderboardsFolder = `${__dirname}/../content/leaderboards`;
	await fs.mkdir(leaderboardsFolder, {recursive: true});
	for (const leaderboard of leaderboards) {
		const leaderboardFrontMatter = {
			title: leaderboard.date,
			date: leaderboard.date,
			times: leaderboard.times.sort(sortByProperty('date'))
		};
		await fs.writeFile(`${leaderboardsFolder}/${leaderboard.date}.md`, `
			${JSON.stringify(leaderboardFrontMatter, null, '  ')}
		`.trim().replace(/\t+/g, ''));
	}

}

function sortByProperty(property) {
	return (itemA, itemB) => {
		if (itemA[property] < itemB[property]) {
			return -1;
		}
		if (itemA[property] > itemB[property]) {
			return 1;
		}
		return 0;
	};
}
