import React, {Component} from 'react';
import InputRadio from './InputRadio';

class Form extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			rating: 1,
			valid: true,
			showSkillOptions: false,
		}
		this.onNameChange = this.onNameChange.bind(this);
		this.onSkillChange = this.onSkillChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSkillChange(e) {
		const rating = +e.target.value;

		this.setState({rating});
	}

	onNameChange(e) {
		const name = e.target.value;

		const showSkillOptions = name.length > 0 ? true : false;

		this.setState({name, showSkillOptions});
	}

	onSubmit(e) {

		e.preventDefault();

		const playerOb = {
			timestamp: Date.now(),
			name: this.state.name,
			rating: this.state.rating,
		}

		this.setState({valid: false});

		//Empty name validation
		if(playerOb.name) {
			this.props.addPlayer(playerOb)

			this.setState({name: "", rating: 1, valid: true})
		}
	}

	render() {

		const { valid } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<input className="input--text" type="text" placeholder="Player name..." onChange={this.onNameChange} value={this.state.name} />
				{valid ? null : <p className="players__info">Please enter a player name</p>}
				{this.state.showSkillOptions ? 
				<div className="rating-buttons">
					<p className="rating-buttons__text">Choose a skill level</p>
					<InputRadio 
						id="radio-low"
						inputClassName="input--radio"
						labelClassName="label--radio"
						labelText="Low"
						name="rating"
						value={1}
						onChange={this.onSkillChange}
						checked={this.state.rating === 1}
					/>
					<InputRadio 
						id="radio-med"
						inputClassName="input--radio"
						labelClassName="label--radio"
						labelText="Med"
						name="rating"
						value={2}
						onChange={this.onSkillChange}
						checked={this.state.rating === 2}
					/>
					<InputRadio 
						id="radio-high"
						inputClassName="input--radio"
						labelClassName="label--radio"
						labelText="High"
						name="rating"
						value={3}
						onChange={this.onSkillChange}
						checked={this.state.rating === 3}
					/>
				</div>
				:
				null
				}
				<input className="btn btn--progress" type="submit" value="Add player" />
			</form>
		);	
	}
	
};

export default Form;

// <input id="radio-low" className="input--radio" type="radio" name="rating" value={1} onChange={this.onSkillChange} checked={this.state.rating === 1} />
// 					<label htmlFor="radio-low" className="label-radio">Low</label>
// 					<input id="radio-med" className="input--radio" type="radio" name="rating" value={2} onChange={this.onSkillChange} checked={this.state.rating === 2} />
// 					<label htmlFor="radio-med" className="label-radio">Med</label>
// 					<input id="radio-high" className="input--radio" type="radio" name="rating" value={3} onChange={this.onSkillChange} checked={this.state.rating === 3} />
// 					<label htmlFor="radio-high" className="label-radio">High</label>