## 1. Core Philosophy

- Write **production-quality code**
- Optimize for **clarity, correctness, and maintainability**
- Prefer **explicit > implicit**
- Assume this code will be read and maintained by others

---

## 2. Non-Negotiable Rules

- ❌ No weak typing (`any`, implicit types)
- ❌ No mixing responsibilities in a single file
- ❌ No business logic inside UI/render blocks
- ❌ No hidden side effects
- ❌ No unnecessary abstractions

- ✅ Strong typing
- ✅ Clear separation of concerns
- ✅ Explicit inputs, outputs, and behavior

---

## 3. Structure & Organization

- One **primary responsibility per file**
- Keep files **small and focused**
- Group code by **feature/domain**, not by technical type
- Avoid deep or unclear nesting

---

## 4. Functions & Components

- Functions must do **one thing**
- Extract logic out of render/return blocks
- Prefer pure functions where possible
- Avoid inline complex conditions

---

## 5. Data & Side Effects

- Be explicit about side effects
- Handle errors intentionally
- Never swallow errors silently
- Fail fast on invalid assumptions

---

## 6. Naming

- Names must be **descriptive and unambiguous**
- Avoid abbreviations unless universally understood
- Be consistent across the codebase

---

## 7. AI Behavior Rules

When generating or modifying code:

1. Read existing code first
2. Follow established patterns
3. Modify only what is necessary
4. Do not refactor unrelated code
5. Ask for clarification if context is missing

---

## 8. Definition of Done

Code is done only if:

- It compiles / runs
- It is readable without explanation
- It follows this instruction file
- A senior engineer would approve it

---

**End of Instructions**
