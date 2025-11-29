# 🚀 Professional IT Developer Portfolio

A stunning, modern portfolio built with Angular 20, featuring a dark theme with vibrant accents, smooth animations, and responsive design.

## ✨ Features

- **Modern Design**: Dark theme with vibrant gradients and glassmorphism effects
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: Engaging micro-animations and transitions
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Fast loading with optimized assets
- **Sections**:
  - Hero with animated code window
  - About Me with statistics
  - Skills & Technologies
  - Featured Projects
  - Professional Experience timeline
  - Contact information
  - Responsive navigation

## 🎨 Customization Guide

### 1. Personal Information

Edit `src/app/app.ts` and update the following:

```typescript
// Line 42-46: Update your personal details
protected readonly name = signal('Your Name');  // Change to your name
protected readonly yearsOfExperience = signal(5);  // Your years of experience
protected readonly projectsCompleted = signal(30);  // Number of projects
protected readonly technologiesUsed = signal(20);  // Number of technologies
```

### 2. Skills & Technologies

Edit the `skillCategories` signal in `src/app/app.ts` (starting around line 52):

```typescript
protected readonly skillCategories = signal<SkillCategory[]>([
  {
    name: 'Frontend Development',
    icon: `...`,  // Keep the SVG icon or replace with your own
    skills: ['Angular', 'React', 'Vue.js', ...]  // Update with your skills
  },
  // Add or remove categories as needed
]);
```

### 3. Projects

Update the `projects` signal in `src/app/app.ts` (starting around line 94):

```typescript
protected readonly projects = signal<Project[]>([
  {
    id: 1,
    title: 'Your Project Name',
    description: 'Project description...',
    image: 'https://your-image-url.com/image.jpg',  // Use Unsplash or your own images
    technologies: ['Tech1', 'Tech2', 'Tech3'],
    liveUrl: 'https://your-live-demo.com',  // Optional
    githubUrl: 'https://github.com/yourusername/repo'  // Optional
  },
  // Add more projects...
]);
```

**Image Sources**:
- Use [Unsplash](https://unsplash.com) for free high-quality images
- Or upload your own project screenshots

### 4. Professional Experience

Update the `experiences` signal in `src/app/app.ts` (starting around line 157):

```typescript
protected readonly experiences = signal<Experience[]>([
  {
    id: 1,
    position: 'Your Job Title',
    company: 'Company Name',
    period: '2022 - Present',
    description: 'Brief description of your role...',
    achievements: [
      'Achievement 1',
      'Achievement 2',
      // Add more achievements
    ]
  },
  // Add more experiences...
]);
```

### 5. Contact Information

Edit `src/app/app.html` and update the contact links:

**Social Links in Hero Section** (around line 65):
```html
<a href="https://github.com/yourusername" target="_blank">GitHub</a>
<a href="https://linkedin.com/in/yourusername" target="_blank">LinkedIn</a>
<a href="mailto:your.email@example.com">Email</a>
```

**Contact Section** (around line 277):
```html
<a href="mailto:your.email@example.com" class="contact-method glass-card">
  <!-- Update email -->
</a>
<a href="https://linkedin.com/in/yourusername" target="_blank">
  <!-- Update LinkedIn -->
</a>
<a href="https://github.com/yourusername" target="_blank">
  <!-- Update GitHub -->
</a>
```

### 6. Color Scheme

To change colors, edit `src/styles.css` (starting at line 24):

```css
:root {
  /* Accent Colors - Customize these */
  --color-accent-primary: #3b82f6;    /* Blue */
  --color-accent-secondary: #8b5cf6;  /* Purple */
  --color-accent-tertiary: #06b6d4;   /* Cyan */
  
  /* Gradients - Customize these */
  --gradient-primary: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  --gradient-secondary: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
}
```

### 7. Page Title & Meta Tags

Edit `src/index.html`:

```html
<title>Your Name | Developer Portfolio</title>
<meta name="description" content="Your custom description...">
<meta name="keywords" content="your, keywords, here">
```

## 🚀 Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd frontend/portfolio

# Install dependencies
npm install

# Start development server
npm start
# or
ng serve
```

The application will be available at `http://localhost:4200`

### Build for Production

```bash
# Build the project
npm run build

# The build artifacts will be in the dist/ directory
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🎯 Tips for Best Results

1. **Images**: Use high-quality images (at least 800px wide) for projects
2. **Descriptions**: Keep project descriptions concise (2-3 sentences)
3. **Skills**: Group skills logically by category
4. **Experience**: List most recent experience first
5. **Contact**: Make sure all links are working and up-to-date

## 🌟 Advanced Customization

### Adding New Sections

1. Add HTML in `src/app/app.html`
2. Add corresponding styles in `src/app/app.css`
3. Add data/logic in `src/app/app.ts` if needed

### Changing Fonts

The portfolio uses:
- **Inter**: Main font
- **JetBrains Mono**: Code/monospace font

To change fonts, update the Google Fonts import in `src/index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Then update CSS variables in `src/styles.css`:

```css
--font-family-base: 'YourFont', sans-serif;
```

## 📄 License

This portfolio template is free to use for personal and commercial projects.

## 🤝 Support

If you need help customizing your portfolio:
1. Check the code comments
2. Review the customization guide above
3. Experiment with the live preview

---

**Built with ❤️ using Angular 20**
