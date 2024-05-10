const express = require('express');
require('dotenv').config();

const routes = require('./routes');
const app = express();

/*
    Nécessaire pour la route POST pour extraire le corps JSON du front
*/
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 

/*
    Gestion des CORS
*/
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/*
    Configuration route API. Voir détail des routes dans routes.js
*/
app.get('/', async (req, res) => {
    try {
        res.status(200).json({message:"OK !"})
    } catch (error) {
        res.status(500).json({message:"ERROR"})
    }
})

app.use('/api', routes)

module.exports = app;

