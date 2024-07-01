import hotkeys from 'hotkeys-js';

// Wait for the DOM to be loaded before doing anything
document.addEventListener('DOMContentLoaded', () => {
	// Find previous / next links
	const prev = document.querySelector('[data-component=prev]');
	const next = document.querySelector('[data-component=next]');

	// Set up shortcuts
	hotkeys.filter = ({ target }) => {
		const { tagName } = target;
		return !(tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA');
	};
	hotkeys('left', () => {
		if (prev) {
			prev.click();
		}
	});
	hotkeys('right', () => {
		if (next) {
			next.click();
		}
	});
});
