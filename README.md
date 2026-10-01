# Wexford Homeowners Association Website

A simple, low-maintenance website for the Wexford HOA. Board members post announcements, events, documents, and board info through a web editor and sign in with just their email. They never have to touch code.

- **Site:** static HTML built with [Eleventy](https://www.11ty.dev/). There's no server or database to maintain or patch.
- **Editor:** [Pages CMS](https://pagescms.org/), configured in [.pages.yml](.pages.yml). Every change is saved as a Git commit, so there's a full history and any change can be undone.
- **Hosting:** GitHub Pages (free). The site rebuilds automatically on every change ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)).

## Posting an announcement (for Board editors)

1. Go to [app.pagescms.org](https://app.pagescms.org/) (also linked as **Board login** at the bottom of the site). Enter your email and click the sign-in link you receive.
2. Open the WHA website, choose **Announcements**, then **Add an entry**.
3. Enter a title and the text. Tick **Mark as important** to pin it to the top of the home page.
4. Click **Save**. The live site updates in about 1–2 minutes.

Events, documents (PDF uploads), board members, and general site info are edited the same way.

## One-time setup

1. **Push to GitHub.** Create a repository (public is required for free GitHub Pages) and push this project to the `main` branch:
   ```bash
   git branch -M main
   git add -A && git commit -m "Initial site"
   git remote add origin https://github.com/YOUR-USERNAME/wexford-hoa-website.git
   git push -u origin main
   ```
2. **Turn on GitHub Pages.** In the repository, open *Settings*, then *Pages*. Under *Source*, choose **GitHub Actions**. The site is published at `https://YOUR-USERNAME.github.io/wexford-hoa-website/` within a few minutes. Progress shows on the *Actions* tab.
3. **Connect the editor.** Sign in to [app.pagescms.org](https://app.pagescms.org/) with your GitHub account and install the Pages CMS GitHub App on this repository only.
4. **Invite editors.** In Pages CMS, open the repository's *Settings*, then *Collaborators*, and add each Board editor's email. They don't need GitHub accounts.
5. **Custom domain (optional).** Buy a domain (e.g. `wexfordhoa.org`). In the repository's *Settings*, then *Pages*, enter it under *Custom domain* and follow GitHub's DNS instructions. Tick *Enforce HTTPS*. Links adjust automatically on the next deploy.

## Local development

Requires Node.js 18 or newer.

```bash
npm install
npm start          # preview site at http://localhost:8080
```

## Project layout

```
.pages.yml          Pages CMS editor config (which fields editors can change)
.github/workflows/  Builds and publishes to GitHub Pages
src/
  announcements/    One Markdown file per announcement
  events/           One Markdown file per event
  _data/            site.json, board.json, documents.json (editable in the CMS)
  _includes/        Page layouts
  uploads/          Files uploaded through the CMS
  css/, js/
```
