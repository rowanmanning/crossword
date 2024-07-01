'use strict';

const fs = require('node:fs/promises');

module.exports = async function loadJSON(filePath) {
	return JSON.parse(await fs.readFile(filePath, 'utf-8'));
};
