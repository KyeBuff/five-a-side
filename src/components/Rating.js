import React from "react";

const Rating = (props) => {

	const stars = [];

	for(let i=0; i<props.rating; i++) {
		stars.push(
			<span key={i} className="ratings__star"></span>
		);
	}

	return (	
		<div className="ratings">
			{props.ratingText ? 
				<div>
					<span className="ratings__text">{props.ratingText}</span><br/>
				</div>
				: null
			} 
			{stars.map(star => star)}
		</div>
	);
}

export default Rating;