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

	// const rng = Math.floor(Math.random() * 2) + 1;

	// // Find matched team by rng ID
	// let matchedTeam = state.get('teams').find(t => t.get('id') === rng);

	// // Check players < 5 
	// if(matchedTeam.get('players').size < 5) {
	// 	player.teamID = rng;
	// 	// Push player
	// } else {
	// 	matchedTeam = state.get('teams').find(t => t.get('id') !== rng);
	// 	if(matchedTeam.get('players').size < 5) {
	// 		player.teamID = matchedTeam.get('id');
	// 	}
	// }

	//Update players list to pass down to PlayerList.
	if(state.get('players').size < 10) {
		return state.update('players', players => players.push(Map(player)));
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

// TODO remove players section of state and retrieve players from teams
const updatePlayerName = (state, {playerName, id}) => {
	return state;
}

const removePlayer = (state, {timestamp}) => {

	return state.update('players', players => players.filter(player => player.get('timestamp') !== timestamp));

	// return state.update('teams', teams => teams.map(t => {

	// 	if(t.get('id') === teamID) {
	// 		return t.update('players', players => players.filter(player => player.get('timestamp') !== timestamp));
	// 	}

	// 	return t;
	// }));
}

const balanceTeams = (state) => {

	const playersBySkill = state.get('players').sort((a,b) => a.get('skill') - b.get('skill'));

	let teamOneSize = 0;
	let teamTwoSize = 0;

	const maxTeamSize = state.get('players').size / 2;

	const playersWithTeam = playersBySkill.map(player => {
		const rng = Math.floor(Math.random() * 2) + 1;

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
	});

	const teamOne = playersWithTeam.filter(player => player.get('teamID') === 1);
	const teamTwo = playersWithTeam.filter(player => player.get('teamID') === 2);

	return state.update('teams', teams => teams.map(team => {

		if(team.get('id') === 1) {
			return team.set('players', teamOne);
		} else {
			return team.set('players', teamTwo);
		}

	}));

	// const teamOneRating = teamOne.reduce((tot, player) => tot + player.get('skill'), 0);
	// const teamTwoRating = teamTwo.reduce((tot, player) => tot + player.get('skill'), 0);

	// return state.update('teams', team => {

	// });
	// teamsOb = playersBySkill.reduce((teamsOb,player) => {

	// 	const rng = Math.floor(Math.random() * 2) + 1;

	// 	if(rng === 1) {
	// 		return teamsOb.teamOnePlayers.push(player);
	// 	}

	// 	// Reduce to an object with team properties?
	// 	return teamsOb;
	// }, {});

	return state;
}

const reducer = (state=initialState, action) => {

	switch(action.type) {
		case "[Players] setPlayer": return setPlayer(state, action.player);
		case "[Teams][Team] updateTeamName": return updateTeamName(state, action);
		case "[Teams][Team][Players][Player] updatePlayerName": return updatePlayerName(state, action);
		case "[Teams][Team][Players][Player] removePlayer": return removePlayer(state, action)
		case "[Teams] balanceTeams": return balanceTeams(state)
		default: return state;
	}

}

export default reducer;

