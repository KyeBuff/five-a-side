import React from "react";
import PlayerListItem from "../../containers/PlayerListItem";

// container-players__info--sm-md - Show this up to tablet devices only

const PlayerList = (props) => {
	const playerSize = props.players.size;
	return (
		<div className="players__list-section">
			<h2 
				className="players__heading"
			>
				{playerSize === 0 ? "Players will show here..." : "Current players"}
			</h2>
			<div 
				className="container-players__info--sm-md">
				{playerSize !== 0 && playerSize < 3 ? 
					/* check if size < 3 as array is increasing*/
				<p 
					className="players__info"
				>
				At least {3 - playerSize} more {playerSize === 2 ? "player" : "players"} required.
				</p>
				:
				null
				}
			</div>
			<ul className="player-list">
				{
					props.players.map(player => (
						<PlayerListItem 
							key={player.get("timestamp")} 
							timestamp={player.get("timestamp")} 
							name={player.get("name")} 
							rating={player.get("rating")} 
							teamID={player.get("teamID")}
						/>
						)
					)
				}
			</ul>
			{playerSize > 0 ?
			<button 
				className="btn btn--danger"
				onClick={props.clearPlayers}
			>
			Clear players
			</button>
			:
			null}
		</div>
	)
}

export default PlayerList;
