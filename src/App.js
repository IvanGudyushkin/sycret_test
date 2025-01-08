import './App.css';
import {BrowserRouter} from "react-router-dom";
import Routs from "./Routs/Routs";
function App() {


  return (
      <div className="App">
          <BrowserRouter>
              <Routs/>
          </BrowserRouter>
      </div>

  );
}

export default App;
