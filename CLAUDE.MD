# CLAUDE.md — Dental Supplies & Equipment Distribution Website

## Project Overview

Build a professional, bilingual (French 🇫🇷 / English 🇬🇧) **Dental Supplies and Equipment Distribution** website for the Moroccan market.

**Reference competitor:** https://www.amed.ma/ — study its product categories, navigation structure, and content strategy.

---

## Tech Stack

| Layer     | Choice                                                    |
| --------- | --------------------------------------------------------- |
| Framework | **React 18** with **Vite**                                |
| Styling   | **Pure CSS** (no Tailwind, no CSS-in-JS, no UI libraries) |
| Routing   | **React Router v6**                                       |
| Language  | **i18next + react-i18next** for FR/EN switching           |
| Icons     | **react-icons**                                           |
| Forms     | Controlled components (no form libraries)                 |

---

## Project Structure

```
src/
├── assets/
│   ├── images/
│   └── icons/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── Layout.jsx
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   └── SectionTitle.jsx
│   └── sections/
│       ├── Hero.jsx
│       ├── FeaturedProducts.jsx
│       ├── Categories.jsx
│       ├── WhyUs.jsx
│       ├── Brands.jsx
│       └── ContactCTA.jsx
├── pages/
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Contact.jsx
│   └── Blog.jsx
├── i18n/
│   ├── index.js
│   ├── fr.json
│   └── en.json
├── data/
│   ├── products.js
│   ├── categories.js
│   └── brands.js
├── styles/
│   ├── variables.css      ← all CSS custom properties
│   ├── reset.css
│   ├── typography.css
│   ├── layout.css
│   ├── components.css
│   └── utilities.css
├── App.jsx
└── main.jsx
```

---

## Design System

### Color Palette

```css
:root {
  /* Primary — Deep medical blue */
  --color-primary: #0d3b6e;
  --color-primary-light: #1a5fa8;
  --color-primary-dark: #082a50;

  /* Accent — Clean teal/cyan */
  --color-accent: #00a3c4;
  --color-accent-light: #33c1dc;
  --color-accent-dark: #007a94;

  /* Neutrals */
  --color-white: #ffffff;
  --color-bg: #f4f8fc;
  --color-surface: #ffffff;
  --color-border: #dde6f0;
  --color-text: #1a2b3c;
  --color-text-muted: #6b7c93;
  --color-text-light: #a0afbf;

  /* Status */
  --color-success: #17a865;
  --color-warning: #f59e0b;
  --color-error: #e53e3e;

  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #0d3b6e 0%, #1a5fa8 100%);
  --gradient-accent: linear-gradient(135deg, #00a3c4 0%, #1a5fa8 100%);
  --gradient-hero: linear-gradient(
    135deg,
    #082a50 0%,
    #0d3b6e 60%,
    #00a3c4 100%
  );
}
```

### Typography

```css
:root {
  --font-heading: "Inter", "Segoe UI", sans-serif;
  --font-body: "Inter", "Segoe UI", sans-serif;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  --text-5xl: 3rem;

  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  --leading-tight: 1.2;
  --leading-snug: 1.4;
  --leading-normal: 1.6;
  --leading-loose: 1.8;
}
```

### Spacing & Layout

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1440px;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 3px rgba(13, 59, 110, 0.08);
  --shadow-md: 0 4px 16px rgba(13, 59, 110, 0.12);
  --shadow-lg: 0 8px 32px rgba(13, 59, 110, 0.16);
  --shadow-xl: 0 16px 48px rgba(13, 59, 110, 0.2);

  --transition-fast: 150ms ease;
  --transition-normal: 250ms ease;
  --transition-slow: 400ms ease;
}
```

---

## Pages & Sections

### 1. Home (`/`)

Sections in order:

1. **Navbar** — sticky, bilingual toggle (FR/EN), phone number, logo
2. **Hero** — full-width banner, headline, subheading, two CTAs ("Voir les produits" / "Demander un devis"), background gradient overlay with a dental/medical image
3. **Stats Bar** — 3–4 key numbers (e.g. "+500 produits", "+20 marques", "+10 ans d'expérience", "Livraison au Maroc")
4. **Product Categories** — grid of category cards (Empreintes, Endodontie, Stérilisation, Matériels, Unités de soin, etc.) with icons
5. **Featured Products** — horizontal scrollable product cards with name, brand badge, category tag, "Demander un prix" CTA
6. **Why Choose Us** — 3–4 feature blocks (Qualité certifiée, Livraison rapide, SAV dédié, Catalogue large)
7. **Our Brands** — logo strip / marquee of partner brands (GC, NSK, Ultradent, VOCO, Cavex, etc.)
8. **Contact CTA Banner** — dark background section with a call-to-action to request a quote
9. **Footer**

### 2. Products (`/products`)

- Sidebar with category filters + brand filters + search input
- Product grid (3 columns desktop, 2 tablet, 1 mobile)
- Each product card: image, name, category badge, brand, "Demander un devis" button
- URL query params for filtering: `?category=endodontie&brand=nsk`

**Product Categories (based on competitor analysis):**

- Empreintes
- Usage Unique
- Hygiène & Désinfection
- Blanchiment
- Fraise & Polissage
- Endodontie
- Restauration
- Reconstitution
- Instrumentations
- Prothèse & Laboratoire
- Matériels (Radiographie, Pièces Rotatives, Détartreurs, Moteurs, Laser Diode, CAD/CAM, Stérilisation)
- Unité de Soin (Fauteuils dentaires)

### 3. Product Detail (`/products/:id`)

- Large product image gallery
- Product name, brand, category
- Description (short + detailed)
- Features list
- "Demander un devis" form (name, email, phone, quantity, message)
- Related products section

### 4. About (`/about`)

- Company story section
- Mission & Values
- Team section (optional placeholder)
- Key numbers / milestones
- Partners / certifications logos

### 5. Services (`/services`)

Sections:

- Distribution de fournitures dentaires
- Distribution d'équipements dentaires
- Service après-vente (SAV)
- Formation & Support technique
- Livraison & Logistique

Each service: icon, title, short description, CTA.

### 6. Contact (`/contact`)

- Contact form: Nom, Email, Téléphone, Sujet (dropdown), Message
- Contact info cards: Address, Phone, Email, Hours
- Embedded Google Map placeholder (iframe or static map image)

### 7. Blog (`/blog`)

- Blog post grid with category tags, date, title, excerpt, "Lire la suite" link
- Individual post page (`/blog/:slug`)

---

## Navbar

```
[Logo]   [Accueil] [Produits ▼] [Nos Marques ▼] [Services] [À Propos] [Blog] [Contact]   [📞 Phone]  [FR | EN]
```

- **Sticky** on scroll with box-shadow added after 80px scroll
- **Mega menu** for Produits (shows category grid)
- **Language toggle** button (FR/EN) — stores preference in `localStorage`
- **Mobile**: hamburger menu with slide-in drawer
- **Top bar** (above navbar): phone, email, quick contact info

---

## Footer

```
[Logo + tagline]   [Navigation links]   [Product Categories]   [Contact Info]
[Social icons]     [© 2025 Company Name]   [Politique de confidentialité]
```

---

## Internationalisation (i18n)

Use `react-i18next`. All UI text must be in translation files.

**`src/i18n/fr.json`** (French — default language)
**`src/i18n/en.json`** (English)

Example structure:

```json
{
  "nav": {
    "home": "Accueil",
    "products": "Produits",
    "brands": "Nos Marques",
    "services": "Services",
    "about": "À Propos",
    "blog": "Blog",
    "contact": "Contact"
  },
  "hero": {
    "title": "Votre Partenaire en Fournitures Dentaires",
    "subtitle": "Distribution de matériaux et équipements dentaires de haute qualité au Maroc.",
    "cta_primary": "Voir les Produits",
    "cta_secondary": "Demander un Devis"
  },
  "common": {
    "quote_request": "Demander un Devis",
    "learn_more": "En savoir plus",
    "contact_us": "Nous Contacter"
  }
}
```

Language toggle: clicking FR/EN calls `i18n.changeLanguage('fr' | 'en')` and persists to `localStorage`.

---

## Mock Data

Create realistic placeholder data in `src/data/`:

### `products.js` — at least 20 products

```js
export const products = [
  {
    id: 1,
    name: "Alginate Kromopan",
    slug: "alginate-kromopan",
    brand: "Lascod",
    category: "empreintes",
    image: "/images/products/alginate.jpg",
    description: "Matériau d'empreinte irréversible de haute précision.",
    featured: true,
    tags: ["empreinte", "alginate"],
  },
  // ...
];
```

### `categories.js`

```js
export const categories = [
  { id: "empreintes", label: "Empreintes", icon: "FaTooth", color: "#0D3B6E" },
  {
    id: "endodontie",
    label: "Endodontie",
    icon: "FaSyringe",
    color: "#00A3C4",
  },
  // ...
];
```

### `brands.js`

```js
export const brands = [
  { id: "gc", name: "GC", logo: "/images/brands/gc.png" },
  { id: "nsk", name: "NSK", logo: "/images/brands/nsk.png" },
  { id: "ultradent", name: "Ultradent", logo: "/images/brands/ultradent.png" },
  { id: "voco", name: "VOCO", logo: "/images/brands/voco.png" },
  { id: "cavex", name: "Cavex", logo: "/images/brands/cavex.png" },
  { id: "itena", name: "Itena", logo: "/images/brands/itena.png" },
  // ...
];
```

---

## CSS Architecture

Use a **single global stylesheet** approach with CSS custom properties. No CSS Modules, no scoped styles.

File load order in `main.jsx`:

```js
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/typography.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/utilities.css";
```

### Key CSS Patterns

**Container:**

```css
.container {
  width: 100%;
  max-width: var(--container-xl);
  margin: 0 auto;
  padding: 0 var(--space-6);
}
```

**Section:**

```css
.section {
  padding: var(--space-20) 0;
}
.section--dark {
  background: var(--gradient-primary);
  color: var(--color-white);
}
.section--gray {
  background: var(--color-bg);
}
```

**Buttons:**

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-md);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  cursor: pointer;
  transition: all var(--transition-normal);
  border: 2px solid transparent;
}
.btn--primary {
  background: var(--color-primary);
  color: var(--color-white);
}
.btn--primary:hover {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}
.btn--accent {
  background: var(--color-accent);
  color: var(--color-white);
}
.btn--outline {
  background: transparent;
  border-color: var(--color-primary);
  color: var(--color-primary);
}
```

**Cards:**

```css
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition:
    box-shadow var(--transition-normal),
    transform var(--transition-normal);
  overflow: hidden;
}
.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}
```

---

## Responsive Breakpoints

```css
/* Mobile first */
/* sm: 640px */
@media (min-width: 640px) {
}

/* md: 768px */
@media (min-width: 768px) {
}

/* lg: 1024px */
@media (min-width: 1024px) {
}

/* xl: 1280px */
@media (min-width: 1280px) {
}
```

Grids:

- Product grid: `repeat(auto-fill, minmax(260px, 1fr))`
- Category grid: `repeat(auto-fill, minmax(180px, 1fr))`
- Services grid: `repeat(auto-fill, minmax(280px, 1fr))`

---

## Key UX Requirements

1. **Language toggle** persists in `localStorage` and applies on initial load
2. **Sticky navbar** — add `.scrolled` class after 80px with shadow + slight background blur
3. **Mobile menu** — full-screen overlay or side drawer, smooth open/close animation
4. **Quote request form** — validation with inline error messages, success state
5. **Products filter** — instant client-side filtering (no API calls for mock data)
6. **Smooth scroll** — `scroll-behavior: smooth` on `html`
7. **Hover states** — all interactive elements must have clear hover/focus states
8. **Loading skeletons** — use CSS skeleton animation for product cards while "loading"
9. **Back to top button** — fixed position, appears after scrolling 400px

---

## Image Placeholders

Use `https://placehold.co/` for all images during development:

- Hero background: `https://placehold.co/1440x700/0D3B6E/ffffff?text=Dental+Equipment`
- Product images: `https://placehold.co/400x400/F4F8FC/0D3B6E?text=Product`
- Brand logos: `https://placehold.co/160x80/F4F8FC/0D3B6E?text=Brand`

---

## SEO & Meta

Set up `react-helmet-async` for per-page meta tags:

```jsx
<Helmet>
  <title>DentaPro Maroc — Fournitures & Équipements Dentaires</title>
  <meta
    name="description"
    content="Distribution de matériaux et équipements dentaires de qualité au Maroc."
  />
  <html lang="fr" />
</Helmet>
```

---

## Animations & Transitions

- Use **CSS keyframes** only (no animation libraries)
- Hero text: `fadeInUp` on load
- Section entries: use `IntersectionObserver` + `.visible` class toggle + CSS `transition`
- Brand logos marquee: pure CSS `@keyframes marquee` infinite scroll
- Skeleton loading: `@keyframes shimmer` with gradient background

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  from {
    background-position: -200% 0;
  }
  to {
    background-position: 200% 0;
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
```

---

## Commands

```bash
# Install dependencies
npm install react-router-dom react-i18next i18next react-icons react-helmet-async

# Dev server
npm run dev

# Build
npm run build
```

---

## Do NOT

- Do not use Tailwind CSS, Bootstrap, MUI, Ant Design, or any CSS framework
- Do not use `styled-components`, `emotion`, or CSS-in-JS
- Do not use CSS Modules
- Do not add a real backend or API — use mock data in `src/data/`
- Do not use TypeScript — plain JavaScript (JSX) only
- Do not use `create-react-app` — use Vite only

---

## Naming Convention

- Components: `PascalCase` (e.g. `ProductCard.jsx`)
- CSS classes: `kebab-case` (e.g. `.product-card`)
- Variables/functions: `camelCase`
- Constants/data: `camelCase` exports
- Translation keys: `snake_case` nested under namespaces

---
