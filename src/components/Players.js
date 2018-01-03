import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import NewPlayerForm from './forms/NewPlayerForm';
import PlayerList from './lists/PlayerList';

class Players extends Component {

	constructor(props) {
		super(props);
		this.addPlayer = this.addPlayer.bind(this);
		this.balanceTeams = this.balanceTeams.bind(this);
		this.clearPlayers = this.clearPlayers.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	addPlayer(player) {
		this.props.addPlayer(player);
	}

	balanceTeams() {
		this.props.balanceTeams();
	}

	clearPlayers() {
		this.props.clearPlayers();
	}

	render() {
		const { players } = this.props;
		return (
			<div>
				<section className="players">
					<div className="players__add-section">
						<h2 className="players__heading">Add a player</h2>
						<NewPlayerForm addPlayer={this.addPlayer}/>
						{players.size !== 0 && players.size < 3 ? 
						/* check if size === 3 as array is increasing*/
						<p className="players__info--lg">At least {4 - players.size} more {players.size === 2 ? "player" : "players"} required.</p>
						:
						null
						}
					</div>
					<PlayerList 
						players={players} 
						actionButtons={true}
						fullList={true}
						clearPlayers={this.clearPlayers}
					/>
				</section>
				<nav className="footer-nav">
					<Link 
						className="btn footer-nav__link"
						to="/"
					>Go back</Link> 
					{players.size > 2 ? 
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