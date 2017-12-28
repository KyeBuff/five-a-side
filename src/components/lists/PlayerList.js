import React from 'react';
import PlayerListItem from './PlayerListItem';

const PlayerList = (props) => (
	<ul className="player-list">
		{
			props.players.map(player => (
				<PlayerListItem 
					key={player.get('id')} 
					id={player.get('id')} 
					name={player.get('name')} 
					skill={player.get('skill')} 
					actionButtons={props.actionButtons}
				/>
				)
			)
		}
	</ul>
)

export default PlayerList;
