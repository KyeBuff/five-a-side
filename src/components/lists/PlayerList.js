import React, { Component } from 'react';
import PlayerListItem from './PlayerListItem';

class PlayerList extends Component {

	componentDidMount(){
	}

	render() {
		return (
			<div>
	 			<ul className="player-list">
	 				<PlayerListItem />
	 				<PlayerListItem />
	 				<PlayerListItem />
	 			</ul>
	  	</div>
		)
	}
}

export default PlayerList;
