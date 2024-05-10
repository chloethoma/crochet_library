const { Pool } = require('pg');

/*
    Connexion database SUPABASE
*/
const pool = new Pool({
    connectionString:process.env.SUPABASE_URI
});

exports.query = (text, params, callback) => {
    return pool.query(text, params, callback)
}

