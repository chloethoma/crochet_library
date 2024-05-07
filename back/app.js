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
        
        try {
            await db.query('begin')
            const queryProject = `
            insert into project (name, category, customer, size, hook_number, notes, photo, year, month)
            values ($1, $2, $3, $4, $5, $6, $7, $8 ,$9)
            returning id
            `
            const valuesProject = [data.name, data.category, data.customer, data.size, data.hook_number, data.notes, data.photo, data.year, data.month]
            const queryProjectInsert = await db.query(queryProject, valuesProject)
            
            for (const pattern of data.pattern) {
                const queryPattern = `
                insert into pattern (name, source, link)
                values ($1, $2, $3)
                returning id
                `
                const valuesPattern = [pattern.name, pattern.source, pattern.link]
                const queryPatternInsert = await db.query(queryPattern, valuesPattern)

                const queryPatternRelation = `
                insert into pattern_project_relation (project_id, pattern_id)
                values ($1, $2)
                `
                const valuesPatternRelation = [queryProjectInsert.rows[0].id, queryPatternInsert.rows[0].id]
                await db.query(queryPatternRelation, valuesPatternRelation)
            }
            
            for (const wool of data.wool) {
                const queryWool = `
                insert into wool (brand, name, grammage, color, material, price)
                values ($1, $2, $3, $4, $5, $6)
                returning id          
                `
                const valuesWool = [wool.brand, wool.name, wool.grammage, wool.color, wool.material, wool.price]
                const queryWoolInsert = await db.query(queryWool, valuesWool)

                const queryWoolRelation = `
                insert into wool_project_relation (project_id, wool_id)
                values ($1, $2)
                `
                const valuesWoolRelation = [queryProjectInsert.rows[0].id, queryWoolInsert.rows[0].id]
                await db.query(queryWoolRelation, valuesWoolRelation)
            }

            await db.query('commit')

        } catch (error) {
            await db.query('rollback')
            throw error
        }
        res.status(201).json({message:'succeed'})

    } catch (err) {
        console.error("Erreur d'exécution de POST :", err)
        res.status(500).json({message:err})
    }
});


module.exports = app;

