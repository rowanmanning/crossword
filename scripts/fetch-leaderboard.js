#!/usr/bin/env node
'use strict';

const dotenv = require('dotenv');
const fs = require('node:fs/promises');
const loadJSON = require('./lib/utils/load-json');
const JSON5 = require('json5');

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
			accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'accept-language': 'en-US,en;q=0.9',
			'cache-control': 'no-cache',
			pragma: 'no-cache',
			cookie: process.env.NYT_COOKIES,
			'user-agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
		}
	});

	if (!response.ok) {
		console.error(`Non-200 status code returned by the leaderboard page: ${response.status}`);
		process.exit(1);
	}

	// Pluck the scores out of some JavaScript
	const html = await response.text();
	const matches = html.match(/<script[^>]+>\s*window\.data\s*=\s*\{(?<js>[^<]*)\s*\}<\/script>/i);
	if (!matches?.groups?.js) {
		console.error("Couldn't find the leaderboard JavaScript in the page HTML");
		process.exit(1);
	}
	const scoreData = JSON5.parse(`{${matches.groups.js}}`);

	const date = scoreData.printDate ? parseDate(scoreData.printDate) : null;

	const parsedScores = scoreData.scoreList
		.filter((score) => !score.isMe)
		.map((score) => {
			const time = score?.solveTime ? parseTime(score.solveTime) : null;
			return {
				name: score?.name || 'Unknown',
				scrapeTime: null,
				seconds: time ? time.minutes * 60 + time.seconds : null
			};
		});
	console.log('Scores parsed:');
	for (const { name, seconds } of parsedScores) {
		console.log(`${name}: ${seconds}s`);
	}

	const directory = `${__dirname}/../data/leaderboards`;
	const filePath = `${directory}/${date}.json`;

	console.log(`Loading any existing scores for ${date}`);
	const existingScores = await loadJSON(filePath).catch(() => []);
	const existingScrapeTimes = Object.fromEntries(
		existingScores.map((score) => [score.name, score.scrapeTime])
	);

	console.log(`Resolving scrape times for ${date}`);
	const now = new Date(Date.now()).toISOString();
	const scores = parsedScores.map((score) => {
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
	await fs.mkdir(directory, { recursive: true });
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
			minutes: Number.parseInt(minutes, 10),
			seconds: Number.parseInt(seconds, 10)
		};
	}
	return null;
}
