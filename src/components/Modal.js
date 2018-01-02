import React from 'react';
import { Link } from 'react-router-dom';

const Modal = (props) => (
	<div className="modal">
		<div className="modal__content">
			<p className="modal__message">{props.message}</p>
			<Link 
				className="btn btn--danger modal__link"
				to={props.onProceed}
			>Go back</Link> 
			<button 
				className="btn modal__btn"
				onClick={props.onCancel}
			>Cancel
			</button>
		</div>
		<div className="modal__overlay">
		</div>
	</div>
)

export default Modal;