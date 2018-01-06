import React, {Component} from "react";
import { Link } from "react-router-dom";
import NewPlayerForm from "./forms/NewPlayerForm";
import PlayerList from "./lists/PlayerList";

class Players extends Component {

	constructor(props) {
		super(props);

		this.state = {
			teamsGenerated: false,
		}

		this.addPlayer = this.addPlayer.bind(this);
		this.generateTeams = this.generateTeams.bind(this);
		this.clearPlayers = this.clearPlayers.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	addPlayer(player) {
		this.props.addPlayer(player);
	}

	generateTeams() {
		this.props.setTeams();

		this.setState({teamsGenerated: true})
	}

	clearPlayers() {
		this.props.clearPlayers();
	}

	render() {
		const { players } = this.props,
		{ teamsGenerated } = this.state;
		return (
			<div>
				<section className="players">
					<div className="players__add-section">
						<h2 className="players__heading">Add a player</h2>
						<NewPlayerForm 
							addPlayer={this.addPlayer}
							canAdd={players.size < 10}
						/>
						{players.size !== 0 && players.size < 3 ? 
						/* Show message if we have players in list and we have less than min players (3)*/
						<p className="players__info--lg">At least {3 - players.size} more {players.size === 2 ? "player" : "players"} required.</p>
						:
						null
						}
					</div>
					<PlayerList 
						players={players} 
						clearPlayers={this.clearPlayers}
					/>
				</section>
				<footer>
					<nav className="footer-nav">
						<Link 
							className="btn footer-nav__link"
							to="/"
						>Go back</Link> 
						{players.size > 2 && players.size < 11 ? 
						<div className="footer-nav-link_container">
							{teamsGenerated ?
							/* Flipping between link and button due to onClick bug with React Router */
							<Link 
								className="btn btn--progress footer-nav__link"
								to="/team-one"
							>Go to Team one</Link> 
							:
							<button 
								className="btn btn--action footer-nav__link"
								onClick={this.generateTeams}
							>Generate teams</button>	
							}
						</div>
						:
						<button 
							className="btn footer-nav__link"
							disabled={true}
						>Generate teams</button>
						}
					</nav>
				</footer>
			</div>
		)
	}
		
}

export default Players;