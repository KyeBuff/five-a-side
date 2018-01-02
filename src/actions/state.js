const actionTypes = {
	SET_PLAYER: "[Players] setPlayer",
	UPDATE_TEAM_NAME: "[Teams][Team] updateTeamName",
	UPDATE_PLAYER_NAME: "[Teams][Team][Players][Player] updatePlayerName",
	REMOVE_PLAYER: "[Teams][Team][Players][Player] removePlayer",
	BALANCE_TEAMS: "[Teams] balanceTeams",
	CLEAR_PLAYERS: "[Teams] clearPlayers",
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

const removePlayer = (timestamp) => ({
	type: actionTypes.REMOVE_PLAYER,
	timestamp,
});

const balanceTeams = () => ({
	type: actionTypes.BALANCE_TEAMS
});

const clearPlayers = () => ({
	type: actionTypes.CLEAR_PLAYERS
});

export {
	setPlayer,
	updateTeamName,
	removePlayer,
	balanceTeams,
	clearPlayers
}