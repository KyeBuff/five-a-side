const actionTypes = {
	SET_PLAYER: "[Teams] setPlayer",
	UPDATE_TEAM_NAME: "[Teams][Team] updateTeamName",
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

export {
	setPlayer,
	updateTeamName
}