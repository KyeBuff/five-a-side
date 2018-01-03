import React from 'react';

const InputRadio = (props) => (
	<div className="div__input--radio">
		<input 
			id={props.id} 
			className={props.inputClassName}
			type="radio" 
			name={props.name} 
			value={props.value} 
			onChange={props.onChange} 
			checked={props.checked} 
		/>
		<label 
			htmlFor={props.id} 
			className={props.labelClassName}
		>{props.labelText}</label>
	</div>
)

export default InputRadio;