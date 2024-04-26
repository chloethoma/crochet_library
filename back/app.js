const express = require('express');
const { Pool } = require('pg');
require('dotenv').config()

const queryAllData = require('./query').queryAllData
const getDataByProject = require('./query').getDataByProject
const postDataNewProject = require('./query').postDataNewProject

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json())

/*
    Connexion database SUPABASE
*/
const db = new Pool({
    connectionString:process.env.SUPABASE_URI
});

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
    Routes API
*/
app.get("/api/all", async (req, res) => {
    try {
        const queryResult = await db.query(queryAllData);
        res.status(200).json(queryResult.rows);
    } catch (err) {
        console.error ("Erreur d'exécution de GET api/all :", err);
        res.status(500).json({message: err})
    }
});

app.get("/api/item/:id", async (req, res) => {
    try{
        const itemId = req.params.id
        const queryResult = await db.query(getDataByProject(itemId))
        res.status(200).json(queryResult.rows)

    } catch(err) {
        console.error("Erreur d'exécution de GET api/item :", err)
        res.status(500).json({message: err})
    }
})

app.post('/api/new_project', async (req, res, next) => {
    try {
        const data = req.body
        console.log(data)
        // const query = await db.query(postDataNewProject(data))
        // res.status(201).json(query.rows)
    } catch (err) {
        console.error("Erreur d'exécution de POST :", err)
        res.status(500).json({message:err})
    }
});

module.exports = app;

