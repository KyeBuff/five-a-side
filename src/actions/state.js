const actionTypes = {
	SET_PLAYER: "[Players] setPlayer",
	UPDATE_TEAM_NAME: "[Teams][Team] updateTeamName",
	UPDATE_PLAYER_NAME: "[Teams][Team][Players][Player] updatePlayerName",
	REMOVE_PLAYER: "[Teams][Team][Players][Player] removePlayer",
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

const updatePlayerName = (playerName, timestamp) => ({
	type: actionTypes.UPDATE_PLAYER_NAME,
	playerName,
	timestamp,
});

const removePlayer = (timestamp, teamID) => ({
	type: actionTypes.REMOVE_PLAYER,
	timestamp,
	teamID
});

export {
	setPlayer,
	updateTeamName,
	updatePlayerName,
	removePlayer
}