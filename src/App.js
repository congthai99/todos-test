import "./App.css";
import Todos from "./todos/Todos";
// import CheckBox from "./checkBox";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-name">todos</h1>
      </header>
      <div>
        <Todos />
        {/* <CheckBox /> */}
      </div>
    </div>
  );
}

export default App;
