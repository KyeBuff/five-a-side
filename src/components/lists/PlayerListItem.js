import React, { Component } from 'react';

class PlayerListItem extends Component {
	constructor(props){
		super(props);
		this.state = {
			// Pass down current name into editedName
			playerName: "",
			isEditing: false,
		}
		this.toggleEdit = this.toggleEdit.bind(this)
		this.onNameChange = this.onNameChange.bind(this)
		this.onNameSubmit = this.onNameSubmit.bind(this)
		this.removePlayer = this.removePlayer.bind(this)
	}

	toggleEdit() {
		this.setState({isEditing: true});
	}

	onNameChange(e) {
		const playerName = e.target.value;
		this.setState({playerName});
	}

	onNameSubmit(e) {
		e.preventDefault();

		this.setState({isEditing: false});

		this.props.updatePlayerName(this.state.playerName);
	}

	removePlayer(e) {
		this.props.removePlayer();
	}

	render() {
		const { name, skill } = this.props;

		// TODO - better way of doing this?
		const stars = [];

		for(let i=-1; i<skill; i++) {
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
					{this.props.actionButtons ?
					<button 
		  			className="player-list__item__button--edit"
		  			onClick={this.toggleEdit}
		  		>{name} <span className="edit-icon"></span>
			  	</button>
			  	:
			  	name
			  	}
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


