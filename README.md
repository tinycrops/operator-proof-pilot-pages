# Customer Onboarding Pages

Static customer onboarding site for GitHub Pages.

## Structure

- `frontend/`: public site content deployed to GitHub Pages
- `.github/workflows/pages.yml`: GitHub Pages deploy workflow

## Configure

Edit `frontend/config.js`:

- `STRIPE_PAYMENT_LINK`: your real Stripe Payment Link
- `CONTACT_EMAIL`: where intake replies should go
- `BOOKING_URL`: optional scheduling link, like Calendly or Cal.com
- `BOOKING_SUCCESS_URL`: optional post-booking confirmation/redirect page, defaults to `./booked.html`
- `GITHUB_PAGES_BASE_PATH`: `/<repo>` for project Pages, `""` for user/org Pages

## Preview locally

```bash
cd /media/ath/video/staging/customer-onboarding-pages/frontend
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy

1. Create or choose a public GitHub repo.
2. Put this directory at the repo root.
3. Push to the default branch.
4. In GitHub, enable Pages with GitHub Actions if it is not already enabled.
5. The workflow deploys `frontend/` to `https://<owner>.github.io/<repo>/`.

## Notes

- This site is static by design. No secrets belong here.
- The intake form falls back to `mailto:` so it works even without a backend.
- If you later want to store onboarding submissions, add a private backend outside this repo.
