import React, {Component} from 'react';
import NewPlayerForm from './forms/NewPlayerForm';
import PlayerList from './lists/PlayerList';

// Rename?
class AddPlayers extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: []
		}
		this.addPlayer = this.addPlayer.bind(this);
	}

	addPlayer(player) {
		const players = [...this.state.players];

		players.push(player);

		this.setState({players});
	}

	render() {
		return (
			<section className="add-players">
				<h2 className="add-players__heading">Add a player</h2>
				<NewPlayerForm addPlayer={this.addPlayer}/>
				<h2 className="add-players__heading">Current players</h2>
				<PlayerList players={this.state.players}/>
				<button className="btn btn--progress">Generate teams</button>
			</section>
		)
	}
		
}

export default AddPlayers;