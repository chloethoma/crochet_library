const express = require('express');
require('dotenv').config();
const { Pool } = require('pg');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

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
        const query = `SELECT id, name, category, photo FROM project ORDER BY id ASC`;
        const queryResult = await db.query(query);
        res.status(200).json(queryResult.rows);
    } catch (err) {
        console.error ("Erreur d'exécution de GET api/all :", err);
        res.status(500).json({message: err})
    }
});

app.get("/api/item/:id", async (req, res) => {
    try{
        const itemId = req.params.id
        const query = {
            text:`select
            project.*,
            json_agg(distinct pattern.*) as pattern,
            case
              when count(wool.id) > 0 then jsonb_agg(
                distinct json_build_object(
                  'id', wool.id, 'brand', wool.brand, 'name', wool.name, 'grammage', wool.grammage, 'color', wool.color, 'material', wool.material, 'price', wool.price, 'quantity', wool_project_relation.quantity
                )::jsonb
              )
              else json_agg(
                distinct wool.*
              )::jsonb
            end as wool
          from
            project
            left join pattern_project_relation on project.id = pattern_project_relation.project_id
            left join pattern on pattern_project_relation.pattern_id = pattern.id
            left join wool_project_relation on project.id = wool_project_relation.project_id
            left join wool on wool_project_relation.wool_id = wool.id
          where
            project.id = $1
          group by
            project.id,
            project.name,
            project.category,
            project.photo,
            project.year,
            project.month,
            project.customer,
            project.size,
            project.hook_number,
            project.notes;`,
            values:[itemId]
        };
        // const queryResult = await db.query(getDataByProject(itemId))
        const queryResult = await db.query(query)
        res.status(200).json(queryResult.rows[0])
    } catch(err) {
        console.error("Erreur d'exécution de GET api/item/id :", err)
        res.status(500).json({message: err})
    }
})

app.post('/api/new_project', async (req, res) => {
    try {
        const data = req.body

        // const query = await db.query(postDataNewProject(data))
        res.status(201).json(data)
    } catch (err) {
        console.error("Erreur d'exécution de POST :", err)
        res.status(500).json({message:err})
    }
});

module.exports = app;

