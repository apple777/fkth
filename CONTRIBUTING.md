# Contributing to Between Kook and Havazelet

Thank you for your interest in contributing to this historical archive project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment
- Respect historical accuracy and cultural sensitivity

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/apple777/fkth/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (browser, OS, etc.)

### Suggesting Features

1. Open an issue with the `enhancement` label
2. Describe the feature and its benefits
3. Provide use cases and examples
4. Be open to discussion and feedback

### Submitting Code

#### Setup Development Environment

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/fkth.git
cd fkth

# Install dependencies
npm install

# Copy environment variables
cp env.example .env
# Edit .env with your local configuration

# Run development server
npm run dev
```

#### Making Changes

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Add comments for complex logic
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

   Use conventional commit messages:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

5. **Push and create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Then create a PR on GitHub with:
   - Clear description of changes
   - Link to related issues
   - Screenshots for UI changes
   - Test results

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules (run `npm run lint`)
- Use meaningful variable and function names
- Keep functions small and focused
- Add JSDoc comments for public APIs

### Component Guidelines

```typescript
// Good example
interface Props {
  title: string;
  locale: 'he' | 'en';
  onSelect?: (id: string) => void;
}

export default function MyComponent({ title, locale, onSelect }: Props) {
  // Implementation
}
```

### API Routes

- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return consistent JSON responses
- Include error handling
- Validate input with Zod schemas
- Add authentication checks for admin routes

```typescript
// API Response Format
{
  success: boolean,
  data?: any,
  error?: string
}
```

### Styling

- Use CSS-in-JS with styled-jsx
- Follow mobile-first approach
- Support both LTR and RTL layouts
- Use CSS variables for theming
- Ensure accessibility (ARIA labels, semantic HTML)

### Database

- Use Zod schemas for validation
- Don't expose MongoDB ObjectIDs in URLs
- Use custom IDs for public-facing identifiers
- Index frequently queried fields

### Testing

While we don't currently have automated tests, please manually test:

- [ ] Both language versions (he/en)
- [ ] Mobile and desktop views
- [ ] All CRUD operations
- [ ] Authentication flows
- [ ] Error states
- [ ] Loading states

## Content Guidelines

### Historical Accuracy

- Verify facts and dates
- Cite sources when possible
- Be culturally sensitive
- Use appropriate historical context

### Media Assets

- Optimize images before uploading
- Use appropriate file formats (WebP, JPEG)
- Include alt text for accessibility
- Respect copyright and licensing

### Multilingual Content

- Provide both Hebrew and English translations
- Ensure RTL layout works correctly for Hebrew
- Use proper Unicode and character encoding
- Test with actual content in both languages

## Review Process

1. **Automated Checks**
   - Linting passes
   - Build succeeds
   - No TypeScript errors

2. **Code Review**
   - Code quality and style
   - Performance considerations
   - Security implications
   - Documentation completeness

3. **Testing**
   - Manual testing by reviewers
   - Cross-browser compatibility
   - Mobile responsiveness

4. **Merge**
   - Approved by maintainer
   - All checks pass
   - Conflicts resolved

## Project Structure

```
src/
├── app/              # Next.js App Router
│   ├── (admin)/      # Protected admin routes
│   ├── (public)/     # Public routes
│   ├── api/          # API endpoints
│   └── middleware.ts # Auth & security
├── components/       # React components
├── lib/             # Utilities and services
│   ├── auth/        # Authentication logic
│   ├── services/    # External services (DB, etc.)
│   └── schemas/     # Zod validation schemas
└── styles/          # Global styles
```

## Getting Help

- **Documentation**: Check README.md and DEPLOYMENT.md
- **Issues**: Search existing issues or create new one
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact maintainers through GitHub

## Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Acknowledged in the project history

## License

By contributing, you agree that your contributions will be licensed under the same ISC License that covers this project.

---

Thank you for helping preserve and share Jerusalem's history! 🙏

