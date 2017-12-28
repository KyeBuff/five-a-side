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

const setPlayer = (state, player) => {

	//Make player immutable
	const newPlayer = Map(player);

	//Update players list to pass down to PlayerList.
	if(state.get('players').size < 10) {
		state = state.update("players", players => players.push(newPlayer));
	}

	//Random number between 1 and 2 to assign to teams
	const rng = Math.floor(Math.random() * 2) + 1;

	const team = state.get('teams').find(team => team.get('id') === rng);

	if(team.get('players').size > 4) {
		return state.update('teams', teams => teams.map(t => {
			if(t.get('id') !== rng && t.get('players').size < 5) {
				return t.update('players', players => players.push(newPlayer));
			}
			return t;
		}))
	} else {
		return state.update('teams', teams => teams.map(t => {
			if(t.get('id') === rng) {
				return team.update('players', players => players.push(newPlayer));
			}
			return t;
		}))
	}
}

const reducer = (state=initialState, action) => {

	switch(action.type) {
		case "[Teams] setPlayer": return setPlayer(state, action.player);
		default: return state;
	}

}

export default reducer;


	// return state.update("teams", teams => teams.map(team => {

	// 	//length check first as RNG won't matter if length === 5

	// 	if(team.get('players').size === 5) {
	// 		return team;
	// 	}

	// 	// If team ID matches RNG
	// 	if(team.get('id') === rng) {
	// 		return team.update("players", players => players.push(newPlayer));
	// 	}

	// 	return team;

	// }));