var spawnedHook = false;

function handleInput() {
	if (input.space && !spawnedHook) {
		createHook(player.position.x + player.width / 2);
	}
	spawnedHook = input.space;

	if (input.p) {
		isRunning = false;
	}

	if (input.s) {
		isRunning = true;
	}
}