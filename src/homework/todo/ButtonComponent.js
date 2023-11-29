const ButtonComponent = (props) => {
	return <button className={props.styles.button} type={props.type}  onClick={() => props.onClickDeleteHandler(props.id, props.name)}>{props.text}</button>
} 

export default ButtonComponent;