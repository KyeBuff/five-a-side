import React, {Component} from 'react';

class Form extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			skill: 0,
			valid: true,
		}
		this.onNameChange = this.onNameChange.bind(this);
		this.onSkillChange = this.onSkillChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSkillChange(e) {
		const skill = +e.target.value;

		this.setState({skill});
	}

	onNameChange(e) {
		const name = e.target.value;

		this.setState({name});
	}

	onSubmit(e) {

		//TODO Validation for <= 10 players, empty fields
		e.preventDefault();

		const playerOb = {
			id: Date.now(),
			name: this.state.name,
			skill: this.state.skill,
		}

		this.setState({valid: false});

		//Empty name validation
		if(playerOb.name) {
			this.props.addPlayer(playerOb)

			this.setState({name: "", skill: 0, valid: true})
		}
	}

	render() {

		const { valid } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<input className="input--text" type="text" placeholder="Player name..." onChange={this.onNameChange} value={this.state.name} />
				{valid ? null : <p className="add-players__info">Please enter a player name</p>}
				<div className="skill-buttons">
					<p className="skill-buttons__text">Skill level</p>
					<input id="radio-low" className="input--radio" type="radio" name="skill" value={0} onChange={this.onSkillChange} checked={this.state.skill === 0} />
					<label htmlFor="radio-low" className="label-radio">Low</label>
					<input id="radio-med" className="input--radio" type="radio" name="skill" value={1} onChange={this.onSkillChange} checked={this.state.skill === 1} />
					<label htmlFor="radio-med" className="label-radio">Med</label>
					<input id="radio-high" className="input--radio" type="radio" name="skill" value={2} onChange={this.onSkillChange} checked={this.state.skill === 2} />
					<label htmlFor="radio-high" className="label-radio">High</label>
				</div>
				<input className="btn btn--progress" type="submit" value="Add player" />
			</form>
		);	
	}
	
};

export default Form;