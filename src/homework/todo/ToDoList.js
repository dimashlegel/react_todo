import { useEffect, useState } from 'react';
import ToDoItem from './ToDoItem';
// import ButtonComponent from './ButtonComponent';
import Select from './Select';
import { useFormik } from 'formik';
// import {  queryClient } from '../../index.js';
import {useMutation, useQuery} from '@tanstack/react-query';
import { addTodoAPI, getTodosListAPI, deleteTodoAPI, putTodoAPI } from "./api.js";
import axios from "axios";
import ToDoCounter from './ToDoCounter.js';
import Loader from './Loader.js';

import styles from './TodoStyles.module.scss';

axios.defaults.baseURL = 'http://localhost:3030/';

const ToDoList = () => {

	// state

	// const [input, setInput] = useState('');
	// const [text, setText] = useState('');
	
	const [isShowenForm, setIsShowenForm] = useState(false);
	const [isDissableBtn, setIsDissableBtn] = useState(false);
	const [isDissableDeleteBtn, setIsDissableDeleteBtn] = useState([]);
	const [isDissableEditBtn, setIsDissableEditBtn] = useState([]);
	const [isDissableSaveBtn, setIsDissableSaveBtn] = useState(false);

	// const [prevTitle, setPrevTitle]  = useState('');
	// const [prevDescription, setPrevDescription]  = useState('');

	//  select 
	const [selectedOption, setSelectedOption] = useState('all');

	const [items, setItems] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	// end state

// debugger;
	// api	
	const {data, isFetching, refetch, error, status} = useQuery({
		queryKey: ['todosList'],
		queryFn: getTodosListAPI,
	});

	console.log(isFetching);
	console.log(status);

	const {mutateAsync} = useMutation({
		mutationFn: (payload) => addTodoAPI(payload),
		onSuccess: () => {
			console.log('Success Get');
      // // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
		// onMutate: (variables) => {
		// 	console.log(variables);
		// }
	})
	
	if (error) {
		console.log("ERROR useQuery", error);
	}

	 // add ToDo
	const addNewToDo = async (e) => {
		// e.preventDafault();
		console.log('formik ', formik);
		setIsLoaded(true);
		const payload = {
			"title": formik.values.todoName,
      "description": formik.values.todoText,
      "checked": false,
			"creationData": new Date().toDateString()
    }
		console.log('payload Add ', payload);
		try {
			await mutateAsync(payload);
			await refetch();
			setIsLoaded(false);
			formik.resetForm();
		} catch (error) {
			console.log("Catch error ", error);
		}
	}

	// delete ToDo
	const deleted = useMutation({
		mutationFn: (id) => deleteTodoAPI(id),
		onSuccess: (data, id) => {
			console.log(id);
			console.log(data);
			console.log(items);
			const updatedListDelete = items.filter((elem) => {	
				return (elem.id !== id)
			});
			console.log('updatedListDelete ', updatedListDelete);
			setItems(updatedListDelete);
			if (updatedListDelete.length === 0) {
				setIsShowenForm(false);
			}
		},
		onError: (error) => {
			console.log('Delete Error ', error.message);
		}
	})

	const deleteTodoHandler = (id) => {
		console.log('deleteTodoHandler ', id);
		deleted.mutate(id);

		const newDisabledArray = [...isDissableDeleteBtn, id];
		setIsDissableDeleteBtn(newDisabledArray);

		// const updatedListDelete = items.filter((elem) => {
		// 	return (elem.id !== id)
		// });
		// setItems(updatedListDelete);

	};	
	// end delete ToDo

	// edit ToDo

	const editStatus = useMutation({
		mutationFn: (payload) => putTodoAPI(payload),
		onSuccess: () => {
			console.log('succes edit Status');
		},
		onError: (error) => {
			console.log('Put Error ', error.message);
		}
	})

	const editToDoStatus = async (id) => {

		const editedTodo = data.filter((el) => {
			return (id === el.id)
		})

		console.log('editedTodo ', editedTodo[0]);

		const payload = {
			"id": editedTodo[0].id,
      "title": editedTodo[0].title,
      "description": editedTodo[0].description,
      "checked": !editedTodo[0].checked,
			"creationData": editedTodo[0].creationData
    }

		try {
			await editStatus.mutateAsync(payload);
			await refetch();
		} catch (error) {
			console.log("Catch error ", error);
		}
	}


	// const edit = useMutation({
	// 	mutationFn: (payload) => putTodoAPI(payload),
	// 	onSuccess: () => {
	// 		console.log('succes edit');
	// 		setIsDissableSaveBtn(true);
	// 	},
	// 	onError: (error) => {
	// 		console.log('Put Error ', error.message);
	// 	}
	// })

	// const editToDo = async (id) => {

	// 	console.log('editToDo ', id);
	// 	// const currentEditName = items.filter((elem) => {
	// 	// 	return (elem.id === id)
	// 	// }).map((el) => el.title);
	// 	const currentEditName = items.filter((elem) => {
	// 		return (elem.id === id)
	// 	}).map((el) => el.title);

	// 	const currentEditDesc = items.filter((elem) => {
	// 		return (elem.id === id)
	// 	}).map((el) => el.description);

	// 	const currentEditChecked = items.filter((elem) => {
	// 		return (elem.id === id)
	// 	}).map((el) => el.checked);

	// 	const payload = {
	// 		"id": id,
  //     "title": currentEditName[0],
  //     "description": currentEditDesc[0],
  //     "checked": currentEditChecked[0],
	// 		"creationData": new Date().toDateString()
  //   }

	// 	try {
	// 		await edit.mutateAsync(payload);
	// 		await refetch();
	// 		const newDissableEditArray = isDissableEditBtn.filter((elem) => {
	// 			return (elem !== id)
	// 		});

	// 		setIsDissableEditBtn(newDissableEditArray);
	// 		setIsDissableSaveBtn(false);

	// 	} catch (error) {
	// 		console.log("Catch error ", error);
	// 	}
	// }



	// const editTodoHandler = (id) => {
	// 	console.log('editTodoHandler ', id);
	// 	console.log('editTodoHandler items', items);
	// 	const newDisabledArray = [...isDissableEditBtn, id];
	// 	setIsDissableEditBtn(newDisabledArray);
	// 	console.log('newDisabledArray ', newDisabledArray);

	// 	const startNames = items.filter((todo) => {
	// 			return (todo.id === id);	
	// 	});

	// 	setPrevTitle(startNames[0].title);
	// 	setPrevDescription(startNames[0].description);
		

	// };
	
	// const onChangeEditHandler = (e, id) => {

	// 	let newName = e.target.value;
	// 	const editedToDo = items.map((todo) => {
	// 		if (id === todo.id) {
	// 			return { ...todo, title: newName };
	// 		}
	// 		return todo;
	// 	});
	// 	setItems(editedToDo);

	// }

	// const onChangeEditTextHandler = (e, id) => {

	// 	let newDescription = e.target.value;
	// 	const editedToDoDesc = items.map((todo) => {
	// 		if (id === todo.id) {
	// 			return { ...todo, description: newDescription };
	// 		}
	// 		return todo;
	// 	});
	// 	setItems(editedToDoDesc);

	// }

	// end edit ToDo

	// save edit info / cancel edit
	// const saveTodoHandler = (id) => {
	// 	setIsDissableSaveBtn(true);
	// 	editToDo(id);
	// }

	// const cancelTodoHandler = (id) => {

	// 	setIsDissableEditBtn([]);

	// 	const canseledToDo = items.map((todo) => {
	// 		if (id === todo.id) {
	// 			return { ...todo, title: prevTitle, description: prevDescription };
	// 		}
	// 		return todo;
	// 	});

	// 	setItems(canseledToDo);

	// }

	// end save edit info / cancel edit


	// end api

	// form validation

	const validate = values => {
		
		const errors = {};
		if (!values.todoName) {
			errors.todoName = 'Required';
		} else if (values.todoName.length > 15) {
			errors.todoName = 'Must be 15 characters or less';
		} else if (values.todoName.length < 3) {
			errors.todoName = 'Must be 3 characters or more';
		}

		if (!values.todoText) {
			errors.todoText = 'Required';
		} else if (values.todoText.length > 100) {
			errors.todoText = 'Must be 100 characters or less';
		} else if (values.todoText.length < 3) {
			errors.todoText = 'Must be 3 characters or more';
		}
		console.log('validate errors ', errors);
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			todoName: '',
			todoText: '',
		},
		validate,
		onSubmit: async (values, actions) => {
			console.log(JSON.stringify(values, null, 2))
			console.log(actions);
      actions.resetForm();
			console.log('isDissableBtn 1', isDissableBtn);
			setIsDissableBtn(!isDissableBtn);
			console.log('isDissableBtn 2', isDissableBtn);
		}
	});
	
	// end form validation

	useEffect(() => {
		console.log("useEffect");
		if (status === 'success') {
			// console.log("success");
			setItems(data);
		}
		if (status === 'success' && data.length > 0) {
			setIsShowenForm(true);
			setIsDissableBtn(!isDissableBtn);
			setIsDissableDeleteBtn([]);
		}
	},[data])

	const onChangeHandler = (event) => {
		console.log('change input handler');
		// setInput(event.target.value);
		formik.handleChange(event);
	}

	const onChangeTextHandler = (event) => {
		console.log('change text handler');
		// setText(event.target.value);
		formik.handleChange(event);
	}

	// const onKeyUpHandler = (event) => {
	// 	if (event.keyCode === 13) {
	// 		addNewToDo();
  //   }
	// }

	const onClickCheckHandler = (id, title) => {
		editToDoStatus(id);
		const updatedTasks = items.map((todo) => {
			// if this todo has the same ID as the edited todo
			if (id === todo.id && title === todo.title) {
				// use object spread to make a new object
				// whose `finished` prop has been inverted
				return { ...todo, checked: !todo.checked };
			}
			return todo;
		});
		setItems(updatedTasks);
	}

	
	const clearList = () => {
		// if (localStorage.getItem('todo')) {
		// 	localStorage.removeItem('todo');
		// }
		setItems([]);
	}

	let allTodos = [];
	let finishedTodos = [];
	let activeTodos = [];
	
	const filteredItems = (element) => {
		return <ToDoItem styles={styles} key={element.id} id={element.id} 
				name={element.title} 
				text={element.description} 
				namePrev={element.title} 
				textPrev={element.description} 
			  finished={element.checked}  
				onClickCheckHandler={onClickCheckHandler} 
				deleteTodoHandler={deleteTodoHandler} 
				// editTodoHandler={editTodoHandler} 
				isDissableDeleteBtn={isDissableDeleteBtn} 
				isDissableEditBtn={isDissableEditBtn} 
				isDissableSaveBtn={isDissableSaveBtn} 
				// onChangeEditHandler={onChangeEditHandler}
				// onChangeEditTextHandler={onChangeEditTextHandler}
				// saveTodoHandler={saveTodoHandler}
				// cancelTodoHandler={cancelTodoHandler}
				 />
	}

	if (status === "success") {
		if (selectedOption === 'finished') {
			finishedTodos = items.filter(element => element.finished).map((element) => {
				return filteredItems(element);
		});
		} else if (selectedOption === 'active') {
			activeTodos = items.filter(element => !element.finished).map((element) => {	
				return filteredItems(element);
			})
		} else {
			// console.log('status ', status === "success");
			if (status === "success") {
				// console.log("all items ", items);
				allTodos = items.map((element) => {
					return filteredItems(element);
				}); 
			}
		}
	}

	const showInputs = () => {
		setIsShowenForm(true);
	}

	// const ToDoListTemplate = () => {
	// 	console.log(onChangeHandler);
	// 	return (<>		
	// 	<h2 className={styles.title}>ToDo List</h2>

	// 	{!isShowenForm ? (<button type='button' className={`${styles.button} ${styles.mb}`} onClick={showInputs}>Add ToDo</button>) : (
	// 		<form onSubmit={formik.handleSubmit}>
	// 			<div className={styles.inputs}>
	// 				<input className={styles.input} type="text" onChange={onChangeHandler} value={formik.values.todoName} name='todoName' placeholder="ToDo Title" />
	// 				<p className={styles.errorMessage}>
	// 				{formik.errors.todoName ? formik.errors.todoName : null}
	// 				</p>
	// 				<input className={styles.input} type="text" onChange={onChangeTextHandler} value={formik.values.todoText} name='todoText'  placeholder="ToDo Text" />
	// 				<p className={styles.errorMessage}>
	// 				{formik.errors.todoText ? formik.errors.todoText : null}
	// 				</p>
	// 			</div>		
  // 			<button type='submit' className={`${styles.button} ${styles.button_minWidth} ${styles.mb}`} 
	// 			 disabled={!formik.isValid || isFetching  ? true : false} 
	// 			 onClick={input && text ? addNewToDo : null}>
	// 					{isFetching ? <Loader styles={styles} /> : 'Add ToDo'}
	// 			 </button>
	// 		</form>)}

	// 		{items.length <= 0 ? (<p className={styles.text}>Empty ToDo List</p>) : (<ToDoCounter styles={styles} status={status} items={items} />) }
			
	// 		{/* {items.length ? (<Select styles={styles} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />) : ''} */}
			
	// 		{isFetching && items.length ? (<p>Loading...</p>) : (<ul className={styles.list}>
	// 			{allTodos}
	// 			{finishedTodos}
	// 			{activeTodos}
	// 		</ul>) }

	// 		{items.length ? <button type="button" className={`${styles.button} ${styles.mb}`} onClick={clearList}>Clear ToDo List</button> : ''}
	// 	</>)

	// }

	return (
		<>		
		<h2 className={styles.title}>ToDo List</h2>

		{!isShowenForm ? (<button type='button' className={`${styles.button} ${styles.mb}`} onClick={showInputs}>Add ToDo</button>) : (
			<form onSubmit={formik.handleSubmit}>
				<div className={styles.inputs}>
				<label htmlFor="todoName">ToDo Title</label>
					<input className={styles.input} type="text" onChange={onChangeHandler} value={formik.values.todoName} name='todoName' 
					id='todoName' placeholder="ToDo Title" />
					<p className={styles.errorMessage}>
					{formik.errors.todoName ? formik.errors.todoName : null}
					</p>
					<label htmlFor="todoText">ToDo Description</label>
					<input className={styles.input} type="text" onChange={onChangeTextHandler} value={formik.values.todoText} name='todoText'  id='todoText' placeholder="ToDo Text" />
					<p className={styles.errorMessage}>
					{formik.errors.todoText ? formik.errors.todoText : null}
					</p>
				</div>		
  			<button type='submit' className={`${styles.button} ${styles.button_minWidth} ${styles.mb}`} 
				 disabled={!formik.isValid || isLoaded  ? true : false} 
				 onClick={formik.values.todoName && formik.values.todoText ? addNewToDo : null}>
						{isLoaded ? <Loader styles={styles} /> : 'Add ToDo'}
				 </button>
			</form>)}

			{items.length <= 0 && !isShowenForm && !isFetching ? (<p className={styles.text}>Empty ToDo List</p>) : '' }
			
			{/* {items.length ? (<Select styles={styles} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />) : ''} */}
			
			{items.length > 0 ? <ToDoCounter styles={styles} status={status} items={items} /> : ''} 

			{isFetching && status !== "success" ? (<div className={styles.loaderListPosition}><Loader styles={styles} /></div>) : (<ul className={styles.list}>
				{allTodos}
				{finishedTodos}
				{activeTodos}
			</ul>) }

			{items.length ? <button type="button" className={`${styles.button} ${styles.mb}`} onClick={clearList}>Clear ToDo List</button> : ''}
		</>
	)
}

export default ToDoList;