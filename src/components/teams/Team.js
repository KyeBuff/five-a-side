import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import TeamFormation from './TeamFormation';
import TeamColorSlider from './TeamColorSlider';
import Modal from '../Modal';
import FourOhFour from '../FourOhFour';
import Rating from '../Rating';

class Team extends Component {

	constructor(props) {
		super(props);
		this.state = {
			teamName: '',
			teamColor: this.props.team.get('color'),
			isEditingName: false,
			valid: true,
			modal: {
				showModal: false,
				proceedTo: '',
				message: '',
				action: null,
			}
		}
		this.toggleEdit = this.toggleEdit.bind(this)
		this.onNameChange = this.onNameChange.bind(this)
		this.onColorChange = this.onColorChange.bind(this)
		this.onNameSubmit = this.onNameSubmit.bind(this)
		this.onTeamColorSubmit = this.onTeamColorSubmit.bind(this)
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
		// Empty team name validation
		this.setState({teamName});
	}

	onColorChange(e) {
		// Needs to be int to check against current color
		const teamColor = +e.target.value;
		this.setState({teamColor});
		this.isEditingTeamColor();
	}

	isEditingTeamColor() {
		return this.state.teamColor === this.props.team.get('color');
	}

	onNameSubmit(e) {
		e.preventDefault();

		if(this.state.teamName) { 
			this.setState({isEditingName: false, valid: true});

			this.props.updateTeamName(this.state.teamName, this.props.team.get('id'));
		} else {
			this.setState({valid: false})
		}
	}

	onTeamColorSubmit(e) {
		e.preventDefault();

		this.props.updateTeamColor(+this.state.teamColor, this.props.team.get('id'));
	}

	showModal(proceedTo, message, action) {
		// Action defines a function to pass down to Modal if something shoukd occur when proceeding
		this.setState({
			modal: {
				showModal: true, 
				proceedTo,
				message,
				action
			}
		});
	}

	hideModal() {
		this.setState({modal: {showModal: false}});
	}

	render() {
		const { team, clearPlayers } = this.props;

		const { isEditingName, teamName, modal, valid } = this.state;
		const rating = team.get('rating');

		//Player size check prevents users accessing without generating teams
		return (
			<div>
				{team.get('players').size ?
				/*If size > 0 show team else show 404*/
				<div>
					<section className="team">
						<div className="team-left-col-lg">
							{ isEditingName ? 
							<form onSubmit={this.onNameSubmit}>
								<input 
									className="input--text"
									type="text" 
									onChange={this.onNameChange}
									placeholder="Team name..."
									value={teamName}
								/>
							</form>
							:
							<div> 
								<button 
									className="team__button--edit"
									onClick={this.toggleEdit}
								>
									<h2 className="team__heading">{team.get('teamName')}
									<span className="team__button--edit__icon"></span>
									</h2>
								</button> 
					  	</div>
							}
							{valid ?
							null
							:
							<p className="team__info">Your team must have a name</p>
							}
							<Rating rating={rating} ratingText="Team rating average: "/>
							<TeamFormation 
								players={team.get('players')}
								teamColor={team.get('color')}
							/>
						</div>
						<div className="team-right-col-lg">
							<TeamColorSlider 
								color={this.state.teamColor} 
								onChange={this.onColorChange}
								disabled={this.isEditingTeamColor()}
								onSubmit={this.onTeamColorSubmit}
							/>
						</div>
						{/* Footer nav not as separate component due to large amount of presentation logic */}
					</section>
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
									this.showModal("/", "You will lose your player data if you return to home. Do you still want to return to home?", clearPlayers)
									}
								}
							>Exit</button>
							}
						</nav>
					{modal.showModal ?
					<Modal 
						onCancel={this.hideModal} 
						onProceed={modal.proceedTo}
						message={modal.message}
						action={modal.action}
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