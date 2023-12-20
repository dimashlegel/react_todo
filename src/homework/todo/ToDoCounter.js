const ToDoCounter = (props) => {
	return (<p className={props.styles.text}>All todos: {props.status === "success" ? props.items.length : 0}</p>)
}

export default ToDoCounter;