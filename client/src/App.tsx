import { Route,  Routes } from "react-router-dom";
import "./App.css";
import {  } from "react-router-dom";
import { SignUp } from "./pages/signup";

function App() {
  return (
    <Routes location={window.location} key={window.location.pathname}>
      <Route path="/" Component={SignUp} />
    </Routes>
  );
}

export default App;
