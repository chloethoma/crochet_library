const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.get("/all", controller.getAll);
router.get("/item/:id", controller.getItemById);
router.post('/new_project', controller.postNewProject);

module.exports = router;