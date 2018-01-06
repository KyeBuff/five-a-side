import React from 'react';
import {
    Link,
} from "react-router-dom";

const Landing = () => (
	<section className="landing">
		<h2 className="landing__heading">Build your 5 a-side team</h2>
		<Link className="btn btn--progress" to="/players">Get started...</Link>
	</section>
)

export default Landing;
