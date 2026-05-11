```markdown
# tileflowuk-website Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill documents the development patterns and conventions used in the `tileflowuk-website` repository, a TypeScript-based codebase without a detected framework. It covers file naming, import/export styles, commit message patterns, and testing conventions. This guide is intended to help contributors maintain consistency and quality in the project.

## Coding Conventions

### File Naming
- **Style:** kebab-case
- **Example:**  
  - `user-profile.ts`
  - `order-summary.test.ts`

### Import Style
- **Style:** Absolute imports  
  - Avoids relative paths like `../components`
- **Example:**
  ```typescript
  import { UserProfile } from 'components/user-profile';
  ```

### Export Style
- **Style:** Mixed (both default and named exports are used)
- **Example:**
  ```typescript
  // Named export
  export function calculateTotal() { ... }

  // Default export
  export default App;
  ```

### Commit Messages
- **Pattern:** Freeform, no enforced prefixes
- **Average Length:** ~61 characters
- **Example:**
  ```
  Add responsive layout to homepage
  ```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new functionality  
**Command:** `/add-feature`

1. Create a new TypeScript file using kebab-case naming.
2. Use absolute imports for dependencies.
3. Export your functions or components using named or default exports as appropriate.
4. Write corresponding test files with the `.test.ts` suffix.
5. Commit changes with a clear, concise message.

### Fixing a Bug
**Trigger:** When resolving a reported issue  
**Command:** `/fix-bug`

1. Locate the relevant file(s), following kebab-case naming.
2. Apply the fix, maintaining import/export conventions.
3. Update or add test cases in a `.test.ts` file.
4. Commit with a descriptive message explaining the fix.

### Writing Tests
**Trigger:** When adding or updating tests  
**Command:** `/write-test`

1. Create or update a test file matching the pattern `*.test.ts`.
2. Place tests alongside or near the code they cover.
3. Use the project's preferred testing framework (not specified; check existing tests for patterns).
4. Commit with a message describing the test coverage.

## Testing Patterns

- **File Pattern:** Test files are named with the `.test.ts` suffix (e.g., `user-profile.test.ts`).
- **Framework:** Not explicitly detected; review existing test files for framework usage.
- **Placement:** Tests are typically placed near the code they test.
- **Example:**
  ```typescript
  // user-profile.test.ts
  import { getUserProfile } from 'utils/user-profile';

  test('returns correct user data', () => {
    expect(getUserProfile(1)).toEqual({ id: 1, name: 'Alice' });
  });
  ```

## Commands
| Command       | Purpose                                 |
|---------------|-----------------------------------------|
| /add-feature  | Start the workflow for adding a feature |
| /fix-bug      | Begin the bugfix workflow               |
| /write-test   | Guide for writing/updating tests        |
```
