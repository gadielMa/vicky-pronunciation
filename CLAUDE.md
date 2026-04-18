# Vicky Pronunciation — Agente de proyecto

## Descripción

Plataforma de membresía para enseñar español argentino. Tiene dos secciones de
contenido:

- **Live Argentina** (`/adults`) — para adultos que quieren aprender español
  argentino.
- **Grow Bilingual** (`/families`) — para familias y niños bilingües.

Vicky (la dueña del negocio) sube contenido desde el panel `/admin`. Los
usuarios pagan una suscripción mensual o anual via Stripe para acceder al
contenido.

## Stack

| Capa       | Tecnología                                   |
|------------|----------------------------------------------|
| Frontend   | Next.js 16.2.2 (App Router + Turbopack), React 19.2 |
| UI         | shadcn/ui, Tailwind CSS v4, Lucide           |
| Auth & DB  | Supabase (PostgreSQL + RLS)                  |
| Storage    | Supabase Storage (6 buckets)                 |
| Pagos      | Stripe 21.x (checkout + webhooks)            |
| Deploy     | Render (Docker, `output: "standalone"`)      |
| MCP        | Supabase MCP en `.mcp.json` (project scope)  |

## Comandos

```bash
# Desarrollo local
npm run dev       # Levanta en http://localhost:3000

# Build
npm run build
npm run start

# Lint
npm run lint
```

## Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_MONTHLY=price_xxx
STRIPE_PRICE_YEARLY=price_xxx

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                  # Landing pública
│   ├── (auth)/
│   │   ├── login/                # Login con email/password
│   │   └── register/             # Registro
│   ├── (platform)/               # Rutas protegidas para suscriptores
│   │   ├── dashboard/
│   │   ├── adults/               # Sección Live Argentina
│   │   ├── families/             # Sección Grow Bilingual
│   │   ├── account/
│   │   └── subscription/
│   ├── admin/                    # Panel de admin (solo role=admin)
│   │   ├── content/              # CRUD de contenido
│   │   ├── categories/
│   │   └── users/
│   └── api/
│       ├── content/route.ts      # GET/POST contenido
│       ├── content/[id]/route.ts # GET/PUT/DELETE por ID
│       ├── stripe/
│       │   ├── create-checkout/  # Inicia sesión de pago Stripe
│       │   └── create-portal/    # Portal de gestión de suscripción
│       ├── upload/signed-url/    # Genera URL firmada para subir archivos
│       └── webhooks/stripe/      # Recibe eventos de Stripe
├── components/
│   ├── admin/                    # Formularios y UI del panel admin
│   ├── landing/                  # Hero, SectionPreview, PricingCards, Footer
│   ├── platform/                 # VideoPlayer, AudioPlayer, ContentCard, etc.
│   ├── shared/                   # Navbar, LoadingSpinner, etc.
│   └── ui/                       # Componentes shadcn
├── hooks/
│   ├── use-user.ts               # Auth state + perfil del usuario
│   └── use-subscription.ts       # Estado de suscripción activa
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client (componentes client-side)
│   │   ├── server.ts             # Server client (Server Components, API routes)
│   │   └── middleware.ts         # Refresca sesión en cada request
│   ├── stripe/                   # Helpers de Stripe
│   ├── constants.ts              # SECTIONS, CONTENT_TYPES, STORAGE_BUCKETS
│   └── utils.ts
├── types/
│   └── database.ts               # Profile, Section, Category, ContentItem,
│                                 # Subscription, ContentItemWithCategory
└── middleware.ts                 # Protege rutas, refresca sesión Supabase
```

## Base de datos (Supabase)

Las migrations están en `supabase/migrations/`. Se corren en orden:

| Archivo                                | Contenido                                      |
|----------------------------------------|------------------------------------------------|
| `00001_create_profiles.sql`            | Tabla `profiles`, trigger `on_auth_user_created` |
| `00002_create_sections_categories.sql` | Tablas `sections` y `categories`               |
| `00003_create_content.sql`             | Tabla `content_items`                          |
| `00004_create_subscriptions.sql`       | Tabla `subscriptions`, enum `subscription_status` |
| `00005_rls_policies.sql`               | Row Level Security para todas las tablas       |
| `00006_create_storage_buckets.sql`     | 6 buckets: videos, audio, documents, downloads, thumbnails, public-assets |
| `00007_fix_rls_recursion.sql`          | Función `public.is_admin()` SECURITY DEFINER para romper recursión infinita en policies de admin |
| `00008_seed_sections_categories.sql`   | Seeds de 2 secciones (adults/families) + 11 categorías iniciales |

**Roles de usuario:** `user` (suscriptor) o `admin` (Vicky).

**Flujo de auth:**
1. Usuario se registra → Supabase crea `auth.users`
2. Trigger `on_auth_user_created` crea automáticamente el registro en `profiles`
3. Middleware refresca la sesión en cada request

## Flujo de Stripe

1. Usuario hace clic en "Subscribe" → llama a `/api/stripe/create-checkout`
2. Stripe redirige al checkout → usuario paga
3. Stripe envía webhook a `/api/webhooks/stripe` → se crea/actualiza la fila en `subscriptions`
4. Usuario puede gestionar su suscripción en `/api/stripe/create-portal`

## Subida de contenido (Admin)

1. Vicky selecciona archivo en el panel admin
2. El front llama a `/api/upload/signed-url` → Supabase devuelve URL firmada
3. El browser sube el archivo directamente al bucket correspondiente
4. Se guarda la URL en `content_items.file_url`

## Tipos de contenido

```typescript
type ContentType =
  | "video"
  | "audio"
  | "pdf"
  | "event_replay"
  | "downloadable_game"
  | "guided_activity"
  | "storytelling_video";
```

## Setup inicial (primera vez)

1. Crear proyecto en [supabase.com](https://supabase.com) → copiar URL y keys
2. Correr migrations 00001-00008 en orden (Supabase → SQL Editor)
3. Crear cuenta en [stripe.com](https://stripe.com)
4. Crear 2 products en Stripe: mensual y anual → copiar price IDs
5. Completar `.env.local` (ver "Variables de entorno")
6. `npm run dev`
7. Registrarse con un email → Supabase → `profiles` → cambiar `role = 'admin'`
8. Para webhooks locales: `stripe listen --forward-to localhost:3000/api/webhooks/stripe` y copiar el `whsec_...` a `STRIPE_WEBHOOK_SECRET`

## Deploy (Render)

- Tipo: Web Service, Docker, región Oregon.
- Build: el `Dockerfile` usa multi-stage (deps → builder → runner) con Next standalone output.
- **Crítico**: el `.npmrc` del proyecto fuerza `registry=https://registry.npmjs.org/`. Sin esto, Render falla en `npm ci` con 403 porque el `~/.npmrc` global de MeLi apunta a Fury (`npm.artifacts.furycloud.io`) y el runner de Render no tiene credenciales. Si regenerás `package-lock.json` localmente, siempre usar `npm install --registry=https://registry.npmjs.org/`.
- Env vars requeridas en Render (las mismas de `.env.local`, excepto `NEXT_PUBLIC_APP_URL` que apunta al dominio público).
- Puerto: Render inyecta `PORT` como env var; el Dockerfile expone 3000 pero Next standalone lee `process.env.PORT` en runtime.
- Webhook de Stripe producción: crear endpoint en Stripe Dashboard apuntando a `https://<dominio-render>/api/webhooks/stripe` y usar el `whsec_` de **ese** endpoint (distinto al local).

## Issues conocidos

- `use-user.ts` y `use-subscription.ts`: `createClient()` se llama dentro del componente sin memoización, puede generar múltiples instancias. No crítico para MVP.
- `src/app/admin/layout.tsx` **no valida role server-side** — cualquier usuario autenticado accede al shell de `/admin`. Las API routes sí validan, así que no hay escape real, pero hay que cerrar el gap con un check en el layout que redirija a `/dashboard` si `profile.role !== 'admin'`.
- Webhook de Stripe requiere HTTPS en producción; en local usar Stripe CLI.
