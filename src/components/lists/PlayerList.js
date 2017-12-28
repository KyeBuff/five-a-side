import React, { Component } from 'react';
import PlayerListItem from './PlayerListItem';

const PlayerList = (props) => (
	<ul className="player-list">
		{
			// props.players.map(player => <PlayerListItem key={player.timestamp} name={player.name} skill={player.skill} />)
		}
	</ul>
)

export default PlayerList;
