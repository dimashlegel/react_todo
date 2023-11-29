// import ClassComponent from './ClassComponent';
// import FunctionalComponent from './FunctionalComponent';

import ToDoList from './homework/todo/ToDoList';
import ToDoListClassComp from './homework/todo/ToDoListClassComponent';
import RestApiTest from './homework/restAPI/restAPITest';
import { useState } from 'react';

import './App.css';

function App() {

	const [isShowTimer, setIsShowTimer] = useState(false);

  return (
    <div className="App">
      <header className="App-header">

				{/* {isShowTimer ? <ToDoListClassComp /> : <ToDoList /> } */}
					{/* <p> */}
						{/* <button onClick={() => setIsShowTimer((boolValue) => !boolValue)}>Toggle Component</button> */}
					{/* </p> */}

					<RestApiTest />
					
      </header>
    </div>
  );
}

export default App;
