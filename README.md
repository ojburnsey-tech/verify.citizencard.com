# VerifyCard Age-Check Demo

VerifyCard is a fictional, frontend-only age-check demo built with Vite, React, and TypeScript. It does not perform identity verification, QR validation, authentication, data collection, or real checks.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Open from a phone on the same Wi-Fi

1. Make sure your computer and phone are on the same Wi-Fi network.
2. Run `npm run dev`.
3. Find your computer's local IP address.
   - Windows: run `ipconfig` and look for the IPv4 address on your Wi-Fi adapter.
   - macOS/Linux: run `ifconfig` or `ip addr`.
4. On your phone, open `http://YOUR_LOCAL_IP:5173`.

The dev script already uses `--host 0.0.0.0`, so Vite listens on your local network.

## Deploy for a public browser link

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
