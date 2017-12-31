import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import NewPlayerForm from './forms/NewPlayerForm';
import PlayerList from './lists/PlayerList';

// Rename?
class Players extends Component {

	constructor(props) {
		super(props);
		this.addPlayer = this.addPlayer.bind(this);
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	addPlayer(player) {
		this.props.addPlayer(player);
	}

	render() {
		const { players } = this.props;
		// TODO tidy up messages
		return (
			<section className="players">
				<h2 className="players__heading">Add a player</h2>
				<NewPlayerForm addPlayer={this.addPlayer}/>
				<h2 className="players__heading">Current players</h2>
				{players.size < 10 ? 
				<p className="players__info">{10 - players.size} players required.</p>
				:
				null
				}
				<PlayerList players={players} actionButtons={true}/>
				<nav className="footer-nav">
					<Link 
						className="btn footer-nav__link"
						to="/"
					>Go back</Link> 
					{players.size === 10 ? 
					<Link 
						className="btn btn--progress footer-nav__link"
						to="/team-one"
					>View teams</Link> 
					:
					<button 
						className="btn footer-nav__link"
						disabled={true}
					>View teams</button>
					}
				</nav>
				
			</section>
		)
	}
		
}

export default Players;