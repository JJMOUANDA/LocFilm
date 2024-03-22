import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./components/Public/Home";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import FilmList from "./components/Utilisateur/FilmList";
import FilmManagement from "./components/Admin/FilmManagement";
import FilmEdit from "./components/Admin/FilmEdit";
import {useState} from "react";
import FilmDetails from "./components/Public/FilmDetails";
import FilmAdd from "./components/Admin/FilmAdd";
import FilmDetailsAdmin from "./components/Admin/FilmDetailsAdmin";
import HomeConnexion from "./components/Utilisateur/HomeConnexion";
import Logout from "./components/Logout";
import Rent from "./components/Rent";
import UserInf from './components/UserInf';
import FilmDetailsConnect from "./components/Utilisateur/FilmDetailsConnect";



function App() {
    const [films, setFilms] = useState([]);

  return (
    <div className="App">
        <Router>
                <Routes>

                    <Route path="/" element={<Home/>}/>
                    <Route path="/film" element={<FilmList/>}/>
                    <Route path="/signup" element={<SignUpForm/>}/>
                    <Route path="/rent" element={<Rent/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/logout" element={<Logout/>}/>
                    <Route path="/home" element={<HomeConnexion/>}/>
                    <Route path="/films" element={<FilmManagement films={films} setFilms={setFilms}/>}/>
                    <Route path="/films/:id/edit" element={<FilmEdit films={films} />} />
                    <Route path="/films/add" element={<FilmAdd/>}/>
                    <Route path="/films/:id" element={<FilmDetails films={films} comments={{}}/>}/>
                    <Route path="/filmsConnect/:id" element={<FilmDetailsConnect films={films} comments={{}}/>}/>
                    <Route path="/filmsAdmin/:id" element={<FilmDetailsAdmin films={films} comments={{}}/>}/>
                    <Route path="/User/:id" element={<UserInf/>}/>
                </Routes>


        </Router>
    </div>
  );
}

export default App;
