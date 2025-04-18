AWX Test Task

This project is a frontend test assignment built with React 19, TypeScript, Vite, and SCSS Modules using a mobile-first responsive design approach.

🚀 Tech Stack

React
TypeScript
Vite
SCSS Modules (with custom breakpoints)
classnames for conditional styles

📦 Project Structure

src/
  assets/
    styles/               → Global SCSS variables, fonts, media helpers
      _constants.scss
      _fonts.scss
      _media.scss
      Main.scss

  components/            → Reusable UI components
    AmountBlock/         → Custom input using contentEditable
      AmountBlock.tsx
      AmountBlock.module.scss

    Card/                → Layout wrapper block
      Card.tsx
      Card.module.scss

    CurrencyInputBlock/  → Composite input + progress block
      CurrencyInputBlock.tsx
      CurrencyInputBlock.module.scss

    ProgressBar/         → Segmented, fill-inverting progress bar
      ProgressBar.tsx
      ProgressBar.module.scss

  App.tsx                → Main app layout
  main.tsx               → Entry point

🛠 Getting Started

Install dependencies

# Using Yarn
yarn install

# Or using npm
npm install

Run the app in development

yarn dev

App will be available at: http://localhost:5173

Lint the code

yarn lint



📌 Notes

The input field uses contentEditable for fine-grained control over caret and formatting.
