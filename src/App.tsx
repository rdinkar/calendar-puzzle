import "./App.css";
import { Board } from "./Board";
import { PiecesContainer } from "./pieces-container";

function App() {
  return (
    <div className="app-container">
      <Board />
      <PiecesContainer />
    </div>
  );
}

export default App;
