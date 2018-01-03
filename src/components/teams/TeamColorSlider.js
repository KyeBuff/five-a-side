import React from 'react';
import PitchPlayerItem from './PitchPlayerItem';

const TeamColorSlider = (props) => {

	//Don't update color straight away as API implementation would be slow
	return (
		<div className="team__color-slider">
			<h2 className="team__color__heading">Choose your team's colour</h2>
			<form 
				onSubmit={props.onSubmit}
			>
				<div 
					className="team__color__preview"
					style={{backgroundColor: 'hsl('+ props.color + ', 90%, 40%)'}}
				>
				</div><input 
					className="team__color__range-input"
					type="range" 
					max={360} 
					min={0} 
					value={props.color}
					onChange={props.onChange}
				/>
				<input 
					className="btn"
					type="submit"
					value="Change colour"
					disabled={props.disabled}
				/>
			</form>
		</div>
	)
}

export default TeamColorSlider;


