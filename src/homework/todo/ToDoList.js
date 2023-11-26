import { useState } from 'react';
import ToDoItem from './ToDoItem';
import ButtonComponent from './ButtonComponent';

const ToDoList = () => {

	let initList = [
		{id: 1, name: 'First'},
		{id: 2, name: 'Second'},
		{id: 3, name: 'Third'},
	];

	const [input, setInput] = useState('');
	const [items, setItems] = useState(initList);

	const onChangeHandler = (event) => {
		setInput(event.target.value);
	}

	const onClickHandler = () => {
		const newValue = {
			id: items.length + 1,
			name: input
		}
		const updatedList = [...items, newValue];
		if (input.length > 0) {
			setItems(updatedList);
		}
		setInput('');
	}

	const onKeyUpHandler = (event) => {
		if (event.keyCode === 13) {
			onClickHandler();
    }
	}

	const onClickDeleteHandler = (id) => {
		const updatedListDelete = items.filter((elem) => {
			return elem.id !== id
		});
		setItems(updatedListDelete);
	}

	return (
		<>
		<h2>Functional Component ToDo</h2>
			<input type="text" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} value={input}  />
			<p>Кількість: {items.length}</p>
			<ul>
				{items.map((element) => {
					return <ToDoItem id={element.id} name={element.name}>
						<ButtonComponent type="button" id={element.id} text="Delete" onClickDeleteHandler={onClickDeleteHandler}></ButtonComponent>
					</ToDoItem>
				})}
			</ul>
			<button onClick={onClickHandler}>Add To Do</button>
		</>
	)
}

export default ToDoList;