# Stripe Setup

Use this to get from zero to a live payment link for the onboarding page.

## 1. Create the account

1. Go to `https://dashboard.stripe.com/register`.
2. Create the account with the email you want tied to revenue ops.
3. Confirm the email address.

## 2. Enter business details

1. In the Stripe Dashboard, open the account activation flow.
2. Add:
   - legal name
   - business type
   - address
   - support phone/email
   - statement descriptor
3. Add the bank account where payouts should land.
4. Complete identity verification if Stripe asks for it.

Stripe lets you test quickly, but live payments and payouts depend on account activation and verification.

## 3. Build the payment link

1. In Stripe Dashboard, go to `Payment links`.
2. Create a product such as `Operator Proof Pilot`.
3. Set the one-time price, for example `$1,500`.
4. Configure any options you want:
   - collect customer email
   - collect billing address
   - allow promo codes
   - confirmation message
5. Create the Payment Link and copy the final URL.

## 4. Put the Stripe link into the site

Edit:

`/media/ath/video/staging/customer-onboarding-pages/frontend/config.js`

Replace:

```js
STRIPE_PAYMENT_LINK: "https://buy.stripe.com/REPLACE_ME",
```

with your real Stripe Payment Link.

Also set:

```js
CONTACT_EMAIL: "you@yourdomain.com",
BOOKING_URL: "https://cal.com/you", // optional scheduling link
BOOKING_SUCCESS_URL: "./booked.html" // optional post-booking redirect target
```

`BOOKING_URL` is where the customer goes to schedule.

`BOOKING_SUCCESS_URL` is where the booking tool can send them afterward if it supports redirecting to a confirmation page.

## 5. Preview locally

```bash
cd /media/ath/video/staging/customer-onboarding-pages/frontend
python3 -m http.server 8080
```

Then open:

`http://localhost:8080`

## 6. Deploy to GitHub Pages

1. Push `/media/ath/video/staging/customer-onboarding-pages` to a public GitHub repo.
2. Let the included GitHub Actions workflow deploy `frontend/`.
3. Confirm the live URL is:

`https://<owner>.github.io/<repo>/`

## Official docs

- Stripe account activation: `https://docs.stripe.com/get-started/account/activate`
- Stripe Payment Links: `https://docs.stripe.com/payment-links`
- Stripe Payment Links quickstart: `https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=payment-links`
