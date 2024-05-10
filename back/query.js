/* 
  GET - Récupère les datas de tous les projets pour la Home Page
*/
const getAllData = `SELECT id, name, category, photo FROM project ORDER BY id ASC`;

/* 
  GET - Récupère toutes les datas pour un projet, selon l'id
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

const postNewProject = (data) => {

}

module.exports = { getAllData, getItemById };
