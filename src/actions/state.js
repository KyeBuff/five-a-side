const actionTypes = {
	SET_PLAYER: "[Players] setPlayer",
	CLEAR_PLAYERS: "[Players/Teams] clearPlayers",
	UPDATE_TEAM_NAME: "[Teams][Team] updateTeamName",
	UPDATE_TEAM_COLOR: "[Teams][Team] updateTeamColor",
	UPDATE_PLAYER_NAME: "[Teams][Team][Players][Player] updatePlayerName",
	REMOVE_PLAYER: "[Teams][Team][Players][Player] removePlayer",
	SET_TEAMS: "[Teams] setTeams",
}

// Action creators

const setPlayer = (player) => ({
	type: actionTypes.SET_PLAYER,
	player,
});

const updateTeamName = (teamName, id) => ({
	type: actionTypes.UPDATE_TEAM_NAME,
	teamName,
	id,
});

const updateTeamColor = (color, id) => ({
	type: actionTypes.UPDATE_TEAM_COLOR,
	color,
	id,
});

const removePlayer = (timestamp) => ({
	type: actionTypes.REMOVE_PLAYER,
	timestamp,
});

const setTeams = () => ({
	type: actionTypes.SET_TEAMS
});

const clearPlayers = () => ({
	type: actionTypes.CLEAR_PLAYERS
});

export {
	setPlayer,
	updateTeamName,
	updateTeamColor,
	removePlayer,
	setTeams,
	clearPlayers
}