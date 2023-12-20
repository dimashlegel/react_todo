// import { Children } from "react";
import Checkbox from "./Checkbox";
import ButtonComponent from "./ButtonComponent";
import Loader from "./Loader";



const ToDoItem = (props) => {
	
	let viewMode = {};
	let editMode = {};
	if (props.isDissableEditBtn.includes(props.id)) {
		viewMode.display = 'none';
	} else {
		editMode.display = 'none';
	}

	return (
	<>
		<li style={{listStyle: 'none', fontSize: 18}} className={props.styles.listItem} key={props.id} > 

		<div style={viewMode} className={props.styles.listItemInner} >

			<div style={{textAlign: 'left', paddingRight: 20}}>
				<Checkbox styles={props.styles} finished={props.finished} id={props.id} name={props.name} onClickCheckHandler={props.onClickCheckHandler} />
				<span className={props.finished ? props.styles.finishedTask : ''}>{props.name}</span>
				<div className={props.styles.description}>{props.text}</div>
			</div>

			<div className={props.styles.listItemControls}>
				<ButtonComponent styles={props.styles} type="button" id={props.id} text="Edit" 
					isDissableEditBtn={props.isDissableEditBtn} 
					editTodoHandler={props.editTodoHandler}>
				</ButtonComponent>

				<ButtonComponent styles={props.styles} type="button" id={props.id} text="Delete" 
					isDissableDeleteBtn={props.isDissableDeleteBtn} 
					deleteTodoHandler={props.deleteTodoHandler}>
				</ButtonComponent>
			</div>
		</div>

		<div style={editMode} >
		<p>Edit Title</p>
		<input
      type="text"
      value={props.name}
      className={props.styles.input}
			style={editMode}
			onChange={(e) => props.onChangeEditHandler(e, props.id)}
			onKeyDown={props.handleUpdatedDone}
    />

			<p>Edit Description</p>
		<input
      type="text"
      value={props.text}
      className={props.styles.input}
			style={editMode}
			onChange={(e) => props.onChangeEditTextHandler(e, props.id)}
			onKeyDown={props.handleUpdatedDone}
    />

		<button className={`${props.styles.button} ${props.styles.button_minWidthDel}`} 
		type="button" 
		style={editMode}
		disabled={props.isDissableSaveBtn}  
		onClick={() => props.saveTodoHandler(props.id)}>
			{props.isDissableSaveBtn ? <Loader styles={props.styles} /> : "Save"}
		</button>

		<button className={`${props.styles.button} ${props.styles.button_minWidthDel} ${props.styles.button_margin}`} 
		type="button" 
		style={editMode}
		disabled={props.isDissableSaveBtn}  
		onClick={() => props.cancelTodoHandler(props.id)}>
			Cancel
		</button>
		</div>

		 </li>
		{props.children}
	</>
	)
}

export default ToDoItem;