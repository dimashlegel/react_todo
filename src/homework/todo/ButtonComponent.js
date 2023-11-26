const ButtonComponent = (props) => {
	return <button type={props.type}  onClick={() => props.onClickDeleteHandler(props.id)}>{props.text}</button>
} 

export default ButtonComponent;