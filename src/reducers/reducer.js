import { Map, List } from 'immutable';

const initialState = Map({
	teams: List([
		Map({
			id: 1,
			teamName: "Team one",
			color: 0,
			players: List([]),
		}),
		Map({
			id: 2,
			teamName: "Team two",
			color: 180,
			players: List([]),
		}),
	]),
	numPlayers: 0
});


// TODO refactor this reducer
const setPlayer = (state, player) => {

	const rng = Math.floor(Math.random() * 2) + 1;

	// Find matched team by rng ID
	let matchedTeam = state.get('teams').find(t => t.get('id') === rng);
	// Check players < 5 
	if(matchedTeam.get('players').size < 5) {
		player.teamID = rng;
		// Push player
	} else {
		matchedTeam = state.get('teams').find(t => t.get('id') !== rng);
		if(matchedTeam.get('players').size < 5) {
			player.teamID = matchedTeam.get('id');
		}
	}

	//Update players list to pass down to PlayerList.
	if(state.get('numPlayers') < 10) {
		return state.update('teams', teams => teams.map(t => {
			return player.teamID === t.get('id') ? t.update('players', players => players.push(Map(player))) : t;
		}));
	}

	return state;

}

const updateTeamName = (state, {teamName, id}) => {

	return state.update('teams', teams => teams.map(t => {
		if(t.get('id') === id) {
			return t.set('teamName', teamName);
		}
		return t;
	}))

}

// TODO remove players section of state and retrieve players from teams
const updatePlayerName = (state, {playerName, id}) => {
	return state;

}

const removePlayer = (state, {timestamp, teamID}) => {

	return state.update('teams', teams => teams.map(t => {

		if(t.get('id') === teamID) {
			return t.update('players', players => players.filter(player => player.get('timestamp') !== timestamp));
		}

		return t;

	}));

}

const reducer = (state=initialState, action) => {

	switch(action.type) {
		case "[Players] setPlayer": return setPlayer(state, action.player);
		case "[Teams][Team] updateTeamName": return updateTeamName(state, action);
		case "[Teams][Team][Players][Player] updatePlayerName": return updatePlayerName(state, action);
		case "[Teams][Team][Players][Player] removePlayer": return removePlayer(state, action)
		default: return state;
	}

}

export default reducer;

