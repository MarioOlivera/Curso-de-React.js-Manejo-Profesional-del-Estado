import { UseState } from './UseState.js'
import { ClassState } from './ClassState.js'

import './App.css';

function App() {
  return (
    <div className="App">
      <UseState name="UseState"></UseState>
      <ClassState name="ClassState"></ClassState>
    </div>
  );
}

export default App;
