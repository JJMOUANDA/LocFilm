require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcrypt');
const pool = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser le JSON
app.use(express.json());
// Autoriser les requêtes cross-origin de votre application front React
app.use(cors({
    origin: 'http://localhost:3000' // Autorise les requêtes cross-origin seulement pour ce domaine
}));

// Augmentez la limite de taille du corps de la requête
app.use(bodyParser.json({ limit: '50mb' })); // Augmente la limite à 50MB
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));


// Routes

app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const connection = await pool.getConnection();
      const [users] = await connection.query('SELECT * FROM User WHERE username = ?', [username]);
      connection.release();
      if (users.length > 0) {
        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        
        if (passwordMatch) {
          const token = jwt.sign({ userId: user.id, role: user.role, username: user.username }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
          res.json({ message: "Connexion réussie", token });
        } else {
          res.status(400).json({ message: "Mot de passe incorrect" });
        }
      } else {
        res.status(404).json({ message: "Utilisateur non trouvé" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la connexion" });
    }
  });

  app.post('/api/register', async (req, res) => {
    const { username, password, email, imageData } = req.body;
    console.log(req.body);
    if (!username || !password || !email) {
      return res.status(401).json({ message: "Le nom d'utilisateur, le mot de passe et l'email sont requis" });
    }
    
    try {
      // Vérifier si l'utilisateur ou l'email existe déjà
      const userCheck = await pool.query('SELECT * FROM User WHERE username = ? OR email = ?', [username, email]);
      if (userCheck[0].length > 0) {
        return res.status(402).json({ message: "L'utilisateur ou l'email existe déjà" });
      }
  
      // Hacher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Insérer l'utilisateur dans la base de données avec role 'u' et state 'a'
      if(imageData == null){
        await pool.query('INSERT INTO User (username,  passwordHash, email, imageData, role, state) VALUES (?, ?, ?, "", "U", "A")', [username, hashedPassword, email]);
      }
      await pool.query('INSERT INTO User (username,  passwordHash, email, imageData, role, state) VALUES (?, ?, ?, ?, "U", "A")', [username, hashedPassword, email, imageData]);
      res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
  });

// Vérifier le JWT
// Middleware pour vérifier le token et le rôle de l'utilisateur
function verifyTokenAndRole(role) {
    return function(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) {
            return res.status(403).send({ message: 'No token provided.' });
        }
        const token = bearerHeader.split(' ')[1]; // Supposer que le format est "Bearer <token>"


        jwt.verify(token, process.env.TOKEN_SECRET , (err, decoded) => {
            if (err) {
                return res.status(500).send({ message: 'Failed to authenticate token.' });
            }

            // Vérifiez si le rôle de l'utilisateur correspond au rôle requis
            if (decoded.role !== role) {
                return res.status(403).send({ message: 'Insufficient role.' });
            }

            // Si tout est bon, sauvegardez la demande pour une utilisation dans d'autres routes
            req.userId = decoded.id;
            req.username = decoded.username;
            req.role = decoded.role;
            next();
        });
    }
}

// UserFunction.js

function getAllUsers() {
    return axios.get(`${process.env.baseURL}/users`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function createUser(user) {
    return axios.post(`${process.env.baseURL}/users`, user)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function getUserById(id) {
    return axios.get(`${process.env.baseURL}/users/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function updateUser(id, user) {
    return axios.put(`${process.env.baseURL}/users/${id}`, user)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function deleteUser(id) {
    return axios.delete(`${process.env.baseURL}/users/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

// CommentFunction.js

function getAllComments() {
    return axios.get(`${process.env.baseURL}/comments`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function createComment(comment) {
    return axios.post(`${process.env.baseURL}/comments`, comment)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function getCommentById(id) {
    return axios.get(`${process.env.baseURL}/comments/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function updateComment(id, comment) {
    return axios.put(`${process.env.baseURL}/comments/${id}`, comment)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function deleteComment(id) {
    return axios.delete(`${process.env.baseURL}/comments/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

// PhotoFunction.js

function getAllPhotos() {
    return axios.get(`${process.env.baseURL}/photos`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function createPhoto(photo) {
    return axios.post(`${process.env.baseURL}/photos`, photo)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function getPhotoById(id) { 
    return axios.get(`${process.env.baseURL}/photos/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function getPhotoByFilmId(filmId) {
    return axios.get(`${process.env.baseURL}/photos/film/${filmId}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function updatePhoto(id, photo) {
    return axios.put(`${process.env.baseURL}/photos/${id}`, photo)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function deletePhoto(id) {
    return axios.delete(`${process.env.baseURL}/photos/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

// CartItemFunction.js

function getAllCartItems() {
    return axios.get(`${process.env.baseURL}/cartItems`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function createCartItem(cartItem) {
    return axios.post(`${process.env.baseURL}/cartItems`, cartItem)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function getCartItemById(id) {
    return axios.get(`${process.env.baseURL}/cartItems/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function updateCartItem(id, cartItem) {
    return axios.put(`${process.env.baseURL}/cartItems/${id}`, cartItem)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function deleteCartItem(id) {
    return axios.delete(`${process.env.baseURL}/cartItems/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

// CartFunction.js

function getAllCartItemsbyCartId(cartId) {
    return axios.get(`${process.env.baseURL}/carts/${cartId}/cartItems`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function getAllCarts() {
    return axios.get(`${process.env.baseURL}/carts`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function createCart(cart) {
    return axios.post(`${process.env.baseURL}/carts`, cart)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function getCartById(id) {
    return axios.get(`${process.env.baseURL}/carts/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function updateCart(id, cart) {
    return axios.put(`${process.env.baseURL}/carts/${id}`, cart)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function deleteCart(id) {
    return axios.delete(`${process.env.baseURL}/carts/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

// FilmFunction.js

function getAllFilms() {
    return axios.get(`${process.env.baseURL}/films`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}


function createFilm(film) {
    return axios.post(`${process.env.baseURL}/films`, film)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function getFilmById(id) {
    return axios.get(`${process.env.baseURL}/films/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function updateFilm(id, film) {
    return axios.put(`${process.env.baseURL}/films/${id}`, film)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function deleteFilm(id) {
    return axios.delete(`${process.env.baseURL}/films/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

// RentFunction.js

function getAllRents() {
    return axios.get(`${process.env.baseURL}/rents`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function getRentsByUserId(userId) {
    return axios.get(`${process.env.baseURL}/rents/user/${userId}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function createRent(rent) {
    return axios.post(`${process.env.baseURL}/rents`, rent)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}


function getRentById(id) {
    return axios.get(`${process.env.baseURL}/rents/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function updateRent(id, rent) {
    return axios.put(`${process.env.baseURL}/rents/${id}`, rent)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}

function deleteRent(id) {
    return axios.delete(`${process.env.baseURL}/rents/${id}`)
        .then(response => response.data)
        .catch(err => Promise.reject(err));
}



// CommentController
app.get('/location-film-api/comments', verifyTokenAndRole("U"), (req, res) => {
    getAllComments().then(comments => {
        res.json(comments);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.post('/location-film-api/comments', verifyTokenAndRole("U"), (req, res) => {
    createComment(req.body).then(comment => {
        res.status(201).json(comment);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/comments/:id', verifyTokenAndRole("U"), (req, res) => {
    getCommentById(req.params.id).then(comment => {
        res.json(comment);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.put('/location-film-api/comments/:id', verifyTokenAndRole("U"), (req, res) => {
    updateComment(req.params.id, req.body).then(comment => {
        res.json(comment);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.delete('/location-film-api/comments/:id', verifyTokenAndRole("U"), (req, res) => {
    deleteComment(req.params.id).then(comment => {
        res.json(comment);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// PhotoController
app.get('/location-film-api/photos', verifyTokenAndRole("U"), (req, res) => {
    getAllPhotos().then(photos => {
        res.json(photos);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.post('/location-film-api/photos', verifyTokenAndRole("U"), (req, res) => {
    createPhoto(req.body).then(photo => {
        res.status(201).json(photo);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/photos/:id', verifyTokenAndRole("U"), (req, res) => {
    getPhotoById(req.params.id).then(photo => {
        res.json(photo);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/photos/film/:id', verifyTokenAndRole("U"), (req, res) => {
    getPhotoByFilmId(req.params.id).then(photo => {
        res.json(photo);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.put('/location-film-api/photos/:id', verifyTokenAndRole("U"), (req, res) => {
    updatePhoto(req.params.id, req.body).then(photo => {
        res.json(photo);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.delete('/location-film-api/photos/:id', verifyTokenAndRole("U"), (req, res) => {
    deletePhoto(req.params.id).then(photo => {
        res.json(photo);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// UserController
app.get('/location-film-api/users', verifyTokenAndRole("A"), (req, res) => {
    getAllUsers().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.post('/location-film-api/users', verifyTokenAndRole("A"), (req, res) => {
    createUser(req.body).then(user => {
        res.status(201).json(user);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/users/:id', verifyTokenAndRole("U"), (req, res) => {
    getUserById(req.params.id).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.put('/location-film-api/users/:id', verifyTokenAndRole("U"), (req, res) => {
    updateUser(req.params.id, req.body).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.delete('/location-film-api/users/:id', verifyTokenAndRole("A"), (req, res) => {
    deleteUser(req.params.id).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// CartItemController
app.get('/location-film-api/cartItems', verifyTokenAndRole("U"), (req, res) => {
    getAllCartItems().then(cartItems => {
        res.json(cartItems);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.post('/location-film-api/cartItems', verifyTokenAndRole("U"), (req, res) => {
    createCartItem(req.body).then(cartItem => {
        res.status(201).json(cartItem);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/cartItems/:id', verifyTokenAndRole("U"), (req, res) => {
    getCartItemById(req.params.id).then(cartItem => {
        res.json(cartItem);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.put('/location-film-api/cartItems/:id', verifyTokenAndRole("U"), (req, res) => {
    updateCartItem(req.params.id, req.body).then(cartItem => {
        res.json(cartItem);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.delete('/location-film-api/cartItems/:id', verifyTokenAndRole("U"), (req, res) => {
    deleteCartItem(req.params.id).then(cartItem => {
        res.json(cartItem);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// CartController
app.get('/location-film-api/carts/:cartId/cartItems', verifyTokenAndRole("U"), (req, res) => {
    getAllCartItemsbyCartId(req.params.cartId).then(cartItems => {
        res.json(cartItems);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/carts', verifyTokenAndRole("U"), (req, res) => {
    getAllCarts().then(carts => {
        res.json(carts);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.post('/location-film-api/carts', verifyTokenAndRole("U"), (req, res) => {
    createCart(req.body).then(cart => {
        res.status(201).json(cart);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/carts/:id', verifyTokenAndRole("U"), (req, res) => {
    getCartById(req.params.id).then(cart => {
        res.json(cart);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.put('/location-film-api/carts/:id', verifyTokenAndRole("U"), (req, res) => {
    updateCart(req.params.id, req.body).then(cart => {
        res.json(cart);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.delete('/location-film-api/carts/:id', verifyTokenAndRole("U"), (req, res) => {
    deleteCart(req.params.id).then(cart => {
        res.json(cart);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// FilmController
app.get('/location-film-api/films', (req, res) => {
    getAllFilms().then(films => {
        res.json(films);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.post('/location-film-api/films', verifyTokenAndRole("A"), (req, res) => {
    createFilm(req.body).then(film => {
        res.status(201).json(film);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/films/:id', (req, res) => {
    getFilmById(req.params.id).then(film => {
        res.json(film);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.put('/location-film-api/films/:id', verifyTokenAndRole("A"), (req, res) => {
    updateFilm(req.params.id, req.body).then(film => {
        res.json(film);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.delete('/location-film-api/films/:id', verifyTokenAndRole("A"), (req, res) => {
    deleteFilm(req.params.id).then(film => {
        res.json(film);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// RentController
app.get('/location-film-api/rents', verifyTokenAndRole("U"), (req, res) => {
    getAllRents().then(rents => {
        res.json(rents);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/rents/user/:userId', verifyTokenAndRole("U"), (req, res) => {
    getRentsByUserId(req.params.userId).then(rents => {
        res.json(rents);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.post('/location-film-api/rents', verifyTokenAndRole("U"), (req, res) => {
    createRent(req.body).then(rent => {
        res.status(201).json(rent);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.get('/location-film-api/rents/:id', verifyTokenAndRole("U"), (req, res) => {
    getRentById(req.params.id).then(rent => {
        res.json(rent);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.put('/location-film-api/rents/:id', verifyTokenAndRole("U"), (req, res) => {
    updateRent(req.params.id, req.body).then(rent => {
        res.json(rent);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

app.delete('/location-film-api/rents/:id', verifyTokenAndRole("U"), (req, res) => {
    deleteRent(req.params.id).then(rent => {
        res.json(rent);
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});

// Start the server

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
