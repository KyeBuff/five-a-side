const actionTypes = {
	SET_PLAYER: "[Teams] setPlayer",
	UPDATE_TEAM_NAME: "[Teams][Team] updateTeamName",
	UPDATE_PLAYER_NAME: "[Teams][Team][Players][Player] updatePlayerName",
}

const setPlayer = (player) => ({
	type: actionTypes.SET_PLAYER,
	player,
});

const updateTeamName = (teamName, id) => ({
	type: actionTypes.UPDATE_TEAM_NAME,
	teamName,
	id,
});

const updatePlayerName = (playerName, id) => ({
	type: actionTypes.UPDATE_PLAYER_NAME,
	playerName,
	id,
});

export {
	setPlayer,
	updateTeamName,
	updatePlayerName
}