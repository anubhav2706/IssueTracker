const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Issue = require('../models/Issue');

// Route to display project details and related issues
router.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { labels, author, search } = req.query;
    console.log(labels, author, search);
    const project = await Project.findById(projectId);

    let issues = await Issue.find({ project: projectId });

    // Apply filters based on query parameters
    if (labels) {
      issues = issues.filter((issue) => issue.labels.includes(labels));
    }

    if (author) {
      issues = issues.filter((issue) => issue.author === author);
    }

    if (search != null || search != undefined) {
      const searchRegex = new RegExp(search, 'i');
      issues = issues.filter(
        (issue) =>
          issue.title.match(searchRegex) || issue.description.match(searchRegex)
      );
    }
    const menuItems = [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/about' },
      { label: 'Contact', link: '/contact' }
    ];

    const socialMediaLinks = [
      { url: 'https://www.facebook.com', icon: '/images/facebook.png', name: 'Facebook' },
      { url: 'https://www.twitter.com', icon: '/images/twitter.png', name: 'Twitter' },
      { url: 'https://www.instagram.com', icon: '/images/instagram.png', name: 'Instagram' }
    ];
    res.render('projectDetail', { project, issues, menuItems, socialMediaLinks: socialMediaLinks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to create a new issue for a project
router.post('/:projectId/create', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { title, description, labels, author } = req.body;
    const issue = await Issue.create({
      title,
      description,
      labels,
      author,
      project: projectId,
    });
    res.redirect(`/issues/${projectId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
