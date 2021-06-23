#!/usr/bin/env node
'use strict';

const dotenv = require('dotenv');
const fs = require('fs/promises');
const got = require('got');
const {JSDOM} = require('jsdom');

dotenv.config();

fetchLeaderboard();

async function fetchLeaderboard() {
	if (!process.env.NYT_COOKIES) {
		console.error('No NYT_COOKIES environment variable provided');
		process.exit(1);
	}

	console.log('Fetching leaderboard HTML');
	const response = await got('https://www.nytimes.com/puzzles/leaderboards', {
		headers: {
			accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'accept-language': 'en-US,en;q=0.9',
			'cache-control': 'no-cache',
			pragma: 'no-cache',
			cookie: process.env.NYT_COOKIES,
			'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
		}
	});

	if (response.statusCode !== 200) {
		console.error(`Non-200 status code returned by the leaderboard page: ${response.statusCode}`);
		process.exit(1);
	}

	console.log('Parsing leaderboard HTML');
	const {window} = new JSDOM(response.body);
	const {document} = window;

	const dateElement = document.querySelector('.lbd-type__date');
	const date = dateElement ? parseDate(dateElement.textContent.trim()) : null;

	const scores = [...document.querySelectorAll('.lbd-score')]
		.filter(score => {
			return !score.querySelector('.lbd-score__you');
		})
		.map(score => {
			const nameElement = score.querySelector('.lbd-score__name');
			const timeElement = score.querySelector('.lbd-score__time');
			const name = nameElement ? nameElement.textContent.trim() : 'Unknown';
			const time = timeElement ? parseTime(timeElement.textContent.trim()) : null;
			return {
				name,
				seconds: time ? (time.minutes * 60) + time.seconds : null
			};
		});

	console.log(`Saving leaderboard for ${date}`);
	const directory = `${__dirname}/../data/leaderboards`;
	const filePath = `${directory}/${date}.json`;
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
