# Contributing to ComfortCo

Thank you for contributing to ComfortCo! Please follow these guidelines to ensure code quality and consistency.

## Getting Started

1. **Clone and Install**

   ```bash
   bun install
   ```

2. **Create Environment File**

   ```bash
   cp .env.example .env.local
   ```

3. **Start Development Server**
   ```bash
   bun run dev
   ```

## Development Guidelines

### Code Style

- Use **ESLint** for code linting
- Use **Prettier** for code formatting
- Follow the existing code style and patterns

### Run Linter & Formatter

```bash
# Check for linting errors
bun run lint

# Format code automatically
bun run format
```

### TypeScript

- Always use TypeScript for new files
- Strict mode is enabled (`strict: true`)
- Define types in `src/types/index.ts` for shared types
- Use interfaces for object types, types for unions/primitives

### Component Structure

**Functional Components:**

```tsx
import { type ReactNode } from "react";

interface MyComponentProps {
  children: ReactNode;
  title: string;
}

export function MyComponent({ children, title }: MyComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
```

**Naming Conventions:**

- Components: `PascalCase` (e.g., `ProductCard.tsx`)
- Utilities/Hooks: `camelCase` (e.g., `useCart.ts`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `API_ENDPOINTS`)
- Types: `PascalCase` (e.g., `Product`, `CartItem`)

### Folder Organization

- **`src/components/ui/`** - Reusable UI components (shadcn)
- **`src/components/features/`** - Feature-specific components
- **`src/components/layout/`** - Layout components
- **`src/api/`** - API service functions
- **`src/constants/`** - App constants
- **`src/types/`** - Type definitions
- **`src/utils/`** - Utility functions
- **`src/hooks/`** - Custom React hooks

### Naming Files

- Components: `ComponentName.tsx`
- Hooks: `useHookName.ts`
- Utils: `featureName.ts`
- Tests: `fileName.test.ts`
- Styles: `fileName.css` or inline with Tailwind

## Commit Messages

Use clear, descriptive commit messages:

```
feat: Add product filtering functionality
fix: Correct cart total calculation
docs: Update README with API endpoints
style: Format components with Prettier
refactor: Reorganize folder structure
test: Add tests for cart context
```

## Pull Request Process

1. **Create a feature branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Keep commits atomic and focused
   - Write clear commit messages

3. **Run checks before pushing**

   ```bash
   bun run lint
   bun run format
   ```

4. **Push to your branch**

   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Describe what changes you made
   - Reference any related issues
   - Include screenshots for UI changes

## Code Review

- Be open to feedback
- Keep discussions professional
- Ask questions if something is unclear
- Approve once you're satisfied with the changes

## Testing

- Write tests for new features and bug fixes
- Use React Testing Library for component tests
- Aim for meaningful test coverage

```bash
# Run tests
bun run test

# Watch mode
bun run test:watch
```

## Performance

- Use `React.memo` for components that re-render frequently
- Implement code splitting for route components
- Keep bundle size in mind when adding dependencies
- Use TanStack Query for server state management

## Accessibility

- Use semantic HTML (`<button>`, `<nav>`, etc.)
- Ensure proper ARIA labels
- Test with keyboard navigation
- Maintain color contrast ratios

## Common Patterns

### Adding a New Feature

1. Create types in `src/types/index.ts`
2. Create API service in `src/api/feature.ts`
3. Create component in `src/components/features/Feature.tsx`
4. Add route in `src/routes/feature.tsx`
5. Add constants in `src/constants/index.ts` if needed

### Using TanStack Query

```tsx
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products";

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* render products */}</div>;
}
```

### Using React Hook Form

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <textarea {...register("message")} />
      {errors.message && <span>{errors.message.message}</span>}
      <button type="submit">Send</button>
    </form>
  );
}
```

## Questions?

Feel free to open an issue or reach out to the team for clarification.

Happy coding! 🚀
