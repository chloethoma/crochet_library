/* 
  GET - Récupère les datas de tous les projets pour la Home Page
*/
const queryAllData = `SELECT id, name, category, photo FROM project ORDER BY id ASC`;

// Query sans la quantity
// const getDataByProject = (projectId) => {
//   return `SELECT
//   project.*,
//   JSON_AGG(DISTINCT pattern.*) AS pattern,
//   JSON_AGG(DISTINCT wool.*) AS wool
// FROM
//   project
//   LEFT JOIN pattern_project_relation ON project.id = pattern_project_relation.project_id
//   LEFT JOIN pattern ON pattern_project_relation.pattern_id = pattern.id
//   LEFT JOIN wool_project_relation ON project.id = wool_project_relation.project_id
//   LEFT JOIN wool ON wool_project_relation.wool_id = wool.id
// WHERE project.id = ${projectId}
// GROUP BY
//   project.id,
//   project.name,
//   project.category,
//   project.photo,
//   project.year,
//   project.month,
//   project.customer,
//   project.size,
//   project.hook_number,
//   project.notes;`;
// };

/* 
  GET - Récupère toutes les datas pour un projet, en fonction de son id
*/
const getDataByProject = (projectId) => {
  return `
  select
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
    project.id = ${projectId}
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
    project.notes;`;
};

const postDataNewProject = (data) => {
  return `
  insert into project (name, category, customer, size, hook_number, notes, photo, year, month)
  values ('${data.name}', '${data.category}', '${data.customer}', '${data.size}', ${data.hook_number}, '${data.notes}', ${data.photo}, '${data.year}', '${data.month}');
  
  insert into pattern (name, source, link, file)
  values ('${data.pattern.name}', '${data.pattern.source}', ${data.pattern.link}, ${data.pattern.file});
  
  insert into wool (brand, name, grammage, color, material, price)
  values ('${data.wool.brand}', '${data.wool.name}', ${data.wool.grammage}, '${data.wool.color}', '${data.wool.material}', ${data.wool.price});
  `
}

const getIdFromPostRequest = () => {

}

const postDataInRelationTable = () => {
  return `-- Insertion dans la table de relation project_wool
INSERT INTO project_wool (project_id, wool_id)
VALUES (project_id, wool_id);

-- Insertion dans la table de relation project_pattern
INSERT INTO project_pattern (project_id, pattern_id)
VALUES (project_id, pattern_id);
`
}


// WITH inserted_project AS (
//   INSERT INTO project (name, category, customer, size, hook_number, notes, photo, year, month)
//   VALUES ('${data.name}', '${data.category}', '${data.customer}', '${data.size}', ${data.hook_number}, '${data.notes}', '${data.photo}', '${data.year}', '${data.month}')
//   RETURNING id
//   ),
// inserted_wool AS (
//   INSERT INTO wool (brand, name, grammage, color, material, price)
//   VALUES ('${data.brand}', '${data.name}', ${data.grammage}, '${data.color}', '${data.material}', ${data.price})
//   RETURNING id
// ),
// inserted_pattern AS (
// INSERT INTO pattern (name, source, link, file)
// VALUES ('${data.name}', '${data.source}', '${data.link}', '${data.file}')
// RETURNING id
// )
// INSERT INTO wool_project_relation (project_id, wool_id)
// SELECT inserted_project.id, inserted_wool.id FROM inserted_project, inserted_wool;

// INSERT INTO pattern_project_relation (project_id, pattern_id)
// SELECT inserted_project.id, inserted_pattern.id FROM inserted_project, inserted_pattern;
// `



module.exports = { queryAllData, getDataByProject, postDataNewProject };