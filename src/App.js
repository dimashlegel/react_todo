// import ClassComponent from './ClassComponent';
// import FunctionalComponent from './FunctionalComponent';

import ToDoList from './homework/todo/ToDoList';
import ToDoListClassComp from './homework/todo/ToDoListClassComponent';
import RestApiTest from './homework/restAPI/restAPITest';
import RestAPIReactQuery from './homework/restAPI/restAPI_react_query';
import { Route, Routes } from 'react-router-dom';
import Home from './homework/pages/home';
import About from './homework/pages/about';
import ToDo from './homework/todo/ToDoList';
import NotFoundPage from './homework/pages/not-found';
import Layout from './homework/components/layouts/Layout';

import './App.css';
import SingleToDo from './homework/todo/singleToDo';

function App() {

  return (
    <div className="App">
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/todo' element={<ToDo />} />
					<Route path='/todo/:id' element={<SingleToDo />} />
					<Route path='/about' element={<About />} />
					<Route path='*' element={<NotFoundPage />} />
				</Route>
				{/* {isShowTimer ? <ToDoListClassComp /> : <ToDoList /> } */}
					{/* <p>
						<button onClick={() => setIsShowTimer((boolValue) => !boolValue)}>Toggle Component</button>
					</p> */}
				{/* <RestAPIReactQuery /> */}
			</Routes>
    </div>
  );
}

export default App;
