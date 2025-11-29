const express = require('express');
const router = express.Router();
const db = require('../database');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/auth');

// Multer Setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, process.env.UPLOAD_DIR || 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// --- PROJECTS ---
router.get('/projects', (req, res) => {
    db.all('SELECT * FROM projects', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.post('/projects', authenticateToken, upload.single('image'), (req, res) => {
    const { title, description, link, technologies } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    db.run(`INSERT INTO projects (title, description, imageUrl, link, technologies) VALUES (?, ?, ?, ?, ?)`,
        [title, description, imageUrl, link, technologies],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, title, description, imageUrl, link, technologies });
        }
    );
});

router.delete('/projects/:id', authenticateToken, (req, res) => {
    console.log('Deleting project with ID:', req.params.id);
    db.run('DELETE FROM projects WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted', changes: this.changes });
    });
});

// --- EDUCATION ---
router.get('/education', (req, res) => {
    db.all('SELECT * FROM education', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.post('/education', authenticateToken, (req, res) => {
    const { institution, degree, startDate, endDate, description } = req.body;
    db.run(`INSERT INTO education (institution, degree, startDate, endDate, description) VALUES (?, ?, ?, ?, ?)`,
        [institution, degree, startDate, endDate, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        }
    );
});

router.delete('/education/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM education WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted', changes: this.changes });
    });
});

// --- EXPERIENCE ---
router.get('/experience', (req, res) => {
    db.all('SELECT * FROM experience', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

router.post('/experience', authenticateToken, (req, res) => {
    const { company, position, startDate, endDate, description } = req.body;
    db.run(`INSERT INTO experience (company, position, startDate, endDate, description) VALUES (?, ?, ?, ?, ?)`,
        [company, position, startDate, endDate, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        }
    );
});

router.delete('/experience/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM experience WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted', changes: this.changes });
    });
});

// --- PROFILE ---
router.get('/profile', authenticateToken, (req, res) => {
    db.get('SELECT username, firstName, lastName, age, email, github, linkedin, twitter, instagram, profilePicture FROM users WHERE username = ?', [req.user.username], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

router.put('/profile', authenticateToken, upload.single('profilePicture'), (req, res) => {
    const { firstName, lastName, age, email, github, linkedin, twitter, instagram } = req.body;
    let profilePicture = req.body.profilePicture;
    if (req.file) {
        profilePicture = `/uploads/${req.file.filename}`;
    }

    db.run(`UPDATE users SET firstName = ?, lastName = ?, age = ?, email = ?, github = ?, linkedin = ?, twitter = ?, instagram = ?, profilePicture = COALESCE(?, profilePicture) WHERE username = ?`,
        [firstName, lastName, age, email, github, linkedin, twitter, instagram, profilePicture, req.user.username],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Profile updated', changes: this.changes, profilePicture });
        }
    );
});

// --- PUBLIC PROFILE ---
router.get('/user', (req, res) => {
    db.get('SELECT firstName, lastName, age, email, github, linkedin, twitter, instagram, profilePicture FROM users LIMIT 1', [], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

// --- SKILLS ---
router.get('/skill-categories', (req, res) => {
    db.all('SELECT * FROM skill_categories', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        // Parse skills JSON string back to array if needed, or handle in frontend
        // For simplicity, we'll send as is, but frontend expects array.
        // Let's parse it here to match the frontend model expectation if possible,
        // or just send rows and let frontend handle parsing.
        // Actually, storing as JSON string means we should parse it.
        const categories = rows.map(row => ({
            ...row,
            skills: row.skills ? JSON.parse(row.skills) : []
        }));
        res.json(categories);
    });
});

router.post('/skill-categories', authenticateToken, upload.single('iconImage'), (req, res) => {
    const { name, skills } = req.body;
    let icon = req.body.icon || '';

    // If an image was uploaded, use its path as the icon
    if (req.file) {
        icon = `/uploads/${req.file.filename}`;
    }

    // skills should be an array or comma-separated string, convert to JSON string for storage
    let skillsArray = skills;
    if (typeof skills === 'string') {
        skillsArray = skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    }
    const skillsString = JSON.stringify(skillsArray);

    db.run(`INSERT INTO skill_categories (name, icon, skills) VALUES (?, ?, ?)`,
        [name, icon, skillsString],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, name, icon, skills: skillsArray });
        }
    );
});

router.get('/skill-categories/:id/icon', (req, res) => {
    db.get('SELECT icon FROM skill_categories WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Category not found' });

        const iconPath = row.icon;

        // If it's an SVG string, send it as SVG
        if (iconPath && iconPath.startsWith('<svg')) {
            res.setHeader('Content-Type', 'image/svg+xml');
            return res.send(iconPath);
        }

        // If it's a file path, serve the file
        if (iconPath && iconPath.startsWith('/uploads/')) {
            const filePath = path.join(__dirname, '..', iconPath);
            return res.sendFile(filePath, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                    res.status(404).json({ error: 'Icon file not found' });
                }
            });
        }

        res.status(404).json({ error: 'No icon available' });
    });
});

router.delete('/skill-categories/:id', authenticateToken, (req, res) => {
    db.run('DELETE FROM skill_categories WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted', changes: this.changes });
    });
});

module.exports = router;
