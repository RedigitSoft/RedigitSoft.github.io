# Redigit Softwares — website

Marketing site for **Redigit Softwares Private Limited**. Built and deployed via
GitHub Pages from `redigitsoft.github.io`, served at the custom domain
**<https://redigit.io>** (see [Custom domain](#custom-domain-redigitio) below).

Single-page site — semantic HTML, one CSS file, one small vanilla-JS file. Built
by **Jekyll** (which GitHub Pages runs automatically) so the copy that changes
often — projects and company/contact details — lives in data files instead of
being hardcoded in the markup. Design language mirrors [ak1.io](https://ak1.io):
content-first, generous whitespace, one warm-gold accent, light + dark themes.

## Files

| File                | Purpose                                                        |
|---------------------|----------------------------------------------------------------|
| `index.html`        | The single-page site (hero, services, work, about, contact, footer). Uses Liquid tags that pull from the files below. |
| `_config.yml`       | Site + company/contact details, SEO/social text, and the contact-form key. **Edit real values here.** |
| `_data/projects.yml`| The "Selected work" cards — one entry per project. **Add projects here.** |
| `style.css`         | All styles + theme tokens (dark default, light override).      |
| `script.js`         | Theme toggle, scrolled-header, reveal-on-scroll, form handling. |
| `favicon.svg`       | Placeholder favicon — replace with the real brand mark.        |
| `robots.txt`        | Crawler rules — explicitly welcomes search + AI bots; links the sitemap. |
| `sitemap.xml`       | Static sitemap (one URL). Bump `<lastmod>` on content changes. |
| `llms.txt`          | Curated entry point for AI assistants ([llmstxt.org](https://llmstxt.org)). |
| `CNAME`             | Custom domain — set to `redigit.io`.                           |

## Run locally

Because the site is now built by Jekyll, use Jekyll to preview it (opening
`index.html` directly will show unrendered `{{ ... }}` tags):

```bash
gem install jekyll        # one-time, if you don't have it
jekyll serve              # builds + serves at http://localhost:4000
# …or a one-off build into _site/
jekyll build
```

`_site/` is the generated output and is git-ignored — never edit it by hand.

## How GitHub Pages serves it

This repo is named `RedigitSoft.github.io`, so GitHub Pages publishes the root of
the default branch automatically. Because `_config.yml` is present, Pages builds
the site with **Jekyll** on every push — no Actions workflow needed. Push to the
default branch and it goes live in a minute or two.

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

## Editing content

Day-to-day edits happen in two data files, not in `index.html`:

### `_data/projects.yml` — the Work section

One entry per project. Copy a block to add one; set `featured: true` on exactly
one project to give it the large highlighted card (keep it first). Fields:
`name`, `tag` (defaults to "Open source"), `description`, `stack`, `repo`.

### `_config.yml` — company, contact, and SEO

All the studio's details live under the `company:` block plus a few top-level
keys. Anything still set to `PLACEHOLDER` (or left blank) needs a real value:

- **`web3forms_key`** — create a free [Web3Forms](https://web3forms.com) access
  key and paste it here. Until a real key is set, submitting shows Web3Forms'
  setup page (an intentional reminder); once set, submissions post via AJAX with
  inline success/error feedback. (Prefer [Formspree](https://formspree.io)
  instead? Swap the `<form action>` in `index.html` to
  `https://formspree.io/f/<your-id>` and delete the `access_key` input.)
- **`company.linkedin`** — replace `linkedin.com/company/PLACEHOLDER` with the
  real company page (used in the contact section, footer, and JSON-LD).
- **`company.email`** — confirm or replace `hello@redigit.io`.
- **`company.cin` / `gstin` / `registered_office`** — the footer legal line.
  Leave blank and the line is hidden automatically.
- **`og_image`** — add a 1200×630 `og-image.png` at the repo root (referenced by
  the Open Graph / Twitter meta tags).

Still hardcoded in the source (edit directly if needed):

- **Favicon**: replace `favicon.svg` with the real mark (optionally add a
  `favicon.ico`).
- **Custom domain**: already set to `redigit.io` — finish the DNS setup described
  in [Custom domain](#custom-domain-redigitio) above.

## License

See [`LICENSE`](LICENSE).
