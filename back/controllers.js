const { Pool } = require('pg');
const query = require('./query');

/*
    Connexion database SUPABASE
*/
const db = new Pool({
    connectionString:process.env.SUPABASE_URI
});

/*
    Route GET api/all : récupère les données principales de tous les projets (name, category, photo). Affichage sur la home page.
*/
exports.getAll = async (req, res) => {
    try {
        const queryText = query.getAllData;
        const queryResult = await db.query(queryText);
        res.status(200).json(queryResult.rows);
    } catch (error) {
        res.status(500).json({"Erreur d'exécution de GET api/all":`${error}`})
    }
};

/*
    Route GET api/item/id : récupère toutes les données d'un seul projet (en fonction de son id).
*/
exports.getItemById = async (req, res) => {
    try{
        const itemId = req.params.id
        const queryText = query.getItemById(itemId)
        const queryResult = await db.query(queryText)
        res.status(200).json(queryResult.rows[0])
    } catch(error) {
        res.status(500).json({"Erreur d'exécution de GET api/item/id":`${error}`})
    }
};

/*
    Route POST new_project : insère toutes les données d'un nouveau projet dans les tables project, wool, pattern + tables relation (x2)
*/
exports.postNewProject = async (req, res) => {
    try {
        const data = req.body
        
        await db.query('begin')
        const queryProject = query.postInTableProject(data)
        const queryProjectInsert = await db.query(queryProject)
        
        for (const pattern of data.pattern) {
            const queryPattern = query.postInTablePattern(pattern)
            const queryPatternInsert = await db.query(queryPattern)

            const queryPatternRelation = query.postInTablePatternProjectRelation(queryProjectInsert, queryPatternInsert)
            await db.query(queryPatternRelation)
        }
        
        for (const wool of data.wool) {
            const queryWool = query.postInTableWool(wool)
            const queryWoolInsert = await db.query(queryWool)

            const queryWoolRelation = query.postInTableWoolProjectRelation(queryProjectInsert, queryWoolInsert)
            await db.query(queryWoolRelation)
        }

        await db.query('commit')
        res.status(201).json({message:'succeed'})
        
    } catch (error) {
        await db.query('rollback')
        res.status(500).json({"Erreur d'exécution de POST api/new_project":`${error}`})
    }
};
