# Local development

1. Start the backend in the separate `AgentConstruct` checkout (`make bootstrap-local`).
2. Copy `.env.example` to `.env.local`.
3. Keep `VITE_API_BASE_URL` empty to use `http://127.0.0.1:8000` in development only.
4. Run `npm ci && npm run dev` and open `http://localhost:5173`.

The backend must allow the exact local origin after the separation PR lands. Local fixture login is
explicitly labelled and cannot operate when the backend uses hosted mode.

Useful commands:

```bash
npm run dev          # development server
npm run typecheck    # strict TypeScript
npm run lint         # ESLint
npm test             # deterministic mocked API/component tests
npm run build        # static production output
npm run preview      # local production preview
npm run verify       # complete frontend gate
```

Do not put credentials in `.env.local`; every `VITE_*` value is bundled and visible to users.
