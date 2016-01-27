function handleInput(){
	if (input.space) {
		createHook(player.position.x + player.width / 2);
	}

	if(input.p) {
		isRunning = false;
	}

	if (input.s) {
		isRunning = true;
	}
}