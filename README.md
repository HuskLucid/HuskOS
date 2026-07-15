<div align="center">

# HuskOS

### Focus. Study. Flow.

A premium, distraction-free study operating system — tasks, notes, habits, goals, a Pomodoro focus timer, XP & levels, and a command palette, all synced to the cloud.

Built with Next.js 15 · React 19 · TypeScript · Tailwind · Supabase · Prisma

</div>

---

## ✨ What's inside

- **Premium design system** — dark-first, warm-paper light mode, runtime accent + wallpaper customization. No generic blue dashboard.
- **Real authentication** — Google, GitHub, and email magic-link sign-in via Supabase Auth, with silent token refresh in middleware so you sign in once.
- **Protected routes** — middleware guards `/dashboard`, `/focus`, `/settings` and refreshes the session on every request.
- **Pomodoro focus timer** — an animated ring timer that logs every completed session to Supabase.
- **Tasks** — full create / toggle / delete CRUD wired through TanStack Query + Supabase (the reference pattern for the other features).
- **Command palette** — `⌘K` / `Ctrl+K` to jump anywhere.
- **XP & levels** — a gentle progression curve computed from your activity.
- **PWA** — installable, with an offline-first service worker and web manifest.
- **Row Level Security** — every table scoped to its owner; SQL included.

## 🗂 Project structure

```
src/
  app/
    (app)/            # authenticated area (shared shell layout)
      dashboard/  focus/  tasks/  notes/  habits/
      goals/  calendar/  analytics/  library/  settings/
    auth/callback/    # OAuth + magic-link exchange
    login/            # sign-in page
    page.tsx          # public landing page
    layout.tsx  globals.css
  components/
    ui/               # primitives (button, input, card)
    shell/            # sidebar, topbar, page-header, empty-state
    auth/  focus/  tasks/  dashboard/  settings/
    command-palette.tsx  providers.tsx  theme-customizer.tsx
  lib/
    supabase/         # browser + server clients, session middleware
    utils.ts  theme.ts
  stores/             # zustand UI store
  middleware.ts
prisma/schema.prisma  # full data model
supabase/             # RLS policies + seed SQL
public/               # manifest + service worker
```

## 🚀 Getting started

### 1. Clone & install

```bash
git clone https://github.com/HuskLucid/HuskOS.git
cd HuskOS
npm install
```

### 2. Create a Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy the URL, `anon` key, and `service_role` key.
3. In **Project Settings → Database**, copy the connection strings (pooled `6543` and direct `5432`).

### 3. Configure environment

```bash
cp .env.example .env
# fill in the Supabase + database values
```

### 4. Create the schema and policies

```bash
npm run db:push                 # create tables from prisma/schema.prisma
```

Then, in the Supabase **SQL editor**, run in order:

1. `supabase/rls-policies.sql` — enables RLS, owner policies, and the new-user trigger.
2. `supabase/seed-achievements.sql` — seeds the achievements catalog.

### 5. Enable auth providers

In **Supabase → Authentication → Providers**, enable **Google** and **GitHub** (add their OAuth credentials) and **Email**. Set the redirect URL to `http://localhost:3000/auth/callback` (and your production URL later).

### 6. Run

```bash
npm run dev        # http://localhost:3000
```

## 🛠 Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Generate Prisma client + production build |
| `npm run typecheck` | Strict TypeScript check |
| `npm run db:push` | Push the Prisma schema to Supabase |
| `npm run db:studio` | Open Prisma Studio |

## ☁ Deploy to Vercel

1. Push to GitHub (already done).
2. Import the repo in [Vercel](https://vercel.com).
3. Add the same env vars from `.env`.
4. Update the Supabase auth redirect URL to `https://your-app.vercel.app/auth/callback`.
5. Deploy.

## 🗺 Roadmap / build-out

The architecture, schema, auth, and data layer are production-ready. These features have their schema + data layer in place and a UI shell ready to extend, following the **Tasks** board as the reference CRUD pattern:

- Notes with a Markdown editor & folders
- Habit logging with a streak heatmap
- Goal progress tracking
- Calendar with exam countdowns
- Analytics charts from `study_sessions`
- Resource library
- AI study planner / flashcards / quiz (add your model provider)

## 📜 License

MIT — build freely.
