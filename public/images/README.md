# Image Replacement Guide

All images on the site are loaded from this folder. To replace a sample image with your own, just **drop a new file at the same path with the same filename**. The site will pick it up automatically.

## File map

| Path | Used in section | What it should be | Recommended dimensions |
|---|---|---|---|
| `tech/passcoder.jpg` | Tech (Passcoder card) | Identity / authentication / security UI | 1600 × 1200 (4:3) |
| `tech/fast-fast.jpg` | Tech (Fast Fast card) | Logistics, delivery rider, package, route | 1600 × 1200 (4:3) |
| `media/light-design.jpg` | Media (Light design) | Stage lighting / event lighting installation | 1600 × 1200 (4:3) |
| `media/ai-video.jpg` | Media (AI video creations) | Cinematic still, abstract, AI-rendered look | 1200 × 1200 (1:1) |
| `media/design-advert.jpg` | Media (Design and advert creation) | Poster, billboard, campaign creative — drop your own AI-generated piece here | 1920 × 1080 (16:9) |
| `publicity/allstar-ensemble.jpg` | Publicity (Allstar Ensemble case) | Concert / youth performance / event hero | 1600 × 1200 (4:3) |
| `founder/portrait.jpg` | Founder section | Founder portrait, vertical 3:4 framing | 1200 × 1600 (3:4) |

## Notes

- **Format**: JPG is fine for photos. Use PNG only if transparency matters. WebP or AVIF are smaller but JPG is the safe default.
- **Filename**: keep the exact filename when replacing. If you want to change extensions (e.g. JPG → WebP) you'll need to also update the `<img src="…">` reference in the matching `src/components/sections/*.astro` file.
- **Size**: aim for ~1600px on the longest edge. Anything larger is a waste; smaller may look soft on retina screens.
- **Compression**: target ~150–400 KB per image. Anything above 1 MB will hurt page-load on mobile.

## Logo and favicon

Live at the public root (not in this folder):

- `/public/logo.png` — used in nav and footer
- `/public/favicon.svg`, `/public/favicon.ico` — browser tab icon

Replace those at the top level if you want a different logo or favicon.

## Future: per-project case-study images

When you flesh out the case studies (e.g. a `/work/passcoder` page), it's worth creating subfolders here like `tech/passcoder/01-cover.jpg`, `tech/passcoder/02-flow.jpg`, etc. Keep the section/topic pattern.
