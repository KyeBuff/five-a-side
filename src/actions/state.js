const actionTypes = {
	SET_PLAYER: "[Players] setPlayer",
	UPDATE_TEAM_NAME: "[Teams][Team] updateTeamName",
	UPDATE_PLAYER_NAME: "[Teams][Team][Players][Player] updatePlayerName",
	REMOVE_PLAYER: "[Teams][Team][Players][Player] removePlayer",
	BALANCE_TEAMS: "[Teams] balanceTeams",
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

const removePlayer = (timestamp, teamID) => ({
	type: actionTypes.REMOVE_PLAYER,
	timestamp,
	teamID
});

const balanceTeams = () => ({
	type: actionTypes.BALANCE_TEAMS
});

export {
	setPlayer,
	updateTeamName,
	removePlayer,
	balanceTeams,
}