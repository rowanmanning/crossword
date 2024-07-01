'use strict';

const fs = require('node:fs/promises');
const loadJSON = require('./load-json');

module.exports = async function loadAllJSON(directoryPath) {
	const fileNames = await fs.readdir(directoryPath);
	return Promise.all(
		fileNames.map(async (fileName) => {
			return {
				fileName,
				name: fileName.replace(/\.json$/, ''),
				data: await loadJSON(`${directoryPath}/${fileName}`)
			};
		})
	);
};
