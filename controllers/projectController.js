const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Route to display list of projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
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

res.render('index', { projects, menuItems, socialMediaLinks: socialMediaLinks });

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to create a new project
router.post('/new-project', async (req, res) => {
  try {
    const { name, description, author } = req.body;
    const project = await Project.create({ name, description, author });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/new-project', async(req, res) => {
  try{
    const menuItems = [
      { label: 'Home', link: '/' },
      { label: 'About', link: '/about' },
      { label: 'Contact', link: '/contact' }
    ];
   // Assuming you have an array of social media links with URLs and icons
const socialMediaLinks = [
  { url: 'https://www.facebook.com', icon: '/images/facebook.png', name: 'Facebook' },
  { url: 'https://www.twitter.com', icon: '/images/twitter.png', name: 'Twitter' },
  { url: 'https://www.instagram.com', icon: '/images/instagram.png', name: 'Instagram' }
];
res.render('createProject', { menuItems, socialMediaLinks: socialMediaLinks });
  }catch(err){
    console.error(err);
  }
})

module.exports = router;
