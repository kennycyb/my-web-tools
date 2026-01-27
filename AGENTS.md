# Agent Instructions for my-web-tools Repository

This document provides comprehensive information about the repository structure, purpose, and development guidelines for AI coding assistants.

## Project Overview

**my-web-tools** is a modern web application providing a collection of useful developer utilities and tools built with React and Vite. The project focuses on providing clean, fast, and user-friendly web-based tools for common development tasks.

### Key Features
- **JSON Prettier**: Format, minify, and validate JSON data
- **QR Code Generator**: Create QR codes from text or URLs
- **Calculator**: Basic calculator functionality
- **Timestamp Converter**: Convert between timestamps and human-readable dates
- **Base64 Tool**: Encode and decode Base64 strings
- **IP Info**: Display IP address information
- **Chinese Calendar**: Chinese calendar conversion tool

## Repository Structure

```
/home/runner/work/my-web-tools/my-web-tools/
├── .github/
│   ├── copilot-instructions.md    # Workspace-specific Copilot instructions
│   ├── dependabot.yml             # Automated dependency updates configuration
│   └── workflows/
│       ├── ci.yml                 # Main CI/CD pipeline
│       ├── dependabot-auto-approve.yml
│       └── security.yml           # Security scanning workflow
├── public/
│   ├── .htaccess                  # Security and caching configuration for Apache
│   └── vite.svg                   # Favicon
├── src/
│   ├── assets/                    # Static assets (images, fonts, etc.)
│   ├── components/
│   │   ├── Navigation.jsx         # Main navigation component
│   │   └── Navigation.css
│   ├── pages/
│   │   ├── Home.jsx               # Home page
│   │   ├── Home.css
│   │   └── tools/                 # Individual tool pages
│   │       ├── JsonPrettier.jsx
│   │       ├── QRCodeGenerator.jsx
│   │       ├── Calculator.jsx
│   │       ├── TimestampConverter.jsx
│   │       ├── Base64Tool.jsx
│   │       ├── IPInfo.jsx
│   │       └── ChineseCalendar.jsx
│   ├── App.jsx                    # Main application component
│   ├── App.css
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── vite.config.js                 # Vite build configuration
├── eslint.config.js               # ESLint configuration
├── package.json                   # Project dependencies and scripts
└── README.md                      # Project documentation
```

## Technology Stack

### Frontend
- **Framework**: React 19.2.3
- **Build Tool**: Vite 7.3.1
- **Routing**: Client-side navigation via state management (no React Router currently)
- **UI Libraries**: 
  - qrcode.react for QR code generation
- **Styling**: Plain CSS with component-specific stylesheets

### Development Tools
- **Linter**: ESLint 9.39.2 with React-specific plugins
- **Node Version**: 18.x (specified in CI/CD)
- **Package Manager**: npm

### Build & Deployment
- **Output Directory**: `/dist/`
- **Public Directory**: `/public/` (copied to dist during build)
- **Server**: Apache (with .htaccess configuration)

## Development Guidelines

### Code Style
- Use modern React patterns with hooks (functional components)
- Follow responsive design principles
- Maintain security best practices
- Keep components modular and reusable
- Use descriptive variable and function names
- Follow ESLint rules configured in `eslint.config.js`

### Component Structure
- Each tool is a separate page component in `src/pages/tools/`
- Each component has its own CSS file for styling
- Navigation is handled through the `Navigation` component
- App.jsx uses a switch statement to render the current tool

### File Organization
- Place tool components in `src/pages/tools/`
- Place reusable components in `src/components/`
- Place static assets in `public/` for direct access
- Place imported assets in `src/assets/` for processed bundling

## Development Commands

```bash
# Install dependencies
npm ci

# Start development server (with HMR)
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## Build Process

The project uses Vite for fast builds and hot module replacement:

1. **Development**: Runs on `http://localhost:5173` (default Vite port)
2. **Build**: 
   - Compiles React components
   - Bundles JavaScript and CSS
   - Optimizes assets with hashing for cache-busting
   - Copies public directory (including `.htaccess`) to `dist/`
   - Preserves `.htaccess` filename (special configuration in vite.config.js)
3. **Output**: All files are generated in the `dist/` directory

### Special Build Configurations
- `.htaccess` file is preserved with its original name (no hash)
- Asset filenames include content hashes for cache invalidation
- Public directory files are copied to dist root

## CI/CD Pipeline

### Workflows
1. **CI/CD Pipeline** (`ci.yml`):
   - Triggers on push to `main`/`develop` branches and PRs to `main`
   - Runs linting with `npm run lint`
   - Builds the application
   - Uploads build artifacts
   - Auto-merges passing Dependabot PRs

2. **Security Scanning** (`security.yml`):
   - Runs security audits
   - Scans for vulnerabilities in dependencies

### Automated Dependency Management
- **Dependabot** configured for weekly updates on Mondays at 9:00 UTC
- Groups related dependencies (React, Vite, ESLint ecosystems)
- Auto-approval and auto-merge for minor/patch updates after CI passes
- Manual review required for major version updates
- Ignores major React updates by default

## Security Considerations

### .htaccess Configuration
The `.htaccess` file in the `public/` directory provides:
- Protection against access to sensitive files (.git, .env, config files)
- Blocking of backup and temporary files
- Denial of access to package.json and dependency files
- Security headers (X-Frame-Options, CSP, etc.)
- Disabled directory browsing
- Caching strategy for static assets
- Gzip compression

### Best Practices
- Never commit sensitive data (secrets, API keys)
- Use security headers for XSS and clickjacking protection
- Keep dependencies updated via Dependabot
- Run security audits regularly

## Adding New Tools

To add a new tool to the application:

1. Create a new component in `src/pages/tools/`:
   ```jsx
   // src/pages/tools/NewTool.jsx
   import './NewTool.css'
   
   function NewTool() {
     return (
       <div className="new-tool">
         {/* Tool content */}
       </div>
     )
   }
   
   export default NewTool
   ```

2. Create the corresponding CSS file:
   ```css
   /* src/pages/tools/NewTool.css */
   .new-tool {
     /* Styles */
   }
   ```

3. Import and add to `App.jsx`:
   ```jsx
   import NewTool from './pages/tools/NewTool'
   
   // Add case to switch statement
   case 'new-tool':
     return <NewTool />
   ```

4. Update the Navigation component to include the new tool

## Testing

Currently, the project does not have a test suite configured. When adding tests:
- Use a testing framework compatible with Vite (e.g., Vitest)
- Follow React Testing Library patterns
- Add test scripts to `package.json`
- Update CI/CD pipeline to run tests

## Common Tasks

### Modifying Existing Tools
- Tool logic is in `src/pages/tools/[ToolName].jsx`
- Tool styles are in `src/pages/tools/[ToolName].css`
- Test changes with `npm run dev`

### Styling Changes
- Global styles: `src/index.css`
- App-level styles: `src/App.css`
- Component-specific: Component's CSS file

### Navigation Updates
- Modify `src/components/Navigation.jsx`
- Update tool list and routing

### Build Configuration Changes
- Vite config: `vite.config.js`
- ESLint config: `eslint.config.js`
- Package dependencies: `package.json`

## Environment Limitations

### What Works
- Client-side only application (no backend required for core functionality)
- Static asset serving
- Apache server with .htaccess support

### What's Not Included
- No database
- No server-side APIs (API proxy configured but no server implementation exists)
- No authentication/authorization
- No unit tests (yet)

## Dependencies to Watch

### Critical Dependencies
- `react` and `react-dom`: Core framework
- `vite`: Build tool and dev server
- `@vitejs/plugin-react`: React support for Vite

### Development Dependencies
- `eslint` and related plugins: Code quality
- `@types/react`: TypeScript definitions (if TypeScript is added)

### Optional Dependencies
- `qrcode.react`: QR code generation

## Notes for AI Agents

1. **Always run linting** before committing: `npm run lint`
2. **Build locally** to verify changes: `npm run build`
3. **Preserve .htaccess** security rules when modifying public directory
4. **Check CI/CD status** after pushing changes
5. **Follow existing patterns** when adding new tools
6. **Use functional components** with hooks (no class components)
7. **Keep styling scoped** to individual components
8. **Verify responsive design** for all changes
9. **Consider performance** when adding new features or dependencies
10. **Check for security vulnerabilities** in new dependencies before adding

## Troubleshooting

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

### Linting Errors
- Check `eslint.config.js` for custom rules
- Use `npm run lint` to see all errors
- Some errors may be auto-fixable with `npx eslint --fix .`

### Development Server Issues
- Ensure port 5173 is available
- Check for process already running on that port
- Verify Node.js version matches CI requirement (v18)

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [ESLint Documentation](https://eslint.org/)
- [MDN Web Docs](https://developer.mozilla.org/) for web standards

## Project Maintenance

- **Owner**: kennycyb
- **Update Frequency**: Weekly dependency updates via Dependabot
- **Review Process**: All changes go through PR review
- **CI/CD**: Automated linting and building on all PRs
