const express = require('express');
const { Pool } = require('pg');
const queryAllData = require('./query').queryAllData
const getDataByProject = require('./query').getDataByProject

/*
    Connexion database SUPABASE
*/
const pool = new Pool({
    connectionString:"postgres://postgres.xwngsbqvrqlddcwhgekf:5p8DRnHneHU9NqFh@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"
});

/*
Connexion database POSTGRESQL
*/
// const { Pool } = require('pg');
// const pool = new Pool({
//         user: "postgres",
//         host: "localhost",
//         database: "crochet_library",
//         password: "T0d&Capsul3!",
//         port: 5432,
//     });  


const app = express();
app.use(express.urlencoded({extended:true}));

// const crochetLibrary = [
//     {
//         "_id":1,
//         "name":"Taro le dino",
//         "category":"Amigurumi",
//         "pattern" : {
//             "name":"taro le dino",
//             "origin":"cultura"
//         },
//         "technical":{
//             "hookSize":3,
//             "stitch":["mailles serées", "cercle magique"]
//         },
//         "wool":{
//             "name":"Ricorumi",
//             "brand":"Ricorumi",
//             "type":"coton"
//         },
//         "notes":"facile à faire"
//     },
//     {
//         "_id":2,
//         "name":"Hochet citron",
//         "category":"Amigurumi",
//         "pattern" : {
//             "name":"hochet citron",
//             "origin":"hobbi"
//         },
//         "technical":{
//             "hookSize":3,
//             "stitch":["mailles serées", "cercle magique"]
//         },
//         "wool":{
//             "name":"Ricorumi",
//             "brand":"Ricorumi",
//             "type":"coton"
//         },
//         "notes":"facile à faire"
//     },
//     {
//         "_id":3,
//         "name":"Pochette écouteurs",
//         "category":"Accessoire",
//         "pattern" : {
//             "name":"pochette écouteurs",
//             "origin":"hibouchoucaillou"
//         },
//         "technical":{
//             "hookSize":3,
//             "stitch":["granny square"]
//         },
//         "wool":{
//             "name":"",
//             "brand":"",
//             "type":"coton"
//         },
//         "notes":"facile à faire et très pratique"
//     },
// ];

// const queryDataTest = "SELECT project.id, project.name,project.category, project.photo, project.year, project.month, project.customer, project.size, project.hook_number, project.notes, pattern.name, pattern.source, pattern.link, pattern.file FROM project INNER JOIN pattern_project_relation ON project.id = pattern_project_relation.project_id INNER JOIN pattern ON pattern_project_relation.pattern_id = pattern.id"

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

app.get("/api/test", async (req, res) => {
    try{
        const queryResult = await pool.query(`
        SELECT *
        FROM project
        `)

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

