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
const setPlayer = (state, player) => {

	//Update players list to pass down to PlayerList.
	if(state.get('players').size < 10) {
		return state.update('players', players => players.push(Map(player)));
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

const updatePlayerName = (state, {playerName, id}) => {
	return state;
}

const removePlayer = (state, {timestamp}) => {

	return state.update('players', players => players.filter(player => player.get('timestamp') !== timestamp));

}

// generateTeams is a function that takes a list of players and produces two teams balanced by size and rating

//Recursive calls are made until the defined rating tolerance is met

const generateTeams = (players) => {

	let teamOneSize = 0;
	let teamTwoSize = 0;

	const maxTeamSize = players.size / 2;

	const playersWithTeam = players.map(player => {
		const rng = Math.floor(Math.random() * 2) + 1;

		//Random assingment when both teams have < the max team size
		if(teamOneSize < maxTeamSize && teamTwoSize < maxTeamSize) {
			rng === 1 ? teamOneSize += 1 : teamTwoSize += 1;
			return player.set('teamID', rng);
		}

		if(teamOneSize > maxTeamSize - 1) {
			teamTwoSize += 1;
			return player.set('teamID', 2);
		} 

		if(teamTwoSize > maxTeamSize - 1) {
			teamOneSize += 1;
			return player.set('teamID', 1);
		} 

		return player;

	});

	//Allocate players to team based on assigned teamID
	const teamOnePlayers = playersWithTeam.filter(player => player.get('teamID') === 1);
	const teamTwoPlayers = playersWithTeam.filter(player => player.get('teamID') === 2);

	//Get total team ratings
	const teamOneRating = teamOnePlayers.reduce((tot, player) => tot + player.get('rating'), 0);
	const teamTwoRating = teamTwoPlayers.reduce((tot, player) => tot + player.get('rating'), 0);

	const ratingDifference = Math.abs(teamOneRating - teamTwoRating);

	// Tolerance set to 1 if total team ratings are odd and 0 for even to prevent infinite loop 
	const tolerance = (teamOneRating + teamTwoRating) % 2;

	if(ratingDifference > tolerance) {
		return generateTeams(players);
	}

	return List([
		teamOnePlayers,
		teamTwoPlayers,
	]);

} 

const balanceTeams = (state) => {

	const teams = generateTeams(state.get('players'));

	const teamOnePlayers = teams.find(team => team.find(player => player.get('teamID') === 1));
	const teamTwoPlayers = teams.find(team => team.find(player => player.get('teamID') === 2));

	return state.update('teams', teams => teams.map(team => {

		if(team.get('id') === 1) {
			return team.set('players', teamOnePlayers);
		} else {
			return team.set('players', teamTwoPlayers);
		}

	}));

}

const clearPlayers = (state) => {

	return state.set('players', List([]));

}

const reducer = (state=initialState, action) => {

	switch(action.type) {
		case "[Players] setPlayer": return setPlayer(state, action.player);
		case "[Teams][Team] updateTeamName": return updateTeamName(state, action);
		case "[Teams][Team][Players][Player] updatePlayerName": return updatePlayerName(state, action);
		case "[Teams][Team][Players][Player] removePlayer": return removePlayer(state, action)
		case "[Teams] balanceTeams": return balanceTeams(state)
		case "[Teams] clearPlayers": return clearPlayers(state)
		default: return state;
	}

}

export default reducer;

