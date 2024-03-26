const express = require('express');
const { Pool } = require('pg');
require('dotenv').config()

const queryAllData = require('./query').queryAllData
const getDataByProject = require('./query').getDataByProject

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
        const data = req.body[0]
        const query = await db.query(
            `BEGIN;

            -- Insertion dans la table project
            INSERT INTO project (name, category, customer, size, hook_number, notes, photo, year, month)
            VALUES ('${data.name}', '${data.category}', '${data.customer}', '${data.size}', ${data.hook_number}, '${data.notes}', '${data.photo}', '${data.year}', '${data.month}')
            RETURNING id INTO project_id;
            
            -- Insertion dans la table wool
            INSERT INTO wool (brand, name, grammage, color, material, price)
            VALUES ('Marque de la laine', 'Nom de la laine', 50, 'Couleur', 'Matériel', 10.00)
            RETURNING id INTO wool_id;
            
            -- Insertion dans la table pattern
            INSERT INTO pattern (name, source, link, file)
            VALUES ('Nom du motif', 'Source', 'Lien', 'Fichier')
            RETURNING id INTO pattern_id;
            
            -- Insertion dans la table de relation project_wool
            INSERT INTO project_wool (project_id, wool_id)
            VALUES (project_id, wool_id);
            
            -- Insertion dans la table de relation project_pattern
            INSERT INTO project_pattern (project_id, pattern_id)
            VALUES (project_id, pattern_id);
            
            COMMIT;
            `            
        )
        res.status(201).json(data)
    } catch (err) {
        console.error("Erreur d'exécution de POST :", err)
        res.status(500).json({message:err})
    }
});

module.exports = app;

