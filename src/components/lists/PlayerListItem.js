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
		const { name, skill } = this.props;

		// TODO - better way of doing this?
		const stars = [];

		for(let i=-1; i<skill; i++) {
			stars.push(<span key={i} className="player-ratings__star"></span>);
		}

		return (
	  	<li className="player-list__item">
	  		{name}
	  		{this.props.actionButtons ? 
	  		//div required due to adjacent JSX error
	  		<div> 
		  		<button className="player-list__item__button--edit">Edit</button>
		  		<button className="player-list__item__button--delete">Delete</button>
		  	</div>
	  		:
	  		null
	  		}
	  		<div className="player-ratings">
	  			{stars.map(star => star)}
	  		</div>
	  	</li>
		)
	}
}
export default PlayerListItem;


