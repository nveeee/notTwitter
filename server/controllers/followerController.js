const pool = require('../db');

// GET api/v1/nottwitter/followers
exports.getFollowers = async (req, res, next) => {
	try {
		// const { id } = req.body;

		// const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

		// if (user.rows[0].followers) {
		// 	const followerIds = user.rows[0].followers.join(',');

		// 	const followers = await pool.query(`SELECT * FROM users WHERE id IN (${followerIds})`);

		// 	return res.status(200).json({
		// 		success: true,
		// 		data: followers.rows
		// 	});
		// }

		const { followerIds } = req.query;

		const followers = await pool.query(`SELECT * FROM users WHERE id IN (${followerIds.join(',')})`);

		return res.status(200).json({
			success: true,
			data: followers.rows
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// GET api/v1/nottwitter/follower
exports.getFollower = async (req, res, next) => {
	try {
		const { id } = req.body;

		const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

		return res.status(200).json({
			success: true,
			data: user.rows[0]
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// POST api/v1/nottwitter/follower
exports.addFollower = async (req, res, next) => {
	try {
		const { id, followerId } = req.body;

		const newFollower = await pool.query('UPDATE users SET followers = array_append(followers, $1) WHERE id = $2 RETURNING *', [followerId, id]);

		return res.status(201).json({
			success: true,
			data: newFollower.rows[0]
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// DELETE api/v1/nottwitter/follower/:id
exports.deleteFollower = async (req, res, next) => {
	try {
		const { id } = req.body;

		const unfollowedUser = await pool.query('UPDATE users SET followers = array_remove(followers, $1) WHERE id = $2 RETURNING *', [req.params.id, id]);

		return res.status(200).json({
			success: true,
			unfollowedUser: unfollowedUser.rows[0]
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};
