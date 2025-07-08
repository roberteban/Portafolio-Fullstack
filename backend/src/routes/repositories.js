const express = require('express');
const repositoryController = require('../controllers/repository.controller');

const router = express.Router();

router.get('/', repositoryController.getRepositories);
router.get('/:id', repositoryController.getRepository);
router.post('/sync', repositoryController.syncRepositories);

module.exports = router;