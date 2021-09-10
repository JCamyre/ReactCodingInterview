import logo from "./logo.svg";
import "./App.css";
import ButtonCounter from "./ButtonCounter";
import FetchApi from "./FetchApi.jsx";

function App() {
  return (
    <div className="App">
      <ButtonCounter />
      <FetchApi />
    </div>
  );
}

export default App;
