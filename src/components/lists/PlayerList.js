import React from 'react';
import PlayerListItem from '../../containers/PlayerListItem';

const PlayerList = (props) => (
	<div className="players__list-section">
		<h2 className="players__heading">Current players</h2>
		{props.fullList ?
		<div className="container-players__info--sm-md">
			{props.players.size < 4 ? 
			<p className="players__info">At least {4 - props.players.size} more players required.</p>
			:
			null
			}
		</div>
		:
		null
		}
		<ul className={props.fullList ? "player-list player-list--full" : "player-list"}>
			{
				props.players.map(player => (
					<PlayerListItem 
						key={player.get('timestamp')} 
						timestamp={player.get('timestamp')} 
						name={player.get('name')} 
						rating={player.get('rating')} 
						teamID={player.get('teamID')}
						actionButtons={props.actionButtons}
					/>
					)
				)
			}
		</ul>
	</div>
)

export default PlayerList;
