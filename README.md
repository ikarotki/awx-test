# AWX Test Task

This project is a frontend test assignment built with **React 19**, **TypeScript**, **Vite**, and **SCSS Modules**, using a **mobile-first** responsive design approach.

---

## 🚀 Tech Stack

- React 19
- TypeScript
- Vite
- SCSS Modules (with custom breakpoints)
- `classnames` for conditional styling
- Jest + Testing Library for unit testing

---

---

## 🧪 Testing

Unit tests are written using **Jest** and **Testing Library**.

Run all tests:

```bash
yarn test
```

Tests are colocated next to source files (`*.test.ts[x]`).

---

## 🛠 Getting Started

Install dependencies:

```bash
yarn install
```

Run in development:

```bash
yarn dev
```

App will be available at: http://localhost:5173

Lint the code:

```bash
yarn lint
```

---

## 📌 Notes

- All inputs use `input type="number"` for native step/min/max support and mobile UX.
- Exchange calculation is debounced.
- All logic is covered with unit tests.
