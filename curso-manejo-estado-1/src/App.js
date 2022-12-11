import { UseState } from './UseState.js'
import { ClassState } from './ClassState.js'
import { UseReducer } from './useReducer.js'

import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState"></UseState>
      <UseReducer name="UseReducer"></UseReducer>
    </div>
  );
}

export default App;
