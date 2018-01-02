import React from 'react';
import PitchPlayerItem from './PitchPlayerItem';

const TeamFormation = (props) => {

	return (
		<section className="team__formation">
			<div className="pitch">
				{props.players.map((player, i) => <PitchPlayerItem 
						key={player.get('timestamp')}
						i={i}
						name={player.get('name')} 
						rating={player.get('rating')}
					/>)}
			</div>
		</section>
	)
}

export default TeamFormation;


