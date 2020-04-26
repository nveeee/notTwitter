const pool = require('../db');

// GET api/v1/nottwitter/user
exports.getUser = async (req, res, next) => {
	// Get user will be passed Google ID to check for existing user
	try {
		const { googleId, id } = req.body;
		let user;
		if (googleId) {
			user = await pool.query('SELECT * FROM users WHERE googleid = $1 RETURNING *', [googleId]);
		} else {
			user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
		}

		return res.status(200).json({
			success: true,
			data: user.rows[0]
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// POST api/v1/nottwitter/user
exports.addUser = async (req, res, next) => {
	try {
		const { googleId, nickname, bio } = req.body;

		const newUser = await pool.query('INSERT INTO users (googleid, nickname, bio) VALUES ($1, $2, $3) RETURNING *', [googleId, nickname, bio]);

		return res.status(201).json({
			success: true,
			data: newUser.rows[0]
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// DELETE api/v1/nottwitter/user/:id
exports.deleteUser = async (req, res, next) => {
	try {
		await pool.query('DELETE FROM posts WHERE userid = $1', [req.params.id]);
		await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);

		return res.status(200).json({
			success: true,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};

// PUT api/v1/nottwitter/user/:id
exports.editUser = async (req, res, next) => {
	try {
		const { nickname, bio } = req.body;

		const editedUser = await pool.query('UPDATE users SET nickname = $1, bio = $2 WHERE id = $3 RETURNING *', [nickname, bio, req.params.id]);

		return res.status(200).json({
			success: true,
			editedUser: editedUser.rows[0]
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			error: 'Server Error'
		});
	}
};
