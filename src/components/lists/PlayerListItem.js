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
		  		{name}
		  		{this.props.actionButtons ? 
		  		//div required due to adjacent JSX error
		  		<div> 
			  		<button 
			  			className="player-list__item__button--edit"
			  			onClick={this.toggleEdit}
			  		>Edit</button>
			  		<button className="player-list__item__button--delete">Delete</button>
			  	</div>
		  		:
		  		null
		  		}
		  		<div className="player-ratings">
		  			{stars.map(star => star)}
		  		</div>
		  	</div>
				}
	  	</li>
		)
	}
}
export default PlayerListItem;


