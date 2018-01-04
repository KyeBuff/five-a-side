import React, {Component} from 'react';
import InputRadio from './InputRadio';

class Form extends Component {

	constructor(props) {
		super(props);
		this.state = {
			name: "",
			rating: 0,
			valid: true,
			errorMessage: "",
			showRatingInput: false,
		}
		this.onNameChange = this.onNameChange.bind(this);
		this.onSkillChange = this.onSkillChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSkillChange(e) {
		const rating = +e.target.value;

		this.setState({rating});
	}

	// TODO VALIDATE name input
	onNameChange(e) {
		const name = e.target.value;

		let errorMessage = "";
		let valid = true;

		if(!this.props.canAdd) {
			errorMessage = "Maximum of 10 players allowed"; 
			valid = false;
		}

		const showRatingInput = name.length > 0 ? true : false;

		this.setState({name, showRatingInput, valid, errorMessage});
	}

	onSubmit(e) {

		e.preventDefault();

		const playerOb = {
			timestamp: Date.now(),
			name: this.state.name,
			rating: this.state.rating,
		}

		const {name, rating} = playerOb;

		let errorMessage = "";

		// Validation

		// Allowing any characters as this is not a formal form and nicknames etc may be used.
		errorMessage = !name && !rating ? "Please enter a player name and select a rating" : "";

		if(!this.props.canAdd) {
			errorMessage = "Maximum of 10 players allowed";
		} else if(!name) {
			errorMessage = "Please enter a player name";
		} else if(!rating) {
			errorMessage = "Please give the player a rating";
		}

		this.setState({valid: false, errorMessage});

		//Empty name, rating and < 10 players validation
		if(name && rating && this.props.canAdd) {
			this.props.addPlayer(playerOb)

			this.setState({name: "", rating: 0, valid: true, errorMessage: "", showRatingInput: false})
		}
	}

	render() {

		const { valid, rating, showRatingInput, name, errorMessage } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<input 
					className="input--text" 
					type="text" 
					placeholder="Player name..." 
					onChange={this.onNameChange} 
					value={name} 
				/>
				{valid ? null : <p className="players__info">{errorMessage}</p>}
				{showRatingInput ? 
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