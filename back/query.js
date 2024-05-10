/* 
  GET api/all - texte de la query pour récupérer les datas de tous les projets pour la Home Page
*/
const getAllData = `SELECT id, name, category, photo FROM project ORDER BY id ASC`;

/* 
  GET api/item/id - texte de la query pour récupérer toutes les datas pour un projet, selon l'id
*/
const getItemById = (itemId) => {
  return {
  text: `select
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
  values: [itemId]
}};

/* 
  POST api/new_project - texte de la query pour insérer les données dans la table PROJECT
*/
const postInTableProject = (data) => {
  return {
    text:`
    insert into project (name, category, customer, size, hook_number, notes, photo, year, month)
    values ($1, $2, $3, $4, $5, $6, $7, $8 ,$9)
    returning id
    `,
    values:[data.name, data.category, data.customer, data.size, data.hook_number, data.notes, data.photo, data.year, data.month]
}
}

/* 
  POST api/new_project - texte de la query pour insérer les données dans la table PATTERN
*/
const postInTablePattern = (pattern) => {
  return {
    text:`
    insert into pattern (name, source, link)
    values ($1, $2, $3)
    returning id
    `,
    values:[pattern.name, pattern.source, pattern.link]
}
}

/* 
  POST api/new_project - texte de la query pour insérer les données dans la table de relation PROJECT/PATTERN
*/
const postInTablePatternProjectRelation = (queryProjectInsert, queryPatternInsert) => {
  return {
    text:`
    insert into pattern_project_relation (project_id, pattern_id)
    values ($1, $2)
    `,
    values:[queryProjectInsert.rows[0].id, queryPatternInsert.rows[0].id]
}
}

/* 
  POST api/new_project - texte de la query pour insérer les données dans la table WOOL
*/
const postInTableWool = (wool) => {
  return {
    text:`
    insert into wool (brand, name, grammage, color, material, price)
    values ($1, $2, $3, $4, $5, $6)
    returning id          
    `,
    values:[wool.brand, wool.name, wool.grammage, wool.color, wool.material, wool.price]
}
}

/* 
  POST api/new_project - texte de la query pour insérer les données dans la table de relation PROJECT/WOOL
*/
const postInTableWoolProjectRelation = (queryProjectInsert, queryWoolInsert) => {
  return {
    text:`
    insert into wool_project_relation (project_id, wool_id)
    values ($1, $2)
    `,
    values:[queryProjectInsert.rows[0].id, queryWoolInsert.rows[0].id]
}
}

module.exports = { getAllData, getItemById, postInTableProject, postInTablePattern, postInTablePatternProjectRelation, postInTableWool, postInTableWoolProjectRelation };
