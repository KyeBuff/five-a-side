import React from "react";
import Rating from "../Rating";

const PitchPlayerItem = (props) => {
	const {i, name, rating, color} = props;

	// Styling applied in js so user can interact with bg color
	const style = {backgroundColor: "hsl("+ color + ", 90%, 40%)"};
	return (
		<div className={"pitch__player pitch__player-" + i}>
			<div 
				style={style}
				className="pitch__player__kit"></div>
			<span 
				className="pitch__player__name"
			>
			{name.length >= 11 ? name.slice(0, 9) + "..." : name}
			</span>
			<Rating rating={rating} />
		</div>
	)
}

export default PitchPlayerItem;