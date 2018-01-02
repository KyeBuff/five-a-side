import React, { Component } from 'react';

class PlayerListItem extends Component {
	constructor(props){
		super(props);
		this.removePlayer = this.removePlayer.bind(this)
	}

	removePlayer(e) {
		this.props.removePlayer();
	}

	render() {
		const { name, rating } = this.props;

		// TODO - better way of doing this?
		const stars = [];

		for(let i=0; i<rating; i++) {
			stars.push(
				<span key={i} className="ratings__star"></span>
			);
		}

		return (
	  	<li className="player-list__item">
				<span className={name.length > 7 ? "name--small" : "name"}>{name.length >= 11 ? name.slice(0, 9) + "..." : name}</span>
	  		<div className="ratings">
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
	  	</li>
		)
	}
}
export default PlayerListItem;


