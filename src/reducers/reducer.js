import { Map, List } from "immutable";

const initialState = Map({
	teams: List([
		Map({
			id: 1,
			players: List([]),
		}),
		Map({
			id: 2,
			players: List([]),
		}),
	]),
	players: List([]),
});


//Update players list if size is < 10 to pass down to PlayerList.

const setPlayer = (state, player) => state.get("players").size < 10	? state.update("players", players => players.push(Map(player))) : state;

// Takes new name and id and replaces teamName when id match or returns team
const updateTeamName = (state, {teamName, id}) => state.update("teams", teams => teams.map(t => t.get("id") === id ? t.set("teamName", teamName) : t));

// Takes new color hue val and id and replaces color when id match or returns team
const updateTeamColor = (state, {color, id}) => state.update("teams", teams => teams.map(t => t.get("id") === id ? t.set("color", color) : t));

const removePlayer = (state, {timestamp}) => state.update("players", players => players.filter(player => player.get("timestamp") !== timestamp));

//HELPER FUNCTIONS - generateTeams
const assignTeamID = (players) => {

	// Track team size
	let teamOneSize = 0,
	teamTwoSize = 0;

	const maxTeamSize = players.size / 2;

	return players.map(player => {
		const rng = Math.floor(Math.random() * 2) + 1;

		//Random assignment when both teams have < the max team size, else is dependant on team size
		if(teamOneSize < maxTeamSize && teamTwoSize < maxTeamSize) {
			rng === 1 ? teamOneSize += 1 : teamTwoSize += 1;
			return player.set("teamID", rng);
		}

		if(teamOneSize >= maxTeamSize ) {
			teamTwoSize += 1;
			return player.set("teamID", 2);
		} 

		if(teamTwoSize >= maxTeamSize) {
			teamOneSize += 1;
			return player.set("teamID", 1);
		} 

		return player;

	});
}

//Returns a set of players based on their ID
const allocatePlayers = (players, id) => players.filter(player => player.get("teamID") === id);

//Takes a team and reduces each player rating to a total team rating
const calcTeamRating = (players) => players.reduce((tot, player) => tot + player.get("rating"), 0);

// generateTeams is a function that takes a list of players and produces two teams balanced by size and rating

//Recursive calls are made until the defined rating tolerance is met

const generateTeams = (players) => {

	const playersWithTeamID = assignTeamID(players),

	//Allocate players to team based on assigned teamID
	teamOnePlayers = allocatePlayers(playersWithTeamID, 1),
	teamTwoPlayers = allocatePlayers(playersWithTeamID, 2),

	//Get total team ratings
	teamOneRating = calcTeamRating(teamOnePlayers),
	teamTwoRating = calcTeamRating(teamTwoPlayers),

	// Stats/booleans used to prevent infinite loops / unbalanced teams
	totalRating = teamOneRating + teamTwoRating,
	avgRating = totalRating / players.size,
	isAllSameRating = players.every(player => player.rating === avgRating),
	isTotalRatingEven = !(totalRating % 2),
	isOddNumPlayers = !!(players.size % 2),

	ratingDifference = Math.abs(teamOneRating - teamTwoRating);

	// Tolerance set to 1 if total team ratings are odd and 0 for even to prevent infinite loop 
	// If players are odd and numbers are odd - tolerance should be as high as 3
	//1 Exception is when even total team ratings and odd num players where rating difference will be 2
	let tolerance = 0;

	//if total rating / num players > 2 and players is odd then tol should be 3 
	
	//If all players have the same rating, then tolerance should be equal to that rating if odd players
	if(isAllSameRating && isOddNumPlayers) {
		tolerance = avgRating;
	} else if(!isAllSameRating && isOddNumPlayers && !(totalRating%2) && avgRating < 2) {
		tolerance = 0;
	} else {
		tolerance = isTotalRatingEven && isOddNumPlayers ? 2 : (teamOneRating + teamTwoRating) % 2;
	}

	//recursive call until tolerance satisfied
	if(ratingDifference > tolerance) {
		return generateTeams(players);
	}

	return List([
		teamOnePlayers,
		teamTwoPlayers,
	]);

} 

// setTeams helper functions

const getTeambyID = (teams, id) => teams.find(team => team.find(player => player.get("teamID") === id));

const setTeams = (state) => {

	//Helper function which returns teams of equal length with balanced ratings
	const genTeams = generateTeams(state.get("players")),

	teamOnePlayers = getTeambyID(genTeams, 1),
	teamTwoPlayers = getTeambyID(genTeams, 2),

	teams = List([
		Map({
			id: 1,
			teamName: "Team one",
			color: 0,
			players: teamOnePlayers,
			rating: calcTeamRating(teamOnePlayers),
		}),
		Map({
			id: 2,
			teamName: "Team two",
			color: 219,
			players: teamTwoPlayers,
			rating: calcTeamRating(teamTwoPlayers),
		})
	]);

	return state.set("teams", teams);

}

//Reset teams when user generates, but goes back and clears then tries to enter /team-n URL
const clearPlayers = (state) => {
	const emptyTeams = List([
		Map({
			id: 1,
			players: List([]),
		}),
		Map({
			id: 2,
			players: List([]),
		}),
	]);

	return state.set("players", List([])).set("teams", emptyTeams);
}

const reducer = (state=initialState, action) => {

	switch(action.type) {
		case "[Players] setPlayer": return setPlayer(state, action.player);
		case "[Players/Teams] clearPlayers": return clearPlayers(state)
		case "[Teams][Team] updateTeamName": return updateTeamName(state, action);
		case "[Teams][Team] updateTeamColor": return updateTeamColor(state, action);
		case "[Teams][Team][Players][Player] removePlayer": return removePlayer(state, action)
		case "[Teams] setTeams": return setTeams(state)
		default: return state;
	}

}

// Selectors
const selectPlayers = state => state.get("players");
const selectTeamOne = state => state.get("teams").find(team => team.get("id") === 1);
const selectTeamTwo = state => state.get("teams").find(team => team.get("id") === 2);

export default reducer;

export {
	selectPlayers,
	selectTeamOne,
	selectTeamTwo
}

