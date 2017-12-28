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

	//Make players immutable
	const newPlayer = Map(player);

	return state.update("players", players => players.push(newPlayer));

	//Random number between 1 and 2 to assign to teams
	const rng = () => Math.floor(Math.random() * 2) + 1;


}

const reducer = (state=initialState, action) => {

	switch(action.type) {
		case "[Teams] setPlayer": return setPlayer(state, action.player);
		default: return state;
	}

}

export default reducer;