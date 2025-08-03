<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Web Tools Project - Copilot Instructions

This is a full-stack web development project with:

- **Frontend**: Vite + React (located in `/src/`)
- **Backend**: PHP server (located in `/server/`)
- **Build**: Vite builds to `/dist/` directory
- **Static Assets**: Located in `/public/` directory

## Key Project Features:

- JSON Prettier tool with formatting, minifying, and validation
- Navigation system with multiple tools
- Full-screen responsive design
- Security-focused `.htaccess` configuration
- Automated dependency management with Dependabot

## Development Guidelines:

- Use modern React patterns with hooks
- Follow responsive design principles
- Maintain security best practices
- Keep components modular and reusable
- Use CSS modules or styled-components for styling

## Build Process:

- Vite automatically copies files from `/public/` to `/dist/` during build
- The `.htaccess` file in `/public/` provides security and performance optimizations
- Static assets are fingerprinted for cache-busting

## Dependency Management:

- Dependabot is configured for automatic dependency updates
- Minor/patch updates are auto-approved and auto-merged after CI passes
- Major updates require manual review
- Security audits run weekly and on pull requests
