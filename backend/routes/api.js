const express = require('express');
const router = express.Router();
const db = require('../database');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/auth');

// Multer Setup
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
// Use absolute path if UPLOAD_DIR is absolute, otherwise resolve relative to project root
const uploadPath = path.isAbsolute(uploadDir) ? uploadDir : path.join(__dirname, '..', uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
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
    db.get('SELECT username, firstName, lastName, age, email, github, linkedin, twitter, instagram, profilePicture, availableForWork FROM users WHERE username = ?', [req.user.username], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

router.put('/profile', authenticateToken, upload.single('profilePicture'), (req, res) => {
    const { firstName, lastName, age, email, github, linkedin, twitter, instagram, availableForWork } = req.body;
    let profilePicture = req.body.profilePicture;
    if (req.file) {
        profilePicture = `/uploads/${req.file.filename}`;
    }

    db.run(`UPDATE users SET firstName = ?, lastName = ?, age = ?, email = ?, github = ?, linkedin = ?, twitter = ?, instagram = ?, availableForWork = ?, profilePicture = COALESCE(?, profilePicture) WHERE username = ?`,
        [firstName, lastName, age, email, github, linkedin, twitter, instagram, availableForWork ? 1 : 0, profilePicture, req.user.username],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Profile updated', changes: this.changes, profilePicture });
        }
    );
});

// --- PUBLIC PROFILE ---
router.get('/user', (req, res) => {
    db.get('SELECT firstName, lastName, age, email, github, linkedin, twitter, instagram, profilePicture, availableForWork FROM users LIMIT 1', [], (err, row) => {
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
            // Use the absolute uploadPath instead of relative path
            const fileName = path.basename(iconPath);
            const filePath = path.join(uploadPath, fileName);
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

// --- CONTACT FORM ---
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check minimum lengths
    if (name.length < 2) {
        return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    if (message.length < 10) {
        return res.status(400).json({ error: 'Message must be at least 10 characters' });
    }

    try {
        const { sendContactEmail } = require('../mailer');
        await sendContactEmail({ name, email, message });
        res.json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
});

// --- TRANSLATIONS ---
const fs = require('fs').promises;

// Get translations for a specific language
router.get('/translations/:lang', authenticateToken, async (req, res) => {
    const { lang } = req.params;
    
    if (!['en', 'fr'].includes(lang)) {
        return res.status(400).json({ error: 'Invalid language. Must be "en" or "fr"' });
    }

    try {
        const filePath = path.join(__dirname, '../../frontend/src/app/i18n', `${lang}.ts`);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Extract the translation object from the TypeScript file
        // This is a simple approach - for production, consider using a proper parser
        const match = content.match(/export const \w+: TranslationData = ({[\s\S]*});/);
        if (!match) {
            return res.status(500).json({ error: 'Could not parse translation file' });
        }
        
        // Use eval in a safe context (only for admin use)
        const translations = eval(`(${match[1]})`);
        res.json({ lang, translations });
    } catch (error) {
        console.error('Error reading translation file:', error);
        res.status(500).json({ error: 'Failed to read translation file' });
    }
});

// Update translations for a specific language
router.put('/translations/:lang', authenticateToken, async (req, res) => {
    const { lang } = req.params;
    const { translations } = req.body;
    
    if (!['en', 'fr'].includes(lang)) {
        return res.status(400).json({ error: 'Invalid language. Must be "en" or "fr"' });
    }

    if (!translations || typeof translations !== 'object') {
        return res.status(400).json({ error: 'Invalid translations data' });
    }

    try {
        const filePath = path.join(__dirname, '../../frontend/src/app/i18n', `${lang}.ts`);
        
        // Convert the translations object to a formatted TypeScript file
        const formattedContent = formatTranslationFile(lang, translations);
        
        // Write the updated file
        await fs.writeFile(filePath, formattedContent, 'utf-8');
        
        res.json({ success: true, message: 'Translations updated successfully' });
    } catch (error) {
        console.error('Error writing translation file:', error);
        res.status(500).json({ error: 'Failed to update translation file' });
    }
});

// Helper function to format translation object as TypeScript file
function formatTranslationFile(lang, translations) {
    const varName = lang === 'en' ? 'en' : 'fr';
    
    // Function to recursively format the translation object with proper indentation
    function formatObject(obj, indent = 1) {
        const spaces = '    '.repeat(indent);
        const entries = Object.entries(obj).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                return `${spaces}${key}: {\n${formatObject(value, indent + 1)}${spaces}}`;
            } else {
                // Escape single quotes and backslashes in strings
                const escapedValue = String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
                return `${spaces}${key}: '${escapedValue}'`;
            }
        });
        return entries.join(',\n') + '\n';
    }
    
    return `import { TranslationData } from '../services/translation.service';

export const ${varName}: TranslationData = {
${formatObject(translations)}};
`;
}

module.exports = router;
