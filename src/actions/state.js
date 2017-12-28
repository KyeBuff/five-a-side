const actionTypes = {
	SET_PLAYER: "[Teams] setPlayer",
}

const setPlayer = (player) => ({
	type: actionTypes.SET_PLAYER,
	player,
});

export {
	setPlayer,
}