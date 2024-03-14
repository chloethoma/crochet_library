const express = require('express');

/*
    Connexion database POSTGRESQL
*/
const { Pool } = require('pg');
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "crochet_library",
    password: "T0d&Capsul3!",
    port: 5432,
});  

/*
    Connexion database VERCEL
*/
// const { Pool } = require('pg')
// require('dotenv').config()
// const pool = new Pool({
//     connectionString: "postgres://default:Zgw2tcHqWD0h@ep-cool-snow-a2y9tgcd-pooler.eu-central-1.aws.neon.tech:5432/verceldb?sslmode=require",
// })
// const pool = new Pool({
//     connectionString: process.env.POSTGRES_URL
// })
// console.log(pool)


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

app.get("/api/all", async (req, res) => {
    try {
        const queryResult = await pool.query('SELECT id, name, category, photo FROM project ORDER BY id ASC');
        res.status(200).json(queryResult.rows);
    } catch (err) {
        console.error ("Erreur d'exécution de la requête :", err);
        res.status(500).json({error: "Erreur"})
    }
});

app.get("/api/item/:id", async (req, res) => {
    try{
        const itemId = req.params.id
        const queryResult = await pool.query(`SELECT id, name, category, photo FROM project WHERE id=${itemId}`)
        res.status(200).json(queryResult.rows)

    } catch(err) {
        console.error("Erreur d'exécution de la requête GET:", err)
        res.status(500).json({error:"Erreur"})
    }
})

app.post('/api/library', (req, res, next) => {
    try {
        console.log(req.body)
        res.status(201).json({message:"Nouveau projet crée !"})
    }catch (err) {
        console.error("Erreur d'exécution de la requête POST :", err)
        res.status(500).json({error:'Erreur'})
    }
});

module.exports = app;

// SELECT
// 	project.id,
// 	project.name,
// 	project.category, 
// 	project.photo,
// 	project.year,
// 	project.month,
// 	project.customer,
// 	project.size,
// 	project.hook_number,
// 	project.notes,
// 	pattern.name,
// 	pattern.source,
// 	pattern.link,
// 	pattern.file,
// 	GROUPE CONCAT ('source' SEPARATOR ",")
// FROM project
// INNER JOIN pattern_project_relation ON project.id = pattern_project_relation.project_id
// INNER JOIN pattern ON pattern_project_relation.pattern_id = pattern.id