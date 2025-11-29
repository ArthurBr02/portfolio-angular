const express = require('express');
const router = express.Router();
const db = require('../database');
const multer = require('multer');
const path = require('path');

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

router.post('/projects', upload.single('image'), (req, res) => {
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

router.delete('/projects/:id', (req, res) => {
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

router.post('/education', (req, res) => {
    const { institution, degree, startDate, endDate, description } = req.body;
    db.run(`INSERT INTO education (institution, degree, startDate, endDate, description) VALUES (?, ?, ?, ?, ?)`,
        [institution, degree, startDate, endDate, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        }
    );
});

router.delete('/education/:id', (req, res) => {
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

router.post('/experience', (req, res) => {
    const { company, position, startDate, endDate, description } = req.body;
    db.run(`INSERT INTO experience (company, position, startDate, endDate, description) VALUES (?, ?, ?, ?, ?)`,
        [company, position, startDate, endDate, description],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID, ...req.body });
        }
    );
});

router.delete('/experience/:id', (req, res) => {
    db.run('DELETE FROM experience WHERE id = ?', req.params.id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Deleted', changes: this.changes });
    });
});

module.exports = router;
