# Portfolio Project

A modern, full-stack portfolio application built with Angular (frontend) and Express.js (backend).

## 🚀 Project Structure

```
portfolio-3-vue-express/
├── frontend/     # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/       # Models & interfaces
│   │   │   ├── services/   # Data services
│   │   │   ├── components/ # Reusable UI components
│   │   │   └── pages/      # Page components
│   │   └── styles.css      # Global styles
│   └── package.json
│
├── backend/                # Express.js server
│   └── package.json
│
└── .gitignore             # Git ignore rules
```

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

## 🛠️ Installation

### Frontend (Angular)

```bash
cd frontend
npm install
```

### Backend (Express)

```bash
cd backend
npm install
```

## 🏃 Running the Application

### Development Mode

**Frontend:**
```bash
cd frontend
npm start
# or
ng serve
```
The app will be available at `http://localhost:4200`

**Backend:**
```bash
cd backend
npm run dev
```
The API will be available at `http://localhost:3000` (or configured port)

## 🏗️ Building for Production

### Frontend

```bash
cd frontend
npm run build
```

Build artifacts will be in `frontend/dist/`

### Backend

```bash
cd backend
npm run build
```

## 📁 Frontend Architecture

### Component Structure
Each component follows Angular best practices:
- **TypeScript file** (`.ts`) - Component logic
- **HTML template** (`.html`) - Component markup
- **CSS file** (`.css`) - Component styles with `ViewEncapsulation.None`

### Key Directories

- **`core/models/`** - TypeScript interfaces and data models
- **`services/`** - Business logic and data management
- **`components/`** - Reusable UI components (navbar, hero, about, skills, projects, experience, contact, footer)
- **`pages/`** - Page-level components that compose smaller components

### Styling Architecture

- **Component CSS** - Component-specific styles in their respective `.css` files
- **Global CSS** (`styles.css`) - Shared utilities, variables, animations, and base styles
- **ViewEncapsulation.None** - Used to allow component styles to apply globally

## 🎨 Customization

See `frontend/QUICK_START.md` for a 5-minute customization guide.

See `frontend/PORTFOLIO_CUSTOMIZATION.md` for detailed customization instructions.

## 🔒 Security

- Environment variables are gitignored (`.env` files)
- Sensitive files are excluded via `.gitignore`
- HTML sanitization implemented for user-generated content

## 📝 Git Workflow

The project uses a comprehensive `.gitignore` that excludes:
- `node_modules/`
- Build outputs (`dist/`, `.angular/`)
- Environment files (`.env`)
- IDE-specific files
- OS-specific files
- Database files
- Logs and temporary files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👤 Author

Your Name - [your.email@example.com](mailto:your.email@example.com)

---

**Note**: Remember to update environment variables and configuration files before deploying to production.
