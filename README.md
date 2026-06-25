# CitizenCard Verify — Demonstration (Educational Clone)

A frontend-only, visual + behavioural recreation of the public CitizenCard card-verification
experience (verify.citizencard.com), built with Vite, React and TypeScript.

> **Demonstration — educational clone. Not affiliated with or endorsed by CitizenCard.
> No real verification is performed.**
>
> This is a learning / portfolio recreation. It performs **no real identity verification**, has
> **no backend**, makes **no external network calls** at runtime (other than an optional Google
> Fonts stylesheet), and contains no real personal photos. All card data is mock data held in the
> browser, and a persistent disclosure ribbon is shown on every page.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

### Build, check and preview

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # eslint .
npm run build       # tsc --noEmit && vite build
npm run preview     # serve the production build
```

## Routes (client-side routing)

Routing uses `react-router-dom`. The app is a single-page app, so the server must serve
`index.html` for unknown paths (see *Deploy* below) or deep links will 404 on refresh.

| Route | Page |
| --- | --- |
| `/` | Verify form — card number, date of birth, name, Verify button |
| `/verify/scan/:token` | Age & likeness result (the page the real QR codes open) |
| `/verify/result/:token` | Full-check result — "This card is valid" / could-not-verify |
| `/service-details` | Short explainer of the verify service |
| `*` | 404 / expired ("This check has expired or could not be found") |

### Sample links

The mock dataset lives in [`src/data/sampleCards.ts`](src/data/sampleCards.ts). Example tokens:

- `/verify/scan/019eff34-bbf0-789b-bcb2-45ba4b7d4acb` → Angela Greene, 18+
- `/verify/result/019eff34-bbf0-789b-bcb2-45ba4b7d4acb` → "This card is valid"
- `/verify/result/none` → "We could not verify this card"
- `/verify/scan/<unknown>` → expired / 404 state

On the verify form, enter a sample card's number, date of birth and name (e.g. `5843 2166 1964
2184`, `09 Nov 2002`, `Angela Greene`) to reach the valid result. Matching is entirely client-side
and is mock only.

## Open from a phone on the same Wi-Fi

1. Make sure your computer and phone are on the same Wi-Fi network.
2. Run `npm run dev` (it already uses `--host 0.0.0.0`).
3. Find your computer's local IP address (`ipconfig` on Windows, `ip addr` / `ifconfig` on
   macOS/Linux).
4. On your phone, open `http://YOUR_LOCAL_IP:5173`.

## Deploy for a public browser link

Because this is a single-page app with deep links, configure an SPA fallback so paths like
`/verify/scan/:token` resolve on refresh. Both files are already included:

- [`vercel.json`](vercel.json) rewrites everything to `/index.html`.
- [`public/_redirects`](public/_redirects) does the same for Netlify (`/*  /index.html  200`).

### Vercel

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in Vercel.
3. Use `npm run build` as the build command and `dist` as the output directory.
4. Deploy.

### Netlify

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project in Netlify.
3. Use `npm run build` as the build command and `dist` as the publish directory.
4. Deploy.

## Notes

- **Typeface:** Poppins (loaded via Google Fonts) is a close free approximation of the production
  rounded humanist sans-serif; the exact production typeface is unconfirmed. Self-hosting the font
  would remove the only optional external request.
- **reCAPTCHA:** reproduced as static notice text only — no reCAPTCHA is loaded or executed.
- **Cookies:** the cookie preferences modal records the choice in `localStorage` only; no real
  cookies or trackers are set.
- **Portraits:** neutral SVG silhouettes are generated in-app — no real faces, no placeholder
  services.
- **Contact details** in the footer are clearly-marked demo placeholders to avoid impersonation.
- **PWA:** installs via [`public/manifest.webmanifest`](public/manifest.webmanifest); a service
  worker ([`public/sw.js`](public/sw.js)) caches the app shell for offline use.
