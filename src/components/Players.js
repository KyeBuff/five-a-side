import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import NewPlayerForm from './forms/NewPlayerForm';
import PlayerList from './lists/PlayerList';

// Rename?
class Players extends Component {

	constructor(props) {
		super(props);
		this.addPlayer = this.addPlayer.bind(this);
		this.balanceTeams = this.balanceTeams.bind(this);
	}

	addPlayer(player) {
		this.props.addPlayer(player);
	}

	balanceTeams() {
		this.props.balanceTeams();
	}

	render() {
		const { players } = this.props;
		// TODO tidy up messages
		// Warning that teams will be lost on go back?
		return (
			<div>
				<section className="players">
					<div className="players__add-section">
						<h2 className="players__heading">Add a player</h2>
						<NewPlayerForm addPlayer={this.addPlayer}/>
					</div>
					<PlayerList 
						players={players} 
						actionButtons={true}
						fullList={true}
					/>
				</section>
				<nav className="footer-nav">
					<Link 
						className="btn footer-nav__link"
						to="/"
					>Go back</Link> 
					{players.size > 3 ? 
					<Link 
						className="btn btn--progress footer-nav__link"
						to="/team-one"
						onClick={this.balanceTeams}
					>Generate teams</Link> 
					:
					<button 
						className="btn footer-nav__link"
						disabled={true}
					>Generate teams</button>
					}
				</nav>
			</div>
		)
	}
		
}

export default Players;