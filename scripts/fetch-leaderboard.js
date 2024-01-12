#!/usr/bin/env node
'use strict';

const dotenv = require('dotenv');
const fs = require('fs/promises');
const loadJSON = require('./lib/utils/load-json');
const ivm = require('isolated-vm');

dotenv.config();

fetchLeaderboard();

async function fetchLeaderboard() {
	if (!process.env.NYT_COOKIES) {
		console.error('No NYT_COOKIES environment variable provided');
		process.exit(1);
	}

	console.log('Fetching leaderboard HTML');
	const response = await fetch('https://www.nytimes.com/puzzles/leaderboards', {
		headers: {
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'accept-language': 'en-US,en;q=0.9',
			'cache-control': 'no-cache',
			'pragma': 'no-cache',
			'cookie': process.env.NYT_COOKIES,
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
		}
	});

	if (!response.ok) {
		console.error(`Non-200 status code returned by the leaderboard page: ${response.status}`);
		process.exit(1);
	}

	const html = await response.text();
	const matches = html.match(/<script[^>]+>\s*window\.data\s*=\s*\{(?<js>[^<]*)\s*\}<\/script>/i);
	if (!matches?.groups?.js) {
		console.error('Couldn\'t find the leaderboard JavaScript in the page HTML');
		process.exit(1);
	}

	// This is so very gross
	const isolate = new ivm.Isolate({memoryLimit: 128});
	const context = isolate.createContextSync();
	const sandbox = context.global;
	sandbox.setSync('global', sandbox.derefInto());

	let sandboxOutput;
	sandbox.setSync('output', data => {
		sandboxOutput = data;
	});

	console.log(context.evalSync(`output(JSON.stringify({${matches.groups.js}}))`));
	if (typeof sandboxOutput !== 'string') {
		console.error('Couldn\'t evaluate the leaderboard JavaScript');
		process.exit(1);
	}
	const scoreData = JSON.parse(sandboxOutput);

	const date = scoreData.printDate ? parseDate(scoreData.printDate) : null;

	const parsedScores = scoreData.scoreList
		.filter(score => !score.isMe)
		.map(score => {
			const time = score?.solveTime ? parseTime(score.solveTime) : null;
			return {
				name: score?.name || 'Unknown',
				scrapeTime: null,
				seconds: time ? (time.minutes * 60) + time.seconds : null
			};
		});
	console.log('Scores parsed:');
	parsedScores.forEach(({name, seconds}) => console.log(`${name}: ${seconds}s`));

	const directory = `${__dirname}/../data/leaderboards`;
	const filePath = `${directory}/${date}.json`;

	console.log(`Loading any existing scores for ${date}`);
	const existingScores = await loadJSON(filePath).catch(() => []);
	const existingScrapeTimes = Object.fromEntries(existingScores.map(score => ([
		score.name,
		score.scrapeTime
	])));

	console.log(`Resolving scrape times for ${date}`);
	const now = new Date(Date.now()).toISOString();
	const scores = parsedScores.map(score => {
		if (score.seconds) {
			if (existingScrapeTimes[score.name]) {
				score.scrapeTime = existingScrapeTimes[score.name];
			} else {
				score.scrapeTime = now;
			}
		} else {
			score.scrapeTime = null;
		}
		return score;
	});

	console.log(`Saving leaderboard for ${date}`);
	await fs.mkdir(directory, {recursive: true});
	await fs.writeFile(filePath, JSON.stringify(scores, null, '\t'));
}

function parseDate(string) {
	const timestamp = Date.parse(`${string} EST`);
	const date = timestamp ? new Date(timestamp) : null;
	return date.toISOString().split('T')[0];
}

function parseTime(string) {
	if (/^\d+:\d+$/.test(string)) {
		const [minutes, seconds] = string.split(':');
		return {
			minutes: parseInt(minutes, 10),
			seconds: parseInt(seconds, 10)
		};
	}
	return null;
}
