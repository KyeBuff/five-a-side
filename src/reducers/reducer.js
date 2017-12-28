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
	players: List([]),
});


// TODO refactor this reducer
const setPlayer = (state, player) => {

	//Make player immutable
	const newPlayer = Map(player);

	//Update players list to pass down to PlayerList.
	if(state.get('players').size < 10) {
		state = state.update("players", players => players.push(newPlayer));
	}

	//Random number between 1 and 2 to assign to teams
	const rng = Math.floor(Math.random() * 2) + 1;

	//Match team by id with rng 
	const team = state.get('teams').find(team => team.get('id') === rng);

	//If the team size is less than 5
		//Add player to this team using ID to match
	if(team.get('players').size < 5) {
		return state.update('teams', teams => teams.map(t => {
			if(t.get('id') === rng) {
				//Updates on teams players array
				return team.update('players', players => players.push(newPlayer));
			}
			return t;
		}))
	} else {
		return state.update('teams', teams => teams.map(t => {
			//We have to check both ID and players length to prevent overloading this team
			if(t.get('id') !== rng && t.get('players').size < 5) {
				return t.update('players', players => players.push(newPlayer));
			}
			return t;
		}))
	}
}

const updateTeamName = (state, {teamName, id}) => {

	return state.update('teams', teams => teams.map(t => {
		if(t.get('id') === id) {
			return t.set('teamName', teamName);
		}
		return t;
	}))

}

const reducer = (state=initialState, action) => {

	switch(action.type) {
		case "[Teams] setPlayer": return setPlayer(state, action.player);
		case "[Teams][Team] updateTeamName": return updateTeamName(state, action);
		default: return state;
	}

}

export default reducer;