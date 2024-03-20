import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import FilmList from "./components/FilmList";
import FilmManagement from "./components/FilmManagement";
import FilmEdit from "./components/FilmEdit";
import {useState} from "react";
import FilmDetails from "./components/FilmDetails";



function App() {
    const [films, setFilms] = useState([]);

  return (
    <div className="App">
        <Router>
                <Routes>

                    <Route path="/" element={<Home/>}/>
                    <Route path="/film" element={<FilmList/>}/>
                    <Route path="/signup" element={<SignUpForm/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/films" element={<FilmManagement films={films} setFilms={setFilms}/>}/>
                    <Route path="/films/:id/edit" element={<FilmEdit films={films} />} />
                    <Route path="/films/:id" element={<FilmDetails films={films} comments={{}}/>}/>
                </Routes>


        </Router>
    </div>
  );
}

export default App;
