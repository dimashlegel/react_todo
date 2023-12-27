// import { Component } from "react"; 

// class ToDoListClassComp extends Component {

// 	state = {
// 		todos: [],
// 		value: '',
// 		timer: 0
// 	}

// 	componentDidMount() {
// 		console.log('componentDidMount');
// 		const lsTodos = localStorage.getItem('todos');
// 		if (lsTodos) {
// 			this.setState({todos:JSON.parse(lsTodos)})
// 		}
// 		// timer
// 		this.timerId = setInterval(() => {
// 			this.setState({timer: this.state.timer + 1})
// 		}, 1000)
// 	}

// 	componentDidUpdate(prevProps, prevState) {
// 		if (prevState.todos !== this.state.todos) {
// 			localStorage.setItem('todos', JSON.stringify(this.state.todos));
// 		}
// 	}
	
// 	onChangeHandler(e) {
// 		const newValue = e.target.value;
// 		this.setState({value:newValue})
// 	}

// 	addTask(e) {
// 		this.setState({todos: [...this.state.todos, this.state.value]})
// 		this.setState({value:''})
// 	}

// 	clearList = () => {
// 		if (localStorage.getItem('todos')) {
// 			localStorage.removeItem('todos');
// 		}
// 		this.setState({todos:[]})
// 	}

// 	componentWillUnmount() {
// 		console.log('componentWillUnmount');
// 		clearInterval(this.timerId);
// 	}

// 	render() {
// 		return (
// 			<>
// 				<h2>Class Component ToDo</h2>
// 				<input type="text" value={this.state.value} onChange={this.onChangeHandler.bind(this)} />
// 				<ul>
// 					{
// 						this.state.todos.map((todo, index) => { return <li key={index}>{todo}</li>}) 
// 					}
// 				</ul>
// 				<p>{this.state.todos.length}</p>
			
// 				<button type="button" onClick={this.addTask.bind(this)}>Add ToDo</button>
				
// 		<br/>
// 				<button type="button" onClick={this.clearList}>Clear ToDo List</button>
		
// 				<p>Timer: {this.state.timer}</p>
// 			</>
// 		)
// 	}
// }
 
// export default ToDoListClassComp;