const bcrypt = require('bcryptjs');

const adminUser = {
    username: 'admin',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john.doe@example.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    profilePicture: null
};

const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
        imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
        technologies: 'Angular, Node.js, MongoDB, Stripe',
        link: 'https://example.com'
    },
    {
        title: 'Task Management App',
        description: 'Collaborative task management tool with real-time updates, team collaboration features, and analytics.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        technologies: 'React, Express, PostgreSQL, WebSockets',
        link: 'https://example.com'
    },
    {
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for social media metrics with data visualization and automated reporting.',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        technologies: 'Vue.js, Python, Django, Chart.js',
        link: 'https://example.com'
    },
    {
        title: 'Weather Forecast App',
        description: 'Real-time weather application with location-based forecasts, interactive maps, and weather alerts.',
        imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80',
        technologies: 'React Native, Firebase, OpenWeather API',
        link: 'https://github.com/yourusername/weather'
    },
    {
        title: 'Blog CMS',
        description: 'Content management system for blogs with markdown support, SEO optimization, and multi-user capabilities.',
        imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
        technologies: 'Next.js, GraphQL, PostgreSQL, AWS',
        link: 'https://example.com'
    },
    {
        title: 'Fitness Tracker',
        description: 'Mobile fitness tracking app with workout plans, progress tracking, and social features.',
        imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
        technologies: 'Flutter, Firebase, Node.js, MongoDB',
        link: 'https://example.com'
    }
];

const experience = [
    {
        company: 'Tech Innovations Inc.',
        position: 'Senior Full Stack Developer',
        startDate: '2022',
        endDate: 'Present',
        description: 'Leading development of enterprise web applications and mentoring junior developers. Architected and deployed microservices infrastructure serving 100K+ users. Reduced application load time by 60% through optimization.'
    },
    {
        company: 'Digital Solutions Ltd.',
        position: 'Full Stack Developer',
        startDate: '2020',
        endDate: '2022',
        description: 'Developed and maintained multiple client projects using modern web technologies. Built 15+ responsive web applications from scratch. Implemented CI/CD pipelines reducing deployment time by 40%.'
    },
    {
        company: 'StartUp Ventures',
        position: 'Junior Developer',
        startDate: '2019',
        endDate: '2020',
        description: 'Contributed to various web development projects and learned industry best practices. Developed RESTful APIs for mobile applications. Participated in code reviews and agile ceremonies.'
    }
];

const education = [
    {
        institution: 'University of Technology',
        degree: 'Master of Science in Computer Science',
        startDate: '2018',
        endDate: '2020',
        description: 'Specialized in Artificial Intelligence and Machine Learning. Graduated with Honors. Thesis on Neural Networks optimization.'
    },
    {
        institution: 'State University',
        degree: 'Bachelor of Science in Software Engineering',
        startDate: '2014',
        endDate: '2018',
        description: 'Core curriculum focused on software architecture, algorithms, and data structures. Dean\'s List for 6 consecutive semesters.'
    }
];

function seed(db) {
    setTimeout(() => {
        db.serialize(() => {
            // Clear existing data
            db.run('DELETE FROM projects');
            db.run('DELETE FROM experience');
            db.run('DELETE FROM education');
            db.run('DELETE FROM users');
            db.run('DELETE FROM sqlite_sequence WHERE name="projects" OR name="experience" OR name="education" OR name="users"');

            // Insert Projects
            const stmtProjects = db.prepare('INSERT INTO projects (title, description, imageUrl, link, technologies) VALUES (?, ?, ?, ?, ?)');
            projects.forEach(p => {
                stmtProjects.run(p.title, p.description, p.imageUrl, p.link, p.technologies);
            });
            stmtProjects.finalize();

            // Insert Experience
            const stmtExperience = db.prepare('INSERT INTO experience (company, position, startDate, endDate, description) VALUES (?, ?, ?, ?, ?)');
            experience.forEach(e => {
                stmtExperience.run(e.company, e.position, e.startDate, e.endDate, e.description);
            });
            stmtExperience.finalize();

            // Insert Education
            const stmtEducation = db.prepare('INSERT INTO education (institution, degree, startDate, endDate, description) VALUES (?, ?, ?, ?, ?)');
            education.forEach(e => {
                stmtEducation.run(e.institution, e.degree, e.startDate, e.endDate, e.description);
            });
            stmtEducation.finalize();

            // Insert Admin User
            bcrypt.hash(adminUser.password, 10, (err, hash) => {
                if (err) {
                    console.error('Error hashing password:', err);
                    db.close();
                    return;
                }
                db.run(`INSERT INTO users (
            username, password, firstName, lastName, age, email, 
            github, linkedin, twitter, instagram, profilePicture
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [
                        adminUser.username, hash, adminUser.firstName, adminUser.lastName,
                        adminUser.age, adminUser.email, adminUser.github, adminUser.linkedin,
                        adminUser.twitter, adminUser.instagram, adminUser.profilePicture
                    ], (err) => {
                        if (err) console.error('Error creating admin user:', err);
                        else console.log('Admin user created successfully');
                        db.close();
                    });
            });

            console.log('Database seeded successfully!');
        });
    }, 1000);
}
