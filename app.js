const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const limiter = require('./middleware/limit');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const dotenv = require('dotenv').config();
// ajouter le helmet pour protéger http header
const helmet = require('helmet');
//pour sécurisé la connexion contre le € et dorlar sine pour les supprimer avant accédez à mongodb
const mongoSanitize = require('express-mongo-sanitize');


const app = express();

mongoose.connect(process.env.MONGOSE,
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

app.use(helmet());
app.use(limiter);
app.use(mongoSanitize());

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
