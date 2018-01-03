import React, { Component } from 'react';
import Rating from '../Rating';

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

		return (
	  	<li className="player-list__item">
				<span 
					className={name.length > 7 ? "name--small" : "name"}
					>
					{name.length >= 11 ? name.slice(0, 9) + "..." : name}
				</span>
	  		<Rating rating={rating} />
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


