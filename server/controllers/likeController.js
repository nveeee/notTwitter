const pool = require('../db');

// GET /api/v1/nottwitter/likes
exports.getLikes = async (req, res, next) => {
	try {
		const { likeIds } = req.query;

		const likes = await pool.query(`SELECT * FROM posts WHERE id IN (${likeIds.join(',')})`);

		return res.status(200).json({
			success: true,
			data: likes.rows
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// GET /api/v1/nottwitter/like
exports.getLike = async (req, res, next) => {
	try {
		const { id } = req.body;

		const post = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);

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

// POST /api/v1/nottwitter/like
exports.addLike = async (req, res, next) => {
	try {
		const { id, postId } = req.body;

		const newLike = await pool.query('UPDATE users SET likes = array_append(likes, $1) WHERE id = $2 RETURNING *', [postId, id]);

		return res.status(201).json({
			success: true,
			data: newLike.rows[0]
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// DELETE /api/v1/nottwitter/like/:id
exports.deleteLike = async (req, res, next) => {
	try {
		const { id } = req.body;

		const unlikedPost = await pool.query('UPDATE users SET likes = array_remove(likes, $1) WHERE id = $2 RETURNING *', [req.params.id, id]);

		return res.status(200).json({
			success: true,
			unlikedPost: unlikedPost.rows[0]
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};
