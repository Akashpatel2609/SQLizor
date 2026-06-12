# Deployment & Hosting Guide: SQL-Tutor

This guide outlines how you can host the **SQL-Tutor** platform for **free** so you can access it from anywhere, practice on any browser, and preserve all your practice history.

---

## 1. Local Storage Persistence (How Progress is Saved)
SQL-Tutor is designed to run entirely client-side. To avoid the need for databases, user accounts, or hosting fees:
*   **Auto-Save Editor Queries**: Every keystroke you type in the editor is saved to the browser's `localStorage` specific to the active challenge. If you close the browser and return tomorrow, your code will be exactly where you left it.
*   **XP, Level, Streaks, and solved records**: All points, active day streaks, and unlocked badges are saved securely in your browser's local cache.
*   *Tip: Do not clear your browser cookies/site data for the hosted URL if you want to keep your progress!*

---

## 2. Option A: Deploying on Vercel (Recommended - Easiest & Fastest)
Vercel has native integration with Vite React projects, auto-compiles your TypeScript, and deploys it on a global CDN for free.

1.  **Push to GitHub**:
    *   Initialize git in your folder and push the `SQL-Tutor` subfolder as a repository (or the entire project) to your personal GitHub account.
2.  **Import to Vercel**:
    *   Go to [vercel.com](https://vercel.com/) and sign up for a free account using your GitHub credentials.
    *   Click **"Add New"** > **"Project"**.
    *   Select your repository from the list.
3.  **Configure Settings**:
    *   If your SQL-Tutor is in a subdirectory (like `/SQL-Tutor`), set the **Root Directory** option in Vercel to `SQL-Tutor`.
    *   Vercel will automatically detect **Vite** and configure the build settings:
        *   *Build Command*: `npm run build`
        *   *Output Directory*: `dist`
4.  **Deploy**:
    *   Click **"Deploy"**. Within 1 minute, your site will be live with a free custom SSL URL (e.g. `https://yourproject.vercel.app`).
    *   *Bonus: Every time you push new commits to GitHub, Vercel will automatically rebuild and redeploy your website!*

---

## 3. Option B: Deploying on Netlify (Free & Simple)
Netlify is another excellent free platform that connects to GitHub:

1.  Sign up for a free account at [netlify.com](https://www.netlify.com/) using GitHub.
2.  Click **"Add new site"** > **"Import an existing project"**.
3.  Choose your GitHub repository.
4.  Set the **Base directory** to `SQL-Tutor` (if inside a subfolder), **Build command** to `npm run build`, and **Publish directory** to `dist`.
5.  Click **"Deploy site"**. Netlify will build the code and give you a free, public URL.

---

## 4. Option C: Deploying on GitHub Pages (Built into GitHub)
If you want to keep everything inside GitHub:

1.  Open [vite.config.ts](file:///c:/Users/akash/OneDrive/Desktop/Work/Projects/Data%20Analysis/AllStack/Portfolio%20Project%20%231/NVidia%20APi/SQL-Tutor/vite.config.ts) and add the `base` configuration matching your repository name:
    ```typescript
    export default defineConfig({
      plugins: [react()],
      base: '/repo-name/', // e.g., '/SQL-Tutor/'
    })
    ```
2.  Install the deployment utility:
    ```bash
    npm install --save-dev gh-pages
    ```
3.  Add the following scripts to your `package.json`:
    ```json
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
    ```
4.  Run deployment:
    ```bash
    npm run deploy
    ```
5.  In your GitHub repository settings, go to the **Pages** tab and configure it to build from the `gh-pages` branch.
