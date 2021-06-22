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

		// Sort times by date
		person.times.sort(sortByProperty('date'));

		// Calculate a person's awards
		const awards = [];

		// Work out placements
		const placements = leaderboards.map(board => {
			const placement = board.times.find(time => time.name === person.name);
			return {
				date: board.date,
				placement: board.times.indexOf(placement) + 1
			};
		});

		// Ignore the most recent date, because it will change over the day
		placements.pop();

		// Gold
		const gold = placements.find(({placement}) => placement === 1);
		if (gold) {
			awards.push({
				type: 'gold',
				text: 'You got the fastest time on a day',
				date: gold.date
			});
		}

		// Silver
		const silver = placements.find(({placement}) => placement === 2);
		if (silver) {
			awards.push({
				type: 'silver',
				text: 'You got the second fastest time on a day',
				date: silver.date
			});
		}

		// Bronze
		const bronze = placements.find(({placement}) => placement === 3);
		if (bronze) {
			awards.push({
				type: 'bronze',
				text: 'You got the third fastest time on a day',
				date: bronze.date
			});
		}

		// Sub-two-minutes
		const sub120 = person.times.find(time => time.fullTimeInSeconds < 120);
		if (sub120) {
			awards.push({
				type: 'sub-120',
				text: 'Completed in less than two minutes',
				date: sub120.date
			});
		}

		// Sub-minute
		const sub60 = person.times.find(time => time.fullTimeInSeconds < 60);
		if (sub60) {
			awards.push({
				type: 'sub-60',
				text: 'Completed in less than a minute',
				date: sub60.date
			});
		}

		// Sub-45-seconds
		const sub45 = person.times.find(time => time.fullTimeInSeconds < 45);
		if (sub45) {
			awards.push({
				type: 'sub-45',
				text: 'Completed in less than 45 seconds',
				date: sub45.date
			});
		}

		// Sub-30-seconds
		const sub30 = person.times.find(time => time.fullTimeInSeconds < 30);
		if (sub30) {
			awards.push({
				type: 'sub-30',
				text: 'Completed in less than 30 seconds',
				date: sub30.date
			});
		}

		// 5-minutes
		const over300 = person.times.find(time => time.fullTimeInSeconds >= 300);
		if (over300) {
			awards.push({
				type: 'over-300',
				text: 'Completed in 5 minutes or more',
				date: over300.date
			});
		}

		// Arjun
		const arjun = (
			person.times.find(time => time.fullTimeInSeconds === 97) ||
			person.times.find(time => time.fullTimeInSeconds === 137)
		);
		if (arjun) {
			awards.push({
				type: 'arjun',
				text: 'Join us',
				date: arjun.date
			});
		}

		// Nice
		const nice = person.times.find(time => time.fullTimeInSeconds === 69);
		if (nice) {
			awards.push({
				type: 'nice',
				text: 'Nice',
				date: nice.date
			});
		}

		// Generate the person page
		const personFrontMatter = {
			title: person.name,
			times: person.times.reverse(),
			average,
			best,
			awards
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
