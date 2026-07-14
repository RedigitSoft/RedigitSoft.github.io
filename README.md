# Redigit Softwares — website

Marketing site for **Redigit Softwares Private Limited**. Built and deployed via
GitHub Pages from `redigitsoft.github.io`, served at the custom domain
**<https://redigit.io>** (see [Custom domain](#custom-domain-redigitio) below).

Plain static site — semantic HTML, one CSS file, one small vanilla-JS file. No
build step, no framework, no dependencies. Design language mirrors
[ak1.io](https://ak1.io): content-first, generous whitespace, one warm-gold
accent, light + dark themes.

## Files

| File          | Purpose                                                        |
|---------------|----------------------------------------------------------------|
| `index.html`  | The entire single-page site (hero, services, work, about, contact, footer). |
| `style.css`   | All styles + theme tokens (dark default, light override).      |
| `script.js`   | Theme toggle, scrolled-header, reveal-on-scroll, form handling. |
| `favicon.svg` | Placeholder favicon — replace with the real brand mark.        |
| `robots.txt`  | Crawler rules — explicitly welcomes search + AI bots; links the sitemap. |
| `sitemap.xml` | Static sitemap (one URL). Bump `<lastmod>` on content changes. |
| `llms.txt`    | Curated entry point for AI assistants ([llmstxt.org](https://llmstxt.org)). |
| `CNAME`       | Custom domain — set to `redigit.io`.                           |

## Run locally

No tooling required. Either:

```bash
# open the file directly
open index.html            # macOS

# …or serve it (recommended — matches how Pages serves it)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How GitHub Pages serves it

This repo is named `RedigitSoft.github.io`, so GitHub Pages publishes the root of
the default branch automatically — no Actions workflow or Jekyll config needed.
Push to the default branch and it goes live in a minute or two. (There is no
Jekyll front matter here; add an empty `.nojekyll` file only if you later add
folders that begin with `_`.)

### Custom domain (redigit.io)

The `CNAME` file is set to **`redigit.io`**, so that is the canonical address and
the meta/Open Graph URLs point at it. For this to resolve, configure DNS at your
registrar for **redigit.io**:

- **Apex/root** — four `A` records:
  `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
  (optionally the matching `AAAA` records for IPv6).
- **www** (optional) — `CNAME` → `redigitsoft.github.io`.

Then in **Settings → Pages**, set the custom domain to `redigit.io` and enable
**Enforce HTTPS** (available once the certificate is issued).

**redigit.in** → point it at the same records if you want it to also resolve, but
GitHub Pages serves only one canonical domain per repo, so `redigit.in` is best
set up as a redirect to `redigit.io` at your DNS/registrar level.

> ⚠️ Until DNS actually points at GitHub, visiting `redigit.io` won't load. If you
> need to roll back to the `*.github.io` URL, delete the `CNAME` file (and unset
> the custom domain in Settings → Pages).

## Placeholders to fill in

Search the source for `PLACEHOLDER` / `TODO` — every unknown is marked. In short:

- **Contact form ID** (`index.html`, contact section): create a free
  [Web3Forms](https://web3forms.com) access key and paste it into the
  `access_key` hidden input. Prefer [Formspree](https://formspree.io)? Swap the
  `<form action>` to `https://formspree.io/f/PLACEHOLDER_FORM_ID` and delete the
  `access_key` input. Until a real key is set, submitting shows Web3Forms' setup
  page (an intentional reminder); once set, submissions post via AJAX with inline
  success/error feedback.
- **Company email** (`hello@redigit.io`): confirm or replace in the contact
  section and footer.
- **LinkedIn URL**: replace `linkedin.com/company/PLACEHOLDER` in the contact
  section and footer.
- **Legal details**: CIN / GSTIN / registered office in the footer.
- **Real projects**: the Work section has the featured **DrawBox** card plus two
  clearly-marked placeholder cards — duplicate a card block to add more.
- **Share image**: add a 1200×630 `og-image.png` at the repo root (referenced by
  the Open Graph / Twitter meta tags).
- **Favicon**: replace `favicon.svg` with the real mark (optionally add a
  `favicon.ico`).
- **Custom domain**: already set to `redigit.io` — finish the DNS setup described
  in [Custom domain](#custom-domain-redigitio) above.

## License

See [`LICENSE`](LICENSE).
