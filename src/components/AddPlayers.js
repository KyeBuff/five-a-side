import React from 'react';
import NewPlayerForm from './forms/NewPlayerForm';
import PlayerList from './lists/PlayerList';

// Rename?
const AddPlayers = () => (
	<section className="add-players">
		<h2 className="add-players__heading">Add a player</h2>
		<NewPlayerForm />
		<h2 className="add-players__heading">Current players</h2>
		<PlayerList />
		<button className="btn btn--progress">Generate teams</button>
	</section>
)

export default AddPlayers;