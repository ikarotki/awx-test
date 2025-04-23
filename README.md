AWX Test Task

This is a frontend test assignment built with React 19, TypeScript, Vite, and SCSS Modules using a mobile-first responsive design approach.

🚀 Tech Stack

React 19

TypeScript

Vite

SCSS Modules (with custom breakpoints)

classnames (conditional styles)

Jest + Testing Library (unit & component testing)

🛠 Getting Started

Install dependencies:

yarn install

# or

npm install

Run the dev server:

yarn dev

App will be available at: http://localhost:5173

Run linter:

yarn lint

Run tests:

yarn test

✅ Features

Validated number inputs with min, max, step

Currency conversion with rounded precision

Debounced API simulation

Visual progress indicator based on value

Fully covered core logic with unit & integration tests

💪 Tests

Placed next to their source files

Written with Jest + @testing-library/react

Coverage includes:

utils/precision.ts

hooks/useExchangeDebounced.ts

components/CurrencyInputBlock

📌 Notes

Inputs now use native <input type="number"> for better accessibility and browser support
