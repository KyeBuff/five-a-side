import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PlayerList from './lists/PlayerList';

// Rename?
class Team extends Component {

	constructor(props) {
		super(props);
		this.state = {
			teamName: this.props.team.get('teamName'),
			isEditingName: false,
		}
		this.toggleEdit = this.toggleEdit.bind(this)
		this.onNameChange = this.onNameChange.bind(this)
		this.onNameSubmit = this.onNameSubmit.bind(this)
	}

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	toggleEdit() {
		this.setState({isEditingName: true});
	}

	onNameChange(e) {
		const teamName = e.target.value;
		this.setState({teamName});
	}

	onNameSubmit(e) {
		e.preventDefault();

		this.setState({isEditingName: false});

		this.props.updateTeamName(this.state.teamName);
	}

	render() {
		const { team } = this.props;
		return (
			<section className="team">
				{ this.state.isEditingName ? 
				<form onSubmit={this.onNameSubmit}>
					<input 
						className="input--text"
						type="text" 
						onChange={this.onNameChange}
						value={this.state.teamName}
					/>
				</form>
				:
				<button 
					className="team__button--edit"
					onClick={this.toggleEdit}
				>
					<h2 className="team__heading">{team.get('teamName')}</h2>
					<span className="team__button__text">Edit team name</span>
				</button> 
				}
				<PlayerList players={team.get('players')} actionButtons={false}/>
				<nav className="footer-nav">
					<Link 
						className="btn footer-nav__link"
						to={team.get('id') === 1 ? "/players" : "/team-one"}
					>Go back</Link> 
					<Link 
						className="btn btn--progress" 
						to={team.get('id') === 1 ? "/team-two" : "/" }
						>
						{team.get('id') === 1 ? "Go to Team two" : "Return to home" }
					</Link>
				</nav>
			</section>
		)
	}
		
}

export default Team;