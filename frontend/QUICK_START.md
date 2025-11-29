# 🎯 Quick Start Guide - Personalizing Your Portfolio

## ⚡ 5-Minute Customization

### Step 1: Update Your Name & Info (2 minutes)

Open `src/app/app.ts` and change:

```typescript
// Line 42
protected readonly name = signal('Your Name');  // 👈 CHANGE THIS

// Line 44-46 (Optional stats)
protected readonly yearsOfExperience = signal(5);
protected readonly projectsCompleted = signal(30);
protected readonly technologiesUsed = signal(20);
```

### Step 2: Update Contact Links (1 minute)

Open `src/app/app.html` and search for these lines:

**Line ~65 (Hero social links):**
```html
<a href="https://github.com/YOURUSERNAME" target="_blank">
<a href="https://linkedin.com/in/YOURUSERNAME" target="_blank">
<a href="mailto:YOUR.EMAIL@example.com">
```

**Line ~277 (Contact section):**
```html
<a href="mailto:YOUR.EMAIL@example.com" class="contact-method glass-card">
  <!-- Update the email in method-value too -->
  <div class="method-value">YOUR.EMAIL@example.com</div>
```

### Step 3: Add Your Skills (2 minutes)

Open `src/app/app.ts` and find `skillCategories` (around line 52):

```typescript
skills: ['Angular', 'React', 'Vue.js', 'TypeScript', ...]  // 👈 EDIT THESE
```

**Replace with your actual skills!**

---

## 🚀 Next Steps (When You Have More Time)

### Add Your Real Projects

1. Find good project images on [Unsplash](https://unsplash.com)
2. Edit `projects` array in `src/app/app.ts` (line ~94)
3. Update:
   - `title`: Your project name
   - `description`: What it does
   - `image`: Image URL
   - `technologies`: Tech stack used
   - `liveUrl`: Live demo link (optional)
   - `githubUrl`: GitHub repo link (optional)

### Add Your Work Experience

Edit `experiences` array in `src/app/app.ts` (line ~157):

```typescript
{
  position: 'Your Job Title',
  company: 'Company Name',
  period: '2022 - Present',
  description: 'What you do...',
  achievements: [
    'Achievement 1',
    'Achievement 2'
  ]
}
```

---

## 🎨 Customization Ideas

### Change Colors

Edit `src/styles.css` (line ~24):

```css
--color-accent-primary: #3b82f6;    /* Main blue */
--color-accent-secondary: #8b5cf6;  /* Purple */
```

Popular color schemes:
- **Green Tech**: `#10b981` (primary), `#059669` (secondary)
- **Orange Energy**: `#f59e0b` (primary), `#d97706` (secondary)
- **Pink Creative**: `#ec4899` (primary), `#db2777` (secondary)

### Change Page Title

Edit `src/index.html` (line 5):

```html
<title>Your Name | Developer Portfolio</title>
```

---

## ✅ Checklist Before Going Live

- [ ] Updated your name
- [ ] Updated all contact links (GitHub, LinkedIn, Email)
- [ ] Added your real skills
- [ ] Added at least 3 real projects
- [ ] Added your work experience
- [ ] Changed page title
- [ ] Tested all links work
- [ ] Checked on mobile (resize browser)

---

## 🆘 Common Issues

**Q: Changes not showing up?**
- Make sure to save all files
- The dev server should auto-reload
- If not, stop (`Ctrl+C`) and restart (`ng serve`)

**Q: Broken layout?**
- Check browser console (F12) for errors
- Make sure you didn't accidentally delete HTML tags

**Q: Want to add more sections?**
- Copy an existing section structure
- Add your content
- Add corresponding CSS if needed

---

## 📱 Test Your Portfolio

1. **Desktop**: Open http://localhost:4200
2. **Mobile**: Resize browser window to ~375px width
3. **Tablet**: Resize to ~768px width

Check that everything looks good at all sizes!

---

**Need the full guide?** See `PORTFOLIO_CUSTOMIZATION.md`

**Ready to deploy?** Run `npm run build` to create production files
