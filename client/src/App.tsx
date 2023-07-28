import { Route,  Routes } from "react-router-dom";
import "./App.css";
import {  } from "react-router-dom";
import { SignUp } from "./pages/signup";
import Users from "./pages/users";

function App() {
  return (
    <Routes location={window.location} key={window.location.pathname}>
      <Route path="/" Component={SignUp} />
      <Route path="/users" Component={Users} />
    </Routes>
  );
}

export default App;
