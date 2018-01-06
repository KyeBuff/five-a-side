import React, {Component} from "react";
import InputRadio from "./InputRadio";

class NewPlayerForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			// new player details
			name: "",
			rating: 0,
			// validation
			valid: true,
			errorMessage: "",

			// toggles rating input on name entering
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

	onNameChange(e) {
		const name = e.target.value;

		let errorMessage = "";
		let valid = true;

		//If there is 10 players we cannot add
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

		//Not the specified characters between []
		const hasNoSymbols = name.search(/[^a-zA-Z\d\s:]/g) === -1;

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
		} else if(!hasNoSymbols) {
			errorMessage = "A player's name can only contain letters and numbers";
		} 

		//Set valid to false but will be overwritten if form is valid
		this.setState({valid: false, errorMessage});

		//Empty name, rating and < 10 players validation
		if(name && rating && this.props.canAdd && hasNoSymbols) {
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

export default NewPlayerForm;