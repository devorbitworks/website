# Guardian Link / Orbitworks website

Version 0.2.0. Next.js 16.4.6 App Router, React 19.3.1 and TypeScript. The responsive site renders approved copy in HTML with local product assets and Pretendard. Routes: `/`, `/company`, `/business` and `/updates`; legacy `/about` redirects to `/company`.

## Local development and checks

Use Node.js 22.18 or newer for the native TypeScript test runner.

```sh
npm ci
NEXT_TELEMETRY_DISABLED=1 npm run dev -- --hostname 127.0.0.1
NEXT_TELEMETRY_DISABLED=1 npm run build
NEXT_TELEMETRY_DISABLED=1 npm run typecheck
npm run lint
npm test
```

No secrets are needed for local QA. Use synthetic contact details only. Local and preview builds are `noindex`; only `VERCEL_ENV=production` builds permit indexing. Keep canonical URLs on `https://www.orbitworks.co.kr`.

## Inquiry delivery

Mail is off by default, including when Gmail credentials exist. `GET /api/inquiry` exposes only a `configured` boolean; it does not contact SMTP. `POST /api/inquiry` validates the active form and explicit consent. Disabled delivery returns `503`; SMTP rejection or failure returns `502`. The site shows success only after SMTP accepts the designated recipient, not as a guarantee of inbox delivery. Browser drafts remain in memory after failure. Legacy `/api/contact` accepts the previous Orbitworks field names but enforces the same consent, validation and delivery gate.

Only after separate approval to enable live intake: configure `GMAIL_USER` and `GMAIL_APP_PASSWORD` as production-only secrets, leave the recipient fixed to `buhee@orbitworks.co.kr`, and set `INQUIRY_DELIVERY_ENABLED=true` in Vercel Production only. The server also requires the platform's `VERCEL_ENV=production`; do not spoof it in local QA. To pause delivery, remove the flag or set it to `false`. Never commit an app password or put it in a `NEXT_PUBLIC_*` variable. No mail is sent by the test suite, which injects a stub transport.

See [migration notes](docs/renewal-v2/DEVELOPMENT_HANDOFF.md) and the [changelog](CHANGELOG.md).
