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

	console.log('dad');

	//Update players list to pass down to PlayerList.
	if(state.get('numPlayers') < 10) {
		return state.update('teams', teams => teams.map(t => {

			if(t.get('id') === rng && t.get('players').size < 5) {
				//Updates on teams players array
				player.teamID = rng;
				return t.update('players', players => players.push(Map(player)));
			}

			return t;
		}));
	}

	return state;

}

const setTeams = (state) => {
		// Map over each player

	//Match team by id with rng 

	// return state.update('players', players => players.map(player => {

	// 	//If the team size is less than 5
	// 		//Add player to this team using ID to match
	// 	state.update('teams', teams => teams.map(t => {
	// 		if(t.get('id') === rng && t.get('players').size < 5) {
	// 			console.log(rng, t.get('id'));
	// 			//Updates on teams players array
	// 			return t.update('players', players => players.push(player));
	// 		}

	// 		if(t.get('id') !== rng && t.get('players').size < 5) {
	// 			return t.update('players', players => players.push(player));
	// 		}

	// 		return t;
	// 	}))

	// 	return player;

	// }));

	// return state;

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

	console.log(timestamp, teamID);

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
		case "[Teams] setTeams": return setTeams(state);
		case "[Teams][Team] updateTeamName": return updateTeamName(state, action);
		case "[Teams][Team][Players][Player] updatePlayerName": return updatePlayerName(state, action);
		case "[Teams][Team][Players][Player] removePlayer": return removePlayer(state, action)
		default: return state;
	}

}

export default reducer;

