import Loader from './Loader.js';

const DeleteBtn = (props) => {
	return (<button className={`${props.styles.button} ${props.styles.button_minWidthDel}`}  
		type={props.type} 
		disabled={props.isDissableDeleteBtn.includes(props.id)}  
		onClick={() => props.deleteTodoHandler(props.id)}>
			{props.isDissableDeleteBtn.includes(props.id) ? <Loader styles={props.styles} /> : (props.text)}
		</button>)
}

const EditBtn = (props) => {
	return (<button className={`${props.styles.button} ${props.styles.button_minWidthDel}`} 
		type={props.type} 
		disabled={props.isDissableEditBtn.includes(props.id)}  
		onClick={() => props.editTodoHandler(props.id)}>
			{props.isDissableEditBtn.includes(props.id) ? <Loader styles={props.styles} /> : (props.text)}
		</button>)
}

const ButtonComponent = (props) => {
	return (props.text === 'Delete' ? DeleteBtn(props) : EditBtn(props));
	// return (props.text === 'Delete' ? <DeleteBtn /> : <EditBtn />);
} 

export default ButtonComponent;