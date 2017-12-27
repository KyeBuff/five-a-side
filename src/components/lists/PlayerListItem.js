import React, { Component } from 'react';

class PlayerListItem extends Component {
	constructor(props){
		super(props);
		this.state = {
			isEditing: false,
			// Pass down current name into editedName
			editedName: ""
		}
	}

	render() {
		return (
	  	<li className="player-list__item">
	  		Player One
	  		<button className="player-list__item__button--edit">Edit</button>
	  		<button className="player-list__item__button--delete">Delete</button>
	  		<div className="player-ratings">
		  		<span className="player-ratings__star"></span>
		  		<span className="player-ratings__star"></span>
		  		<span className="player-ratings__star"></span>
	  		</div>
	  	</li>
		)
	}
}
export default PlayerListItem;


