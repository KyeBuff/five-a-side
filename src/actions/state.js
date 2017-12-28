const actionTypes = {
	SET_PLAYERS: "[Teams] setPlayers",
}

const setPlayers = (players) => ({
	type: actionTypes.SET_PLAYERS,
	players,
});

export {
	setPlayers,
}