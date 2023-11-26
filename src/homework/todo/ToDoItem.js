import { Children } from "react";

const ToDoItem = (props) => {
	return (
	<>
		<li key={props.id} >{props.name}</li>
		{props.children}
	</>
	)
}

export default ToDoItem;