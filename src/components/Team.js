import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PlayerList from './lists/PlayerList';
import Modal from './Modal';

class Team extends Component {

	constructor(props) {
		super(props);
		this.state = {
			teamName: this.props.team.get('teamName'),
			isEditingName: false,
			showModal: false,
		}
		this.toggleEdit = this.toggleEdit.bind(this)
		this.onNameChange = this.onNameChange.bind(this)
		this.onNameSubmit = this.onNameSubmit.bind(this)
		this.showModal = this.showModal.bind(this)
		this.hideModal = this.hideModal.bind(this)
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

	showModal() {
		this.setState({showModal: true});
	}

	hideModal() {
		this.setState({showModal: false});
	}

	render() {
		const { team } = this.props;
		return (
			<div>
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
					<PlayerList 
						players={team.get('players')} 
						actionButtons={false}
						fullList={false}
						className="player-list"
					/>
					<nav className="footer-nav">
						{team.get('id') === 2 ?
						<Link 
							className="btn footer-nav__link"
							to="/team-one"
						>Go back</Link> 
						:
						<button 
							className="btn footer-nav__link"
							onClick={this.showModal}
						>Go back</button> 
						}
						<Link 
							className="btn btn--progress footer-nav__link" 
							to={team.get('id') === 1 ? "/team-two" : "/" }
							>
							{team.get('id') === 1 ? "Go to Team two" : "Return to home" }
						</Link>
					</nav>
				</section>
				{this.state.showModal ?
				<Modal 
					onCancel={this.hideModal} 
					onProceed={team.get('id') === 1 ? "/players" : "/team-one"}
					message="You will lose your current teams if you go back. Do you still want to go back?"
					/>
				:
				null
				}
			</div>
		)
	}
		
}

export default Team;

					