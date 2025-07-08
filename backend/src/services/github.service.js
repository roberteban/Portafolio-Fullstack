const axios = require('axios'); 
const Repository = require('../models/Repository');

const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const getRepositories = async () => {
  const response = await axios.get(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-App',
      },
    }
  );

  return response.data;
};

const syncRepositories = async () => {
  const githubRepos = await getRepositories();

  const updatedRepos = await Promise.all(
    githubRepos.map(async (repo) => {
      const repoName = repo.name;

      const imageUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/imagenes/cover.jpg`;

      const repoData = {
        name: repoName,
        description: repo.description || '',
        url: repo.html_url,
        technologies: repo.language ? [repo.language] : [],
        stars: repo.stargazers_count,
        githubUpdatedAt: repo.updated_at,
        image: imageUrl,
      };

      return Repository.findOneAndUpdate(
        { name: repoName },
        repoData,
        { upsert: true, new: true }
      );
    })
  );

  return updatedRepos;
};

module.exports = {
  getRepositories,
  syncRepositories,
};
