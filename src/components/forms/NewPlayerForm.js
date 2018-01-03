import React, {Component} from 'react';
import InputRadio from './InputRadio';

class Form extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			rating: 1,
			valid: true,
			showRatingOptions: false,
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

		const showRatingOptions = name.length > 0 ? true : false;

		this.setState({name, showRatingOptions});
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

			this.setState({name: "", rating: 1, valid: true, showRatingOptions: false})
		}
	}

	render() {

		const { valid, rating, showRatingOptions, name } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<input 
					className="input--text" 
					type="text" 
					placeholder="Player name..." 
					onChange={this.onNameChange} 
					value={name} 
				/>
				{valid ? null : <p className="players__info">Please enter a player name</p>}
				{showRatingOptions ? 
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
						checked={rating === 1}
					/>
					<InputRadio 
						id="radio-med"
						inputClassName="input--radio"
						labelClassName="label--radio"
						labelText="Med"
						name="rating"
						value={2}
						onChange={this.onSkillChange}
						checked={rating === 2}
					/>
					<InputRadio 
						id="radio-high"
						inputClassName="input--radio"
						labelClassName="label--radio"
						labelText="High"
						name="rating"
						value={3}
						onChange={this.onSkillChange}
						checked={rating === 3}
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