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

const getDataByProject = (projectId) => {
  return `
  select
    project.*,
    json_agg(distinct pattern.*) as pattern,
    case
      when count(wool.id) > 0 then json_agg(
        distinct json_build_object(
          'id',
          wool.id,
          'brand',
          wool.brand,
          'name',
          wool.name,
          'grammage',
          wool.grammage,
          'color',
          wool.color,
          'material',
          wool.material,
          'price',
          wool.price,
          'quantity',
          wool_project_relation.quantity
        )::jsonb
      )
      else json_agg(
        distinct wool.*
      )::json
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

module.exports = { queryAllData, getDataByProject };