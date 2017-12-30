import React from 'react';
import PlayerListItem from '../../containers/PlayerListItem';

const PlayerList = (props) => (
	<ul className="player-list">
		{
			props.players.map(player => (
				<PlayerListItem 
					key={player.get('timestamp')} 
					timestamp={player.get('timestamp')} 
					name={player.get('name')} 
					skill={player.get('skill')} 
					teamID={player.get('teamID')}
					actionButtons={props.actionButtons}
				/>
				)
			)
		}
	</ul>
)

export default PlayerList;
