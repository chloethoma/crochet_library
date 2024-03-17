const queryAllData = `SELECT id, name, category, photo FROM project ORDER BY id ASC`;

const getDataByProject = (projectId) => {
  return `SELECT
  project.*,
  JSON_AGG(DISTINCT pattern.*) AS pattern,
  JSON_AGG(DISTINCT wool.*) AS wool
FROM
  project
  LEFT JOIN pattern_project_relation ON project.id = pattern_project_relation.project_id
  LEFT JOIN pattern ON pattern_project_relation.pattern_id = pattern.id
  LEFT JOIN wool_project_relation ON project.id = wool_project_relation.project_id
  LEFT JOIN wool ON wool_project_relation.wool_id = wool.id
WHERE project.id = ${projectId}
GROUP BY
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
