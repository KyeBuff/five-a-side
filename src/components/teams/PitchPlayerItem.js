import React from 'react';
import Rating from '../Rating';

const PitchPlayerItem = (props) => {
	const {i, name, rating, color} = props;
	return (
		<div className={"pitch__player pitch__player-" + i}>
			<div 
				style={{backgroundColor: 'hsl('+ color + ', 90%, 40%)'}}
				className="pitch__player__kit"></div>
			<span className="pitch__player__name">{name}</span>
			<Rating rating={rating} />
		</div>
	)
}

export default PitchPlayerItem;