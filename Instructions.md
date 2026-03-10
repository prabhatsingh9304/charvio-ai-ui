## 1. Project Overview

This project is built using **Next.js (App Router)** with **TypeScript (strict mode)**.

Primary goals:

* Server-first architecture
* Clear separation of concerns
* Strong typing and predictability
* AI-friendly, deterministic code generation

All generated or modified code **must strictly follow this document**.

---

## 2. Tech Stack

* Framework: **Next.js (App Router)**
* Language: **TypeScript**
* Styling: **Tailwind CSS**
* State Management: React Context / Zustand (only when required)
* Data Fetching: Server Components, Server Actions, Fetch, React Query (explicit)
* Validation: Zod
* Linting: ESLint + Prettier
* Testing (optional): Vitest / Playwright

---

## 3. Global Rules (NON-NEGOTIABLE)

* ❌ No `any`

* ❌ No implicit types

* ❌ No mixing UI and business logic

* ❌ No client components unless explicitly required

* ❌ No magic strings or numbers

* ❌ No side effects inside render functions

* ✅ Type safety everywhere

* ✅ Small, composable modules

* ✅ Explicit server/client boundaries

* ✅ Explicit data-fetching behavior

* ✅ Readability > cleverness

Violating any of these rules is considered a **failure**.

---

## 4. TypeScript Rules

### 4.1 Strict Typing

* Always define input and output types
* Prefer `type` over `interface` unless extending

```ts
type User = {
  id: string
  email: string
  createdAt: Date
}
```

---

### 4.2 Utility Types Over Duplication

```ts
type CreateUserInput = Pick<User, "email">
type UpdateUserInput = Partial<CreateUserInput>
```

---

## 5. Server vs Client Components (CRITICAL)

### 5.1 Defaults

* All components are **Server Components** by default
* Add `"use client"` only when:

  * Using React hooks (`useState`, `useEffect`, etc.)
  * Handling browser-only APIs
  * Managing client-side interactivity

---

### 5.2 Forbidden in Server Components

* `window`
* `document`
* `localStorage`
* `sessionStorage`
* `useEffect`
* `useState`

---

### 5.3 Client Component Rules

* Must be leaf components whenever possible
* Must not fetch sensitive data
* Must receive data via props or hooks
* Must not contain business logic

```ts
"use client"
```

---

## 6. Folder Structure (STRICT)

```
src/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── shared/
│   └── features/
│
├── lib/
│   ├── db/
│   ├── auth/
│   ├── fetcher.ts
│   └── utils.ts
│
├── hooks/
├── types/
├── constants/
├── styles/
└── config/
```

### Folder Responsibilities

* `components/` → UI only
* `lib/` → business logic, data access
* `hooks/` → reusable client hooks
* `types/` → shared domain types
* `constants/` → enums and config values
* `app/api/` → API route handlers only

---

## 7. Component Rules

### 7.1 Functional Components Only

```ts
type HeaderProps = {
  title: string
}

export function Header({ title }: HeaderProps) {
  return <h1>{title}</h1>
}
```

---

### 7.2 No Business Logic in JSX

```tsx
// ❌ Bad
{user && user.role === "admin" && <AdminPanel />}

// ✅ Good
const isAdmin = user?.role === "admin"
{isAdmin && <AdminPanel />}
```

---

## 8. Data Fetching Rules

### 8.1 Server-Side Fetching (Preferred)

* Fetch in server components or `lib/`
* Always specify caching behavior

```ts
export async function getUsers() {
  const res = await fetch("/api/users", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch users")
  }

  return res.json()
}
```

---

### 8.2 Client-Side Fetching (Only If Required)

* Use React Query or SWR
* Wrap logic inside custom hooks
* Never fetch directly in JSX

```ts
export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  })
}
```

---

## 9. API Route Rules (`app/api`)

### 9.1 Structure

```ts
export async function GET() {}
export async function POST() {}
```

* Validate all inputs
* Handle errors explicitly
* Never expose internal stack traces

---

### 9.2 Input Validation

* Use Zod for validation

```ts
const schema = z.object({
  email: z.string().email(),
})
```

---

## 10. Error Handling

* Never swallow errors
* Never return raw errors to clients
* Use typed, user-safe error messages

```ts
return Response.json(
  { error: "Unauthorized" },
  { status: 401 }
)
```

---

## 11. Constants & Configuration

* No inline environment variable access
* Centralize configuration

```ts
export const APP_NAME = "MyApp"
```

---

## 12. Styling Rules

* Tailwind CSS only
* No inline styles
* Avoid arbitrary values unless necessary
* Use Tailwind classes for layout and spacing
* Use Tailwind classes for colors and typography
* Use Tailwind classes for responsive design

```tsx
<div className="flex items-center gap-2" />
```

---

## 13. Performance Rules

* Prefer Server Components
* Avoid unnecessary re-renders
* Memoize only when measured
* No premature optimization

---

## 14. Naming Conventions

* Files: `kebab-case.ts`
* Components: `PascalCase`
* Functions: `camelCase`
* Constants: `SCREAMING_SNAKE_CASE`

---

## 15. AI Instructions (IMPORTANT)

When generating or modifying code:

1. Follow the folder structure
2. Respect server/client boundaries
3. Define types first
4. Keep functions small and focused
5. Prefer clarity over brevity
6. Do not refactor unrelated code
7. Ask for clarification if context is missing

---

## 16. Definition of Done

Code is considered complete only if:

* Fully type-safe
* Lint-clean
* Logically isolated
* Easy to review by a senior engineer
* Ready for production deployment

---

**End of Instructions**
