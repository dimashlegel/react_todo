import {useQuery, useMutation} from '@tanstack/react-query';
import { getTodoAPI, putTodoAPI } from "./api.js";
import Loader from "./Loader";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './TodoStyles.module.scss';

const SingleToDo = (props) => {

	
	const {id} = useParams();
	
	const {data, isSuccess, refetch} = useQuery({
		queryKey: ['todoItem'],
		queryFn: () => getTodoAPI(id),
	});
	

	
	const [isLoaded, setIsLoaded] = useState(false);
	const [inputNew, setInputNew] = useState('');
	const [descriptionNew, setDescriptionNew] = useState('');

	const navigate = useNavigate();
	
	useEffect(() => {
		if (isSuccess) {
			setInputNew(data.title)
			setDescriptionNew(data.description)
			setIsLoaded(true);
		}
	},[data])


	const edit = useMutation({
		mutationFn: (payload) => putTodoAPI(payload),
		onSuccess: () => {
			console.log('succes edit');
		},
		onError: (error) => {
			console.log('Put Error ', error.message);
		}
	})

	const editToDo = async (id) => {

		const payload = {
			"id": id,
      "title": inputNew,
      "description": descriptionNew,
      "checked": data.checked,
			"creationData": data.creationData
    }

		try {
			await edit.mutateAsync(payload);
			await refetch();
			setIsLoaded(true);

			// setIsDissableEditBtn(newDissableEditArray);
			// setIsDissableSaveBtn(false);

		} catch (error) {
			console.log("Catch error ", error);
		}
	}

	const onChangeEditHandler = (e) => {
		console.log('onChangeEditHandler ', e.target.value);
		let newTitle = e.target.value;
		setInputNew(newTitle);
	}
	const onChangeEditTextHandler = (e) => {
		console.log('onChangeEditTextHandler ', e.target.value);
		let newDescription = e.target.value;
		setDescriptionNew(newDescription);
	}

	
	// save edit info / cancel edit
	const saveTodoHandler = (e, id) => {
		// setIsDissableSaveBtn(true);
		setIsLoaded(false);
		e.preventDefault();
		editToDo(id).then(() => {
			navigate('/todo')
		});
	}

	const cancelTodoHandler = (id) => {

		// setIsDissableEditBtn([]);

		// const canseledToDo = items.map((todo) => {
		// 	if (id === todo.id) {
		// 		return { ...todo, title: prevTitle, description: prevDescription };
		// 	}
		// 	return todo;
		// });

		// setItems(canseledToDo);

	}

	// end save edit info / cancel edit

	return (
	<>
		{!isLoaded ? <Loader styles={styles} /> : <div>
		<p>Edit Title</p>
		<input
      type="text"
      value={inputNew}
      className={styles.input}
			// style={editMode}
			onChange={(e) => onChangeEditHandler(e)}
			// onKeyDown={props.handleUpdatedDone}
    />

			<p>Edit Description</p>
		<input
      type="text"
      value={descriptionNew}
      className={styles.input}
			// style={editMode}
			onChange={(e) => onChangeEditTextHandler(e)}
			// onKeyDown={props.handleUpdatedDone}
    />

		<div>
		<a href="/todo" onClick={(e) => saveTodoHandler(e,id)} className={`${styles.button} ${styles.button_minWidthDel} ${styles.button_margin}`}>Save</a>
			{/* <Link to={'/todo'}
				className={`${styles.button} ${styles.button_minWidthDel} ${styles.button_margin}`}
				// disabled={props.isDissableSaveBtn}  
				onClick={(e) => saveTodoHandler(e,id)}>
				{props.isDissableSaveBtn ? <Loader styles={styles} /> : "Save"}
			</Link> */}
			<Link to={'/todo'} className={`${styles.button} ${styles.button_minWidthDel} ${styles.button_margin}`}  
			// style={editMode}
			// disabled={props.isDissableSaveBtn}  
			// onClick={() => cancelTodoHandler(id)}
			>
				Cancel
			</Link>

			</div>
		</div>}
		

	</>)
}

export default SingleToDo;