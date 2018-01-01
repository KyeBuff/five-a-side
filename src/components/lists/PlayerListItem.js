import React, { Component } from 'react';

// TODO add edit and fill form data with player
//Change button if editing and on submit change back to add player

class PlayerListItem extends Component {
	constructor(props){
		super(props);
		this.state = {
			// Pass down current name into editedName
			playerName: "",
		}
		this.onNameChange = this.onNameChange.bind(this)
		this.onNameSubmit = this.onNameSubmit.bind(this)
		this.removePlayer = this.removePlayer.bind(this)
	}

	onNameChange(e) {
		const playerName = e.target.value;
		this.setState({playerName});
	}

	onNameSubmit(e) {
		e.preventDefault();

		// this.props.updatePlayerName(this.state.playerName);
	}

	removePlayer(e) {
		this.props.removePlayer();
	}

	render() {
		const { name, skill } = this.props;

		// TODO - better way of doing this?
		const stars = [];

		for(let i=0; i<skill; i++) {
			stars.push(<span key={i} className="player-ratings__star"></span>);
		}

		return (
	  	<li className="player-list__item">
	  		{this.state.isEditing ? 
				<form onSubmit={this.onNameSubmit}>
					<input 
						className="input--text"
						type="text" 
						onChange={this.onNameChange}
						value={this.state.teamName}
					/>
				</form>
		  	:
				<div>
					{name}
		  		<div className="player-ratings">
		  			{stars.map(star => star)}
		  		</div>
		  		{this.props.actionButtons ? 
		  		<button 
		  			className="player-list__item__button--delete"
		  			onClick={this.removePlayer}
		  		></button>
		  		:
		  		null
		  		}
		  	</div>
				}
	  	</li>
		)
	}
}
export default PlayerListItem;


