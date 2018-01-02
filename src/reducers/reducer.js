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


// TODO same name validation

//Update players list if size is < 10 to pass down to PlayerList.
const setPlayer = (state, player) => state.get('players').size < 10	? state.update('players', players => players.push(Map(player))) : state;

const updateTeamName = (state, {teamName, id}) => {

	return state.update('teams', teams => teams.map(t => {
		if(t.get('id') === id) {
			return t.set('teamName', teamName);
		}
		return t;
	}))

}

const removePlayer = (state, {timestamp}) => state.update('players', players => players.filter(player => player.get('timestamp') !== timestamp));

// generateTeams is a function that takes a list of players and produces two teams balanced by size and rating

//Recursive calls are made until the defined rating tolerance is met

//generateTeams helper functions
const assignTeamID = (players) => {

	let teamOneSize = 0,
	teamTwoSize = 0;

	const maxTeamSize = players.size / 2;

	return players.map(player => {
		const rng = Math.floor(Math.random() * 2) + 1;

		//Random assingment when both teams have < the max team size
		if(teamOneSize < maxTeamSize && teamTwoSize < maxTeamSize) {
			rng === 1 ? teamOneSize += 1 : teamTwoSize += 1;
			return player.set('teamID', rng);
		}

		if(teamOneSize >= maxTeamSize ) {
			teamTwoSize += 1;
			return player.set('teamID', 2);
		} 

		if(teamTwoSize >= maxTeamSize) {
			teamOneSize += 1;
			return player.set('teamID', 1);
		} 

		return player;

	});
}

const allocatePlayers = (players, id) => players.filter(player => player.get('teamID') === id);

const calcTeamRating = (players) => players.reduce((tot, player) => tot + player.get('rating'), 0);

const generateTeams = (players) => {

	const playersWithTeamID = assignTeamID(players);

	//Allocate players to team based on assigned teamID
	const teamOnePlayers = allocatePlayers(playersWithTeamID, 1);
	const teamTwoPlayers = allocatePlayers(playersWithTeamID, 2);

	//Get total team ratings
	const teamOneRating = calcTeamRating(teamOnePlayers);
	const teamTwoRating = calcTeamRating(teamTwoPlayers);

	const ratingDifference = Math.abs(teamOneRating - teamTwoRating);

	// Tolerance set to 1 if total team ratings are odd and 0 for even to prevent infinite loop 
	const tolerance = (teamOneRating + teamTwoRating) % 2;

	//recursive call until tolerance satisfied
	if(ratingDifference > tolerance) {
		return generateTeams(players);
	}

	return List([
		teamOnePlayers,
		teamTwoPlayers,
	]);

} 

// balanceTeams helper functions

const getTeambyID = (teams, id) => teams.find(team => team.find(player => player.get('teamID') === id));

const balanceTeams = (state) => {

	//Helper function which returns teams of equal length with balanced ratings
	const teams = generateTeams(state.get('players'));

	const teamOnePlayers = getTeambyID(teams, 1);
	const teamTwoPlayers = getTeambyID(teams, 2);

	return state.update('teams', teams => teams.map(team => {

		if(team.get('id') === 1) {
			return team.set('players', teamOnePlayers);
		} else {
			return team.set('players', teamTwoPlayers);
		}

	}));

}

const clearPlayers = (state) => state.set('players', List([]));

const reducer = (state=initialState, action) => {

	switch(action.type) {
		case "[Players] setPlayer": return setPlayer(state, action.player);
		case "[Teams][Team] updateTeamName": return updateTeamName(state, action);
		case "[Teams][Team][Players][Player] removePlayer": return removePlayer(state, action)
		case "[Teams] balanceTeams": return balanceTeams(state)
		case "[Teams] clearPlayers": return clearPlayers(state)
		default: return state;
	}

}

// Selectors

const fetchPlayers = state => state.get('players');

const fetchTeamOne = state => state.get('teams').find(team => team.get('id') === 1);

const fetchTeamTwo = state => state.get('teams').find(team => team.get('id') === 2);

export default reducer;

export {
	fetchPlayers,
	fetchTeamOne,
	fetchTeamTwo
}

