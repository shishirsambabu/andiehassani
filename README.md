# Andie Hassani — Business Coaching

A bespoke, multi-page professional website for Andie Hassani, built with
Next.js and designed for deployment on Vercel.

## Pages and features

- Editorial home page and founder story
- Coaching services and signature method
- Interactive clarity audit
- Searchable insights library with article pages
- Consultation brief builder
- SEO metadata, structured data, sitemap, robots, and social sharing image
- Responsive navigation and accessible interaction states

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run lint
npm run build
```

## Deployment

The project is configured as a standard Next.js application for Vercel. Vercel
automatically supplies the production host used for canonical URLs and sitemap
generation. To override it, set `NEXT_PUBLIC_SITE_URL` to the complete public
URL, including `https://`.
