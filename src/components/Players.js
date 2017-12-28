import React, {Component} from 'react';
import NewPlayerForm from './forms/NewPlayerForm';
import PlayerList from './lists/PlayerList';

// Rename?
class Players extends Component {

	constructor(props) {
		super(props);
		this.addPlayer = this.addPlayer.bind(this);
	}

	addPlayer(player) {
		this.props.addPlayer(player);
	}

	render() {
		return (
			<section className="add-players">
				<h2 className="add-players__heading">Add a player</h2>
				<NewPlayerForm addPlayer={this.addPlayer}/>
				<h2 className="add-players__heading">Current players</h2>
				<PlayerList />
				<button 
					className="btn btn--progress"
				>Generate teams</button>
			</section>
		)
	}
		
}

export default Players;