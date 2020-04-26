const pool = require('../db');

// GET api/v1/nottwitter/posts
exports.getPosts = async (req, res, next) => {
	try {
		const user = await pool.query('SELECT * FROM users WHERE id = $1', [req.body.id]);

		if (user.rows[0].followers) {
			const followerIds = user.rows[0].followers.join(',');

			const posts = await pool.query(`SELECT * FROM posts WHERE userid IN (${followerIds})`);
			return res.status(200).json({
				success: true,
				posts: posts.rows
			});
		}

		return res.status(200).json({
			success: true
		});
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// GET api/v1/nottwitter/post
exports.getPost = async (req, res, next) => {
	try {
		console.log(req.body.id)
		const post = await pool.query('SELECT * FROM posts WHERE id = $1', [req.body.id]);

		return res.status(200).json({
			success: true,
			data: post.rows[0]
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// POST api/v1/nottwitter/post
exports.addPost = async (req, res, next) => {
	try {
		const { text, userId } = req.body;

		const newPost = await pool.query('INSERT INTO posts (text, userid) VALUES ($1, $2) RETURNING *', [text, userId]);

		return res.status(201).json({
			success: true,
			data: newPost.rows[0]
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// DELETE api/v1/nottwitter/post/:id
exports.deletePost = async (req, res, next) => {
	try {
		await pool.query('DELETE FROM posts WHERE id = $1', [req.params.id]);

		return res.status(200).json({
			success: true
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// PUT api/v1/nottwitter/post/:id
exports.editPost = async (req, res, next) => {
	try {
		const { text } = req.body;
		const editedPost = await pool.query('UPDATE posts SET text = $1 WHERE id = $2 RETURNING *', [text, req.params.id]);

		res.status(200).json({
			success: true,
			editedPost: editedPost.rows[0]
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};
