import React from 'react';

const Header = (props) => {
	const {i, name, rating} = props;

	console.log(rating);

	// TODO - better way of doing this?
	const stars = [];

	for(let i=0; i<rating; i++) {
		stars.push(
			<span key={i} className="ratings__star"></span>
		);
	}

	return (
		<div className={"pitch__player pitch__player-" + i}>
			<span className="pitch__player__name">{name}</span>
			<div className="ratings">
  			{stars.map(star => star)}
  		</div>
		</div>
	)
}

export default Header;