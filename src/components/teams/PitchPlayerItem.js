import React from 'react';
import Rating from '../Rating';

const PitchPlayerItem = (props) => {
	const {i, name, rating} = props;

	return (
		<div className={"pitch__player pitch__player-" + i}>
			<span className="pitch__player__name">{name}</span>
			<Rating rating={rating} />
		</div>
	)
}

export default PitchPlayerItem;