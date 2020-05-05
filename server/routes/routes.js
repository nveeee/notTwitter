const express = require('express');
const router = express.Router();
const { getUser, addUser, editUser, deleteUser } = require('../controllers/userController');
const { getPosts, getPost, addPost, editPost, deletePost } = require('../controllers/postController');
const { getFollowers, getFollower, addFollower, deleteFollower } = require('../controllers/followerController');
const { getLikes, getLike, addLike, deleteLike } = require('../controllers/likeController');

router.route('/user')
	.get(getUser)
	.post(addUser);

router.route('/user/:id')
	.delete(deleteUser)
	.put(editUser);

router.route('/posts')
	.post(addPost)
	.get(getPost);

router.route('/posts/:id')
	.delete(deletePost)
	.put(editPost);

router.route('/feed')
	.get(getPosts);

router.route('/followers')
	.get(getFollowers);

router.route('/follower')
	.get(getFollower)
	.post(addFollower);

router.route('/follower/:id')
	.delete(deleteFollower);

router.route('/likes')
	.get(getLikes);

router.route('/like')
	.get(getLike)
	.post(addLike);

router.route('/like/:id')
	.delete(deleteLike);

module.exports = router;
