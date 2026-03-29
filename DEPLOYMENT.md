# GitHub Pages Deployment Guide

This guide walks you through deploying uhu.sh to GitHub Pages using GitHub Actions.

## Prerequisites

- Repository pushed to GitHub
- GitHub Actions enabled (default for public repos)

## Step 1: Configure GitHub Pages in Repository Settings

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions**
   - (The workflow file `.github/workflows/build-deploy.yml` will handle the rest)

That's it! GitHub Actions will automatically detect the workflow.

## Step 2: Verify the Workflow

1. Push changes to the `main` branch (or trigger manually)
2. Go to your repository → **Actions** tab
3. You should see a workflow run called "Build and Deploy to GitHub Pages"
4. Wait for it to complete (should take ~1-2 minutes)
5. You'll see a summary showing the deployment URL

## Step 3: Access Your Site

Once deployed, your site will be available at:

```
https://<your-username>.github.io/<repository-name>/
```

For example, if your username is `sigi` and repo is `site`:
```
https://sigi.github.io/site/
```

Or if you use a custom domain (uhu.sh):

### Using a Custom Domain

1. In GitHub Settings → Pages
2. Under **Custom domain**, enter: `uhu.sh`
3. GitHub will prompt you to add DNS records
4. Add the DNS records pointing to GitHub Pages:
   - **A records** (IPv4): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **AAAA records** (IPv6): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - Or use **CNAME** (easier): `<your-username>.github.io`
5. Verify domain in GitHub
6. Check "Enforce HTTPS" once domain is verified

After DNS propagates (can take 24 hours), your site will be at: `https://uhu.sh`

## How the Workflow Works

The `.github/workflows/build-deploy.yml` file:

1. **Triggers** on every push to `main` branch (or manually via workflow_dispatch)
2. **Checks out** your code
3. **Sets up** Node.js 22 with npm cache
4. **Installs** dependencies with `npm ci` (clean install)
5. **Builds** the site with `npm run build`
6. **Uploads** the `dist/` folder as an artifact
7. **Deploys** to GitHub Pages automatically

## Manual Workflow Trigger

To manually trigger a deployment without pushing:

1. Go to **Actions** tab in your repository
2. Click **Build and Deploy to GitHub Pages** (on the left)
3. Click **Run workflow** → **Run workflow**
4. Wait for it to complete

## Troubleshooting

### Workflow fails to build

Check the workflow logs:
1. Go to **Actions** tab
2. Click on the failed workflow run
3. Click on the **build** job to see error details

Common issues:
- **Node version mismatch**: The workflow uses Node 22. Verify `package.json` is compatible
- **Missing dependencies**: Run `npm ci` locally to verify dependencies
- **Image files missing**: Ensure `public/wappen/` images are committed to git

### Site not updating

1. Check that your commit pushed to `main` branch
2. Verify workflow completed successfully in **Actions** tab
3. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Check your custom domain DNS if using one (can take 24 hours to propagate)

### 404 errors on subpaths

If you're deploying to `github.io/<repo-name>/`, you need to configure Astro to use a base path.

Edit `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://username.github.io/site',
  base: '/site',  // Add this line if deploying to a subdirectory
  build: {
    inlineStylesheets: 'auto',
  },
});
```

Then rebuild and push. The workflow will automatically deploy the new build.

## Automatic Deployments

The workflow automatically deploys whenever you:

- Push to `main` branch
- Create a pull request (optional, requires additional config)
- Manually trigger the workflow

No manual deployment steps needed!

## Environment Secrets (Advanced)

If you need environment variables:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add your secret (e.g., `API_KEY`)
4. Use in workflow: `${{ secrets.API_KEY }}`

Currently, no secrets are needed for this basic deployment.

## Logs and Monitoring

View detailed logs of each deployment:

1. Go to **Actions** tab
2. Click on a workflow run
3. Expand sections to see:
   - Node.js setup logs
   - Install logs
   - Build output
   - Deployment status

This helps diagnose any issues quickly.

## Rollback

To rollback to a previous version:

1. Note the commit hash of the working version
2. Revert with: `git revert <commit-hash>` or `git reset --soft <commit-hash>`
3. Push to main
4. The workflow will automatically deploy the reverted version

## Next Steps

1. ✅ Add `.github/workflows/build-deploy.yml` (already done)
2. Push to GitHub
3. Go to **Settings** → **Pages**
4. Select **GitHub Actions** as the source
5. Done! Automatic deployments on every push

## Questions?

- GitHub Pages docs: https://docs.github.com/en/pages
- Astro deployment docs: https://docs.astro.build/en/guides/deploy/
- GitHub Actions docs: https://docs.github.com/en/actions

---

**Your site will be live in 1-2 minutes after pushing to main!** 🚀
