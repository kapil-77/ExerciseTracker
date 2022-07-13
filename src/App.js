import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component.js";
import ExercisesList from "./components/exercises-list.component.js";
import EditExercise from "./components/edit-exercise.component.js";
import CreateExercise from "./components/create-exercise.component.js";
import LandingPage from "./screens/LandingPage/LandingPage.js";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen.js";
import LoginScreen from "./screens/LoginScreen/LoginScreen.js";

const App = () => (
  <Router>
    <div className="container">
      <Navbar />
      <br />
      <Route path="/" exact component={LandingPage} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/exercises" component={ExercisesList} />
      <Route path="/edit/:id" component={EditExercise} />
      <Route path="/create" component={CreateExercise} />
    </div>
  </Router>
);

export default App;
