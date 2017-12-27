import React from 'react';
import {
    Link,
} from "react-router-dom";

const Landing = () => (
	<section className="landing">
		<h2 className="landing__heading">Build your 5 a-side team</h2>
		<Link className="btn btn--progress" to="/add-players">Get started...</Link>
		<p className="landing__text">Saved teams</p>
		<Link className="btn" to="/">Team one vs Team two</Link>
	</section>
)

export default Landing;