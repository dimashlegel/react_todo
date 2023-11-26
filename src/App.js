// import ClassComponent from './ClassComponent';
// import FunctionalComponent from './FunctionalComponent';

import ToDoList from './homework/todo/ToDoList';
import ToDoListClassComp from './homework/todo/ToDoListClassComponent';
import './App.css';
import { useState } from 'react';

function App() {

	const [isShowTimer, setIsShowTimer] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
				{isShowTimer ? <ToDoListClassComp /> : <ToDoList /> }
					<p>
					<button onClick={() => setIsShowTimer((boolValue) => !boolValue)}>Toggle Component</button>
					</p>
					
      </header>
    </div>
  );
}

export default App;
