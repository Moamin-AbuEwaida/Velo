# VeloVibe Cycles

A premium e-commerce platform for electric and standard bicycles.

## 🚀 How to Connect to GitHub

To push this project to your repository, follow these steps in your terminal:

### 1. Initialize & Commit
```bash
git init
git add .
git commit -m "Initial commit of VeloVibe"
```

### 2. Connect and Push
Run these commands to link to your specific repository:

```bash
git branch -M main
git remote remove origin
git remote add origin https://github.com/Moamin-AbuEwaida/Velo.git
git push -u origin main
```

## 🛠 Deployment

### GitHub Pages
This project includes a GitHub Action in `.github/workflows/deploy.yml`. 
1. Push to the `main` branch.
2. Go to your GitHub Repository Settings > Pages.
3. Select "Deploy from a branch".
4. Ensure the source is `gh-pages` / `root`.

### Netlify
1. Connect your new repository to Netlify.
2. Build command: `npm run build`
3. Publish directory: `dist`

## 📦 Installation (Local)

```bash
npm install
npm run dev
```