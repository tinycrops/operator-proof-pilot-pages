(function () {
  const config = window.CONFIG || {};
  const stripeLink = typeof config.STRIPE_PAYMENT_LINK === "string" ? config.STRIPE_PAYMENT_LINK.trim() : "";
  const contactEmail = typeof config.CONTACT_EMAIL === "string" ? config.CONTACT_EMAIL.trim() : "";
  const brandName = config.BRAND_NAME || "Operator Proof Cockpit Pilot";
  const priceLabel = config.PRICE_LABEL || "$79.99 / month";

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    const el = byId(id);
    if (el) {
      el.textContent = value;
    }
  }

  function setHref(id, href) {
    const el = byId(id);
    if (el && href) {
      el.setAttribute("href", href);
    }
  }

  function show(id, shouldShow) {
    const el = byId(id);
    if (!el) {
      return;
    }
    el.hidden = !shouldShow;
  }

  function buildMailtoUrl(form) {
    const subject = encodeURIComponent("Operator Proof Cockpit intake");
    const body = encodeURIComponent(
      [
        "Name: " + form.get("name"),
        "Company: " + form.get("company"),
        "Email: " + form.get("email"),
        "Company/app to prioritize: " + form.get("company_target"),
        "Existing URL: " + form.get("company_url"),
        "",
        "Workflow to expose:",
        form.get("workflow"),
        "",
        "Machine / service / API to observe:",
        form.get("system"),
        "",
        "Action to take from the dashboard:",
        form.get("action"),
        "",
        "Primary operator:",
        form.get("operator"),
        "",
        "Success signal:",
        form.get("success"),
      ].join("\n")
    );
    return "mailto:" + encodeURIComponent(contactEmail) + "?subject=" + subject + "&body=" + body;
  }

  setText("brand-name", brandName);
  setText("brand-name-2", brandName);
  setText("price-label", priceLabel);

  const checkoutReady = stripeLink && !stripeLink.includes("REPLACE_ME");
  show("buy-now", checkoutReady);
  show("buy-disabled", !checkoutReady);
  if (checkoutReady) {
    setHref("buy-now", stripeLink);
  }

  const form = byId("intake-form");
  const status = byId("intake-status");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!contactEmail || contactEmail.includes("example.com")) {
        status.textContent = "Set CONTACT_EMAIL in config.js to activate the intake form.";
        status.dataset.mode = "warning";
        return;
      }
      const data = new FormData(form);
      const mailto = buildMailtoUrl(data);
      window.location.href = mailto;
      status.textContent = "Your email client should open with the onboarding intake pre-filled.";
      status.dataset.mode = "ok";
    });
  }
})();
