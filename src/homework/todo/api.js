import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3030/';

export const getTodosListAPI = async () => {
	console.log("api get data list");
	const todos = await axios.get('todos');
	return todos.data;
}

export const getTodoAPI = async (id) => {
	console.log("api id get", id);
	const todo = await axios.get(`todos/${id}`);
	console.log(todo);
	return todo.data;
}

export const addTodoAPI = async (payload) => {
	console.log("api post data", payload);
	const todos = await axios.post('todos', payload);
	return todos.data;
}

export const deleteTodoAPI = async (id) => {
	console.log("api id delete", id);
	await axios.delete(`todos/${id}`);
}

export const putTodoAPI = async (payload) => {
	console.log("api id put", payload.id);
	console.log("api payload put", payload);
	const resp = await axios.put(`todos/${payload.id}`, payload);
	console.log('resp', resp);
}

