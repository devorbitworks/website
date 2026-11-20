# 0.2.0 migration notes

- Existing `@/*` imports remain mapped to `src/*`. Approved copy and product stage geometry live in `docs/figma`; leave these data files and their corresponding local assets versioned together.
- `/` is the product home. `/company` replaces `/about` (HTTP 308). Sitemaps list only `/`, `/company`, `/business` and `/updates`. Naver and Google verification, canonical host and Organization JSON-LD facts are unchanged.
- Production and preview use distinct indexing rules based on the platform's `VERCEL_ENV`, not `NODE_ENV`. Build in the intended environment.
- Old `/api/contact` JSON clients must explicitly supply `consent: true` obtained from the user. Existing field names are normalized then validated as an Orbitworks inquiry. The former page components remain in the source tree but are not mounted on current routes.
- Releasing code and enabling inquiry delivery are separate decisions. Before enabling mail, review production abuse controls, retention and mailbox access. Validate only with stub transport until real-mail testing is separately authorized. Local and preview cannot deliver even with credentials and the enable flag present.
