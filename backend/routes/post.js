const express = require('express');
const PostController = require('../controller/post');
const validator = require('../validator')
const router = express.Router();
const { upload, processImage } = require('../middleware/upload');


router.post('/usersignup',PostController.createUser);
router.post('/userlogin',PostController.UserLogin);
router.get('/user/:id',PostController.getUserById);
router.post('/postjob',PostController.postJob);
router.get('/searchjob',PostController.searchJob);
router.get('/jobs',PostController.getAllJobs);
router.put('/updatejob/:id',PostController.updateJob);
router.post('/postalljobs',PostController.postallJobs);

module.exports = router;