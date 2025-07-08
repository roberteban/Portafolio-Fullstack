const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default: ''
  },
  technologies: [{
    type: String
  }],
  url: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  stars: {
    type: Number,
    default: 0
  },
  forks: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: ''
  },
  githubUpdatedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Repository', repositorySchema);
