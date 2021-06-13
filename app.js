const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
// const Thing = require('./models/Thing');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://muhanand:Qz4JQy6Gmew3cen@cluster0.hspsk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/sauces', (req, res, next) => {
  const sauces = [
    {
      _id: 'oeihfzeoi',
      userId : 'e5r46er46ze',
      name: 'Mon premier objet',
      manufacturer: 'Les infos de mon premier objet',
      mainPepper: 'Les infos de mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      heat: '5',
      likes: "9",
      dislikes: '6',
      usersLiked: '6',
      usersDisliked: '6',
    },
    {
      _id: 'oeihfzeoi',
      userId : 'e5r46er46ze',
      name: 'Mon premier objet',
      manufacturer: 'Les infos de mon premier objet',
      mainPepper: 'Les infos de mon premier objet',
      description: 'Les infos de mon premier objet',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      heat: '5',
      likes: "9",
      dislikes: '6',
      usersLiked: '6',
      usersDisliked: '6',
    },
  ];
  res.status(200).json(sauces);
});


app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;