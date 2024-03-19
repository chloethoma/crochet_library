const express = require('express');
const { Pool } = require('pg');
const queryAllData = require('./query').queryAllData
const getDataByProject = require('./query').getDataByProject
require('dotenv').config()

/*
    Connexion database SUPABASE
*/
const pool = new Pool({
    connectionString:process.env.SUPABASE_URI
});

const app = express();
app.use(express.urlencoded({extended:true}));


app.get("/api/all", async (req, res) => {
    try {
        const queryResult = await pool.query(queryAllData);
        res.status(200).json(queryResult.rows);
    } catch (err) {
        console.error ("Erreur d'exécution de la requête :", err);
        res.status(500).json({error: "Erreur"})
    }
});

app.get("/api/item/:id", async (req, res) => {
    try{
        const itemId = req.params.id
        const queryResult = await pool.query(getDataByProject(itemId))
        res.status(200).json(queryResult.rows)

    } catch(err) {
        console.error("Erreur d'exécution de la requête GET:", err)
        res.status(500).json({error:"Erreur"})
    }
})

// app.post('/api/library', (req, res, next) => {
//     try {
//         console.log(req.body)
//         res.status(201).json({message:"Nouveau projet crée !"})
//     }catch (err) {
//         console.error("Erreur d'exécution de la requête POST :", err)
//         res.status(500).json({error:'Erreur'})
//     }
// });

module.exports = app;

