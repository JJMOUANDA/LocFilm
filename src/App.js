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
    const [films, setFilms] = useState([
        {
            id: 1,
            name: 'Black Panther',
            releaseDate: '2022-01-01',
            description: 'Après avoir participé à l\'affrontement entre Iron Man et Captain AmericaNote 1, le prince T\'Challa retourne chez lui dans la nation africaine reculée et technologiquement avancée du Wakanda, pour servir son pays en tant que nouveau roi. Cependant, le pouvoir de T\'Challa va bientôt être défié par des membres de son propre pays. Quand deux ennemis conspirent pour détruire le Wakanda, Black Panther doit s\'allier à l\'agent de la CIA Everett K. Ross et aux membres du Dora Milaje, les forces spéciales du Wakanda, pour éviter que le pays ne soit emporté dans un conflit mondial.',
            youtubeLink: 'https://youtu.be/DlGIWM_e9vg?si=U_VXwLVd39z3M5j1',
            price: 10,
            state: 'A',
            imageUrl: 'https://cdn.kobo.com/book-images/7e060fa5-3a91-4ed1-94a3-57274b53e233/1200/1200/False/marvel-s-black-panther-4.jpg',
            comments: [
                {
                    id: 1,
                    userId: 'John Doe',
                    text: 'J\'ai adoré ce film !',
                    date: '2022-02-01'
                },
                {
                    id: 2,
                    userId: 'Jane Doe',
                    text: 'Un film incroyable avec une histoire captivante et des effets spéciaux époustouflants.',
                    date: '2022-02-02'
                }
            ]
        },
        {
            id: 2,
            name: 'Film 2',
            releaseDate: '2022-02-01',
            description: 'Description du film 2',
            youtubeLink: 'https://www.youtube.com/watch?v=yyyyy',
            price: 8,
            state: 'D',
            imageUrl: 'url_vers_image_2',
            comments: []
        },
        {
            id: 3,
            name: 'Film 3',
            releaseDate: '2022-02-01',
            description: 'Description du film 2',
            youtubeLink: 'https://www.youtube.com/watch?v=yyyyy',
            price: 8,
            state: 'D',
            imageUrl: 'url_vers_image_2',
            comments: []
        },
        {
            id: 4,
            name: 'Film 4',
            releaseDate: '2022-02-01',
            description: 'Description du film 2',
            youtubeLink: 'https://www.youtube.com/watch?v=yyyyy',
            price: 8,
            state: 'D',
            imageUrl: 'url_vers_image_2',
            comments: []
        },
    ]);

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
                    <Route path="/films/:id" element={<FilmDetails films={films} />}/>
                </Routes>


        </Router>
    </div>
  );
}

export default App;
