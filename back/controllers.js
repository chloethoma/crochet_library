const { Pool } = require('pg');
const query = require('./query');

/*
    Connexion database SUPABASE
*/
const db = new Pool({
    connectionString:process.env.SUPABASE_URI
});


exports.get = async (req, res) => {
    try {
        res.status(200).json({message:"route get '/' succeed"})
    } catch (error) {
        res.status(500).json(error)
    }
};

exports.getAll = async (req, res) => {
    try {
        const queryText = query.getAllData;
        const queryResult = await db.query(queryText);
        res.status(200).json(queryResult.rows);
    } catch (err) {
        console.error ("Erreur d'exécution de GET api/all :", err);
        res.status(500).json(err)
    }
};

exports.getItemById = async (req, res) => {
    try{
        const itemId = req.params.id
        const queryText = query.getItemById(itemId)
        const queryResult = await db.query(queryText)
        res.status(200).json(queryResult.rows[0])
    } catch(err) {
        console.error("Erreur d'exécution de GET api/item/id :", err)
        res.status(500).json({message: err})
    }
};

exports.postNewProject = async (req, res) => {
    try {
        const data = req.body
        
        try {
            await db.query('begin')
            const queryProject = {
                text:`
                insert into project (name, category, customer, size, hook_number, notes, photo, year, month)
                values ($1, $2, $3, $4, $5, $6, $7, $8 ,$9)
                returning id
                `,
                values:[data.name, data.category, data.customer, data.size, data.hook_number, data.notes, data.photo, data.year, data.month]
            }
            const queryProjectInsert = await db.query(queryProject)
            
            for (const pattern of data.pattern) {
                const queryPattern = {
                    text:`
                    insert into pattern (name, source, link)
                    values ($1, $2, $3)
                    returning id
                    `,
                    values:[pattern.name, pattern.source, pattern.link]
                }
                const queryPatternInsert = await db.query(queryPattern)

                const queryPatternRelation = {
                    text:`
                    insert into pattern_project_relation (project_id, pattern_id)
                    values ($1, $2)
                    `,
                    values:[queryProjectInsert.rows[0].id, queryPatternInsert.rows[0].id]
                }
                await db.query(queryPatternRelation)
            }
            
            for (const wool of data.wool) {
                const queryWool = {
                    text:`
                    insert into wool (brand, name, grammage, color, material, price)
                    values ($1, $2, $3, $4, $5, $6)
                    returning id          
                    `,
                    values:[wool.brand, wool.name, wool.grammage, wool.color, wool.material, wool.price]
                }
                const queryWoolInsert = await db.query(queryWool)

                const queryWoolRelation = {
                    text:`
                    insert into wool_project_relation (project_id, wool_id)
                    values ($1, $2)
                    `,
                    values:[queryProjectInsert.rows[0].id, queryWoolInsert.rows[0].id]
                }

                await db.query(queryWoolRelation)
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
};
