# Revista Norte

Plataforma editorial en Astro + Tailwind + Sanity para una revista con edición impresa y contenido digital.

## Requisitos

- Node.js 22+
- pnpm 9+

## Instalación local

```bash
pnpm install
cp .env.example .env
pnpm dev
```

## Variables de entorno

Crea un archivo `.env` con:

```bash
PUBLIC_SANITY_PROJECT_ID=your_project_id
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-01-01
PUBLIC_SITE_URL=https://example.com
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

Si no hay un proyecto de Sanity configurado, la web usa datos de demostración y muestra un estado funcional sin romper la experiencia.

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
```

## Estructura principal

- `src/pages`: rutas públicas del sitio
- `src/components`: bloques reutilizables de la interfaz
- `src/lib`: datos de ejemplo y helpers de Sanity
- `sanity/`: esquemas editoriales del CMS

## CMS editorial

La configuración de Sanity incluye esquemas base para:

- Article
- Issue
- Author
- Video
- SocialPost
- Category
- editorialConfig

La publicación del contenido se realiza desde Sanity y no requiere cambiar el código de la web.

## Despliegue

Se recomienda desplegar el sitio en Vercel o Netlify, añadiendo las variables de entorno del proyecto de Sanity y apuntando `PUBLIC_SITE_URL` al dominio real.
