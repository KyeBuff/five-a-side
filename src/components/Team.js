import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PlayerList from './lists/PlayerList';
import Modal from './Modal';
import FourOhFour from './FourOhFour';

class Team extends Component {

	constructor(props) {
		super(props);
		this.state = {
			teamName: this.props.team.get('teamName'),
			isEditingName: false,
			showModal: false,
			modal: {
				proceedTo: '',
				message: '',
			}
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

	showModal(proceedTo, message) {
		this.setState({
			showModal: true, 
			modal: {
				proceedTo,
				message
			}
		});
	}

	hideModal() {
		this.setState({showModal: false});
	}

	render() {
		// TODO reusable footer nav component
		const { team } = this.props;

		//Player size check prevents users accessing without generating teams
		return (
			<div>
				{team.get('players').size ?
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
								onClick={() => {
									this.showModal(team.get('id') === 1 ? "/players" : "/team-one", "You will lose your current teams if you go back. Do you still want to go back?")
									}
								}
							>Go back</button> 
							}
							{team.get('id') === 1 ?
							<Link 
								className="btn btn--progress footer-nav__link" 
								to={team.get('id') === 1 ? "/team-two" : "/" }
								>
								{team.get('id') === 1 ? "Go to Team two" : "Return to home" }
							</Link>
							:
							<button 
								className="btn btn--progress footer-nav__link"
								onClick={() => {
									this.showModal("/", "You will lose your current teams if you return to home. Do you still want to return to home?")
									}
								}
							>Return to home</button>
							}
						</nav>
					</section>
					{this.state.showModal ?
					<Modal 
						onCancel={this.hideModal} 
						onProceed={this.state.modal.proceedTo}
						message={this.state.modal.message}
						/>
					:
					null
					}
				</div>
				:
				<FourOhFour />
				}
			</div>
		)
	}
		
}

export default Team;

					