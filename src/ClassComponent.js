import React from "react";

class ClassComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<div>
				<h1>
				Hi, I'm ClassComponent!
				</h1>
			</div>
		)
	}
}

export default ClassComponent;