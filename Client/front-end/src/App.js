
import './App.css';
import {Route,Routes} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from './Component/Home';
import Register from './Component/Register.js';
import Edit from './Component/Edit.js';
import Details from './Component/Details';


function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register" element={<Register/>} />
      <Route path='/detail/:id' element={<Details />}/>
      <Route path="/edit/:id" element={<Edit/>} />
      </Routes>
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
