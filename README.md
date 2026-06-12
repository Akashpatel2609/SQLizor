# SQLizor &mdash; Zero to Hero SQL Practice Platform

SQLizor is an interactive, premium client-side SQL practice platform designed to take you from a complete beginner to FAANG-ready master. Built entirely in React, TypeScript, and Tailwind CSS, it executes queries in the browser using a high-performance **SQLite WebAssembly (`sql.js`)** engine.

It is designed to serve as a comprehensive, one-stop learning and practice catalog for Data Analysts, Data Engineers, and Software Engineers preparing for SQL technical coding and case study interviews.

---

## 🚀 Key Features

### 1. 40 Interactive Coding Challenges
Practice relational queries on realistic business datasets (up to 50 rows per table) mimicking top-tier tech stack operations:
*   **Beginner (Challenges 1-15)**: SELECT, logical operators, basic filtering, aggregates (`COUNT`, `SUM`, `AVG`), and sorting.
*   **Intermediate (Challenges 16-30)**: Multiple table joins (`LEFT`, `INNER`), date calculations (`DATEDIFF`), aggregate filters (`HAVING`), and nested conditions.
*   **Advanced (Challenges 31-40)**: Complex subqueries, anti-joins (checking non-existence), conditional categorization (`CASE WHEN`), and LeetCode-equivalent problems.
*   **Company Scenarios**: Real business context from Amazon, Uber, Meta, Netflix, Stripe, Airbnb, Spotify, and TikTok, alongside operational datasets for Finance, Marketing, and IT Support.

### 2. 5 FAANG Case Studies (STAR Response Format)
Master the behavioral and architectural questions asked in system design and analytics rounds. Each case study provides a complete breakdown using the **STAR method** (Situation, Task, Action, Result) with copyable PostgreSQL/Snowflake model queries:
1.  *Monthly User Cohort Retention Analysis* (Meta / Netflix)
2.  *7-Day Rolling Average Transaction Spikes* (Stripe / Finance)
3.  *Org Chart Salary Audit (Hierarchical Self-Joins)* (Big Tech / HR)
4.  *First-Touch Marketing Attribution Model* (E-Commerce / Amazon)
5.  *Peak Post Upload Virality & Engagement* (TikTok / Meta)

### 3. Technical Interview Q&A (16 Conceptual Questions)
Study core relational theory and query mechanics with detailed model answers, example code blocks, and key "buzzwords" to mention during interviews:
*   **Joins & Set Operators**: INNER vs. OUTER joins, NULL matching rules, UNION vs. UNION ALL sorting costs.
*   **Aggregations & Filtering**: WHERE vs. HAVING execution order, COUNT(*) vs. COUNT(column) NULL logic, pivoting rows.
*   **Window Functions & CTEs**: Retaining granularity, ROW_NUMBER vs. RANK vs. DENSE_RANK ties, CTE recursive graph models.
*   **Performance & Optimizations**: Diagnostics using `EXPLAIN ANALYZE`, covering index leaf nodes, clustered indexes.
*   **Database Architecture**: Normalization vs. Denormalization (OLTP vs. OLAP), ACID transactions, DELETE vs. TRUNCATE vs. DROP.

### 4. Gamified UI & Persistence
*   **XP & Leveling**: Earn XP based on difficulty, level up, and see visual progress meters with canvas confetti rewards.
*   **Daily Streaks**: A streak fire indicator (🔥) tracks consecutive days of solving queries.
*   **Speedrun Clock**: Solves completed in under 45 seconds reward you with a +20 XP speedrun bonus.
*   **Badge Achievements**: Sidebar panel displays unlocked/locked achievements based on solved count and query categories.
*   **Local Persistence**: All solved challenge indexes, custom typed editor SQL queries, XP level, and streak tracking are saved to browser `localStorage` so you never lose progress.

---

## 🛠️ Technology Stack

*   **Framework**: [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom HSL neon accents, dark mode styling, and responsive layout grids)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Database Engine**: [sql.js](https://sql.js.org/) (SQLite compiled to WebAssembly) loaded asynchronously at runtime
*   **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 💻 Local Installation & Run

1.  **Clone the Repository**:
    ```bash
    git clone <your-repository-url>
    cd SQL-Tutor
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open **[http://localhost:5173](http://localhost:5173)** in your browser.

4.  **Verify Production Build**:
    ```bash
    npm run build
    ```

---

## 🌐 Free Hosting Deployment

Because SQLizor compiles to 100% static files and executes queries entirely inside the user's browser, you can host it completely **free of charge**:

### Option 1: Vercel (Recommended)
1.  Install Vercel CLI: `npm install -g vercel`
2.  Run `vercel` from the root folder.
3.  Link to your account and select standard Vite settings.

### Option 2: Netlify
1.  Sign in to Netlify and drag-and-drop the compiled `dist/` folder.
2.  Or connect Netlify to your GitHub repo for automatic CI/CD deployments.

### Option 3: GitHub Pages
1.  Configure Vite settings for base paths.
2.  Deploy using the `gh-pages` npm package.
