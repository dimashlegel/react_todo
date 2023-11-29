import { useEffect, useState } from 'react';
import ToDoItem from './ToDoItem';
import ButtonComponent from './ButtonComponent';
import Select from './Select';
import { useFormik } from 'formik';


import styles from './TodoStyles.module.scss';

const ToDoList = () => {

	let initList = [
		{id: 1, name: 'First', finished: true},
		{id: 2, name: 'Second', finished: false},
		{id: 3, name: 'Third', finished: false},
	];

	
	const lsInitList = JSON.parse(localStorage.getItem('todo'));
  
	const [items, setItems] = useState(lsInitList || initList);
	
	const [input, setInput] = useState('');
	//  select 
	const [selectedOption, setSelectedOption] = useState('all');

	// form validation

	const validate = values => {
		const errors = {};
		if (!values.todoinput) {
			errors.todoinput = 'Required';
		} else if (values.todoinput.length > 15) {
			errors.todoinput = 'Must be 15 characters or less';
		} else if (values.todoinput.length < 3) {
			errors.todoinput = 'Must be 3 characters or more';
		}
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			todoinput: '',
		},
		validate,
		onSubmit: values => {	
			console.log(JSON.stringify(values, null, 2))
		},
	});


	useEffect(() => {
		localStorage.setItem('todo', JSON.stringify(items));
	},[items])

	const onChangeHandler = (event) => {
		setInput(event.target.value);
		formik.handleChange(event);
	}

	const onClickHandler = () => {
		const newValue = {
			id: items.length + 1,
			name: input,
			finished: false
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

	const onClickDeleteHandler = (id, name) => {
		console.log(id, name);
		const updatedListDelete = items.filter((elem) => {
			console.log(elem.id, elem.name);
			return (elem.id !== id || elem.name !== name)
		});
		setItems(updatedListDelete);
	}

	const onClickCheckHandler = (id, name) => {
		const updatedTasks = items.map((task) => {
			// if this task has the same ID as the edited task
			if (id === task.id && name === task.name) {
				// use object spread to make a new object
				// whose `finished` prop has been inverted
				return { ...task, finished: !task.finished };
			}
			return task;
		});
		setItems(updatedTasks);
	}

	
	const clearList = () => {
		if (localStorage.getItem('todo')) {
			localStorage.removeItem('todo');
		}
		setItems([]);
	}

	let allTodos = [];
	let finishedTodos = [];
	let activeTodos = [];
	
	const filteredItems = (element) => {
		return (<><ToDoItem styles={styles} id={element.id} name={element.name} finished={element.finished} onClickCheckHandler={onClickCheckHandler}>
			<ButtonComponent styles={styles} type="button" id={element.id} name={element.name} text="Delete" onClickDeleteHandler={onClickDeleteHandler}></ButtonComponent>
		</ToDoItem></>)		
	}

  if (selectedOption === 'finished') {
		finishedTodos = items.filter(element => element.finished).map((element) => {
				return filteredItems(element);
		});
	} else if (selectedOption === 'active') {
		activeTodos = items.filter(element => !element.finished).map((element) => {	
			return filteredItems(element);
		})
	} else {
		allTodos = items.map((element) => {
			return filteredItems(element);
	  });
	}

	return (
		<>
		<h2 className={styles.title}>Functional Component ToDo</h2>

			{/* <FormTodo onChangeHandler={onChangeHandler} onKeyUpHandler={onKeyUpHandler} inputV={input} onClickHandler={onClickHandler} /> */}
			<form onSubmit={formik.handleSubmit}>
			<input className={styles.input} type="text" onChange={onChangeHandler} onKeyUp={onKeyUpHandler} value={input} name='todoinput' />
			<p className={styles.errorMessage}>
			{formik.errors.todoinput ? <div>{formik.errors.todoinput}</div> : null}
			</p>
  		<button type='submit' className={`${styles.button} ${styles.mb}`} disabled={formik.errors.todoinput ? true : false} onClick={onClickHandler}>Add To Do</button>
			</form>
			<p className={styles.text}>All todos: {items.length}</p>
		
				<Select styles={styles} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
			<ul>
				{allTodos}
				{finishedTodos}
				{activeTodos}
			</ul>
			<button type="button" className={`${styles.button} ${styles.mb}`} onClick={clearList}>Clear ToDo List</button>
		</>
	)
}

export default ToDoList;