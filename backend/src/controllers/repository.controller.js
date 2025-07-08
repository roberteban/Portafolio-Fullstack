const Repository = require('../models/Repository');
const githubService = require('../services/github.service');

class RepositoryController {
  async syncRepositories(req, res) {
    try {
      await githubService.syncRepositories();

      res.json({
        success: true,
        message: 'Repositories synchronized successfully'
      });
    } catch (error) {
      console.error('Sync error:', error);
      res.status(500).json({
        success: false,
        message: 'Error synchronizing repositories',
        error: error.message
      });
    }
  }

  async getRepositories(req, res) {
    try {
      const repositories = await Repository.find()
        .sort({ githubUpdatedAt: -1 }) 
        .limit(3); 

      res.json({
        success: true,
        data: repositories
      });
    } catch (error) {
      console.error('Get repositories error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching repositories',
        error: error.message
      });
    }
  }

  async getRepository(req, res) {
    try {
      const { id } = req.params;
      const repository = await Repository.findById(id);

      if (!repository) {
        return res.status(404).json({
          success: false,
          message: 'Repository not found'
        });
      }

      res.json({
        success: true,
        data: repository
      });
    } catch (error) {
      console.error('Get repository error:', error);
      res.status(500).json({
        success: false,
        message: 'Error fetching repository',
        error: error.message
      });
    }
  }
}

module.exports = new RepositoryController();
