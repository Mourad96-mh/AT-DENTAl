# SEO Audit — AT Dental

Run a full SEO audit on the AT Dental project. Check every layer and report what's healthy, what's broken, and what's missing.

## What to audit

### 1. Technical Layer
- Read `frontend/src/components/SEO.jsx` — verify Organization schema, LocalBusiness schema, geo meta tags, OG tags, Twitter Card, canonical URL logic are all present
- Read `frontend/public/robots.txt` — confirm GPTBot, PerplexityBot, ClaudeBot, Googlebot are all allowed and Sitemap URL is correct
- Read `frontend/public/llms.txt` — confirm it exists and has company info, brands, products, contact
- Check `frontend/src/main.jsx` — confirm HelmetProvider wraps the app
- Fetch `https://at-dental-api.onrender.com/sitemap.xml` — confirm it returns XML with product URLs (slug-based), static pages, category pages, and blog posts
- Read `frontend/public/.htaccess` — confirm SPA routing rewrite rule is present

### 2. On-Page SEO — check each page has SEO component with title, description, keywords, canonical
- `frontend/src/pages/Home.jsx` — check SEO + FAQPage schema
- `frontend/src/pages/Products.jsx` — check SEO component
- `frontend/src/pages/ProductDetail.jsx` — check dynamic Product schema + BreadcrumbList
- `frontend/src/pages/About.jsx` — check SEO component
- `frontend/src/pages/Services.jsx` — check SEO component
- `frontend/src/pages/Contact.jsx` — check SEO component
- `frontend/src/pages/Blog.jsx` — check SEO component
- `frontend/src/pages/BlogPost.jsx` — check dynamic Article schema

### 3. Admin noindex
- `frontend/src/components/admin/AdminLayout.jsx` — must have `<meta name="robots" content="noindex,nofollow" />`
- `frontend/src/pages/admin/AdminLogin.jsx` — must have `<meta name="robots" content="noindex,nofollow" />`

### 4. Slug-based URLs
- Read `backend/models/Product.js` — confirm pre-save hook auto-generates slug
- Read `backend/routes/products.js` — confirm /:idOrSlug route handles both MongoDB ID and slug
- Read `frontend/src/pages/Products.jsx` — confirm normalize() uses `p.slug || p._id`
- Read `frontend/src/components/sections/FeaturedProducts.jsx` — confirm normalize() uses `p.slug || p._id`
- Read `frontend/src/pages/ProductDetail.jsx` — confirm normalize() uses `p.slug || p._id`

### 5. Dynamic Sitemap
- Read `backend/routes/sitemap.js` — confirm it queries MongoDB for products, uses slug URLs, includes static pages + categories + blog slugs
- Read `backend/server.js` — confirm `/sitemap.xml` route is registered

### 6. Blog Content
- Read `frontend/src/data/blog.js` — check: no placehold.co images, each post has titleFr/titleEn, excerptFr/excerptEn, contentFr/contentEn, slug, category, date
- Count total posts — report how many exist and list their slugs

### 7. GEO Layer (AI Search)
- Read `frontend/public/llms.txt` — verify company description, brands list, services, contact info are complete and accurate
- Confirm robots.txt allows all major AI crawlers

## Output format

Report in this structure:

```
## ✅ Healthy
- list items that are correctly implemented

## ⚠️ Issues Found
- list anything broken, missing, or incorrect with exact file + line

## 📋 Recommendations
- actionable next steps (off-site or content)
```

Be specific — if something is missing, say exactly what file and what to add.
