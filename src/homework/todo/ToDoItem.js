// import { Children } from "react";
import Checkbox from "./Checkbox";

const ToDoItem = (props) => {
	return (
	<>
		<li style={{listStyle: 'none', fontSize: 18}} className={props.styles.listItem} key={props.id} > 
		<Checkbox finished={props.finished} id={props.id} name={props.name} onClickCheckHandler={props.onClickCheckHandler} />
		<span className={props.finished ? props.styles.finishedTask : ''}>{props.name}</span>
		 </li>
		{props.children}
	</>
	)
}

export default ToDoItem;