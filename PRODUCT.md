# Product

## Register

brand

## Users

A potential client — a Nigerian business owner, event organiser, or startup founder — opening the site on mobile during business hours, deciding in under 30 seconds whether Aktina Prime is credible enough to contact. They are not browsing leisurely. They are triaging between Aktina and whoever else they have been recommended, in the middle of a working day, on a phone held in one hand.

## Product Purpose

A portfolio site for Aktina Prime Global Services Limited — a Nigerian tech, media, and publicity company. The site's job is to show the work: products built (Passcoder, Fast Fast), campaigns executed (Allstar Ensemble), media produced (light design, 3D pre-vis, AI video, Dubai Tour). Success is the visitor initiating contact within one session. The site does not explain what Aktina does; the work explains it.

## Brand Personality

Bold, editorial, authoritative. The voice is confident and declarative, never aspirational. No "we are passionate about", no "our mission is to". The tone is that of a studio whose work speaks for itself, where the copy gets out of the way of the output. The studio is multi-disciplinary by design — tech, media, and publicity sit as peers, not as "creative + engineering" split.

## Anti-references

- Wix / Squarespace template sites — generic, boxy layouts, stock-photo-heavy, predictable hero + three-cards + testimonials.
- Bright-white SaaS dashboards in the Notion / Monday.com / Asana register — wrong surface type entirely.
- Stock photography of teams smiling at laptops.
- Hero-metric templates — "300+ clients served", "98% satisfaction", gradient number over supporting stats.
- Generic agency clichés — "we craft experiences", "we tell your story", parallax paragraphs about values.
- Neon-on-black crypto / gaming aesthetic — wrong vocabulary for a multi-disciplinary studio.

## Design Principles

1. **Show the work, not the pitch.** Case studies are the product. The homepage is an index of proof, not a sales letter. If a section is about Aktina rather than from Aktina, cut it.
2. **Credibility in the first viewport.** A mobile visitor in working hours decides in three seconds whether to stay. The opening frame must carry that weight alone — no warmup, no "welcome to Aktina Prime", no scroll-hint.
3. **Editorial confidence over decorative flourish.** Monochrome canvas, enormous display type, lavish section spacing. The red accent is a single word of brand — not a treatment applied everywhere. When in doubt, take something away.
4. **Motion with intent.** Every animation is a directorial decision: it reveals structure, establishes hierarchy, or punctuates a transition. Slow, decisive exponential ease-outs. Nothing loops, nothing decorates, nothing exists because framer-motion was available.
5. **Mobile is the main stage.** Desktop is the secondary audience. If the composition does not hold on a 390-wide screen held in one hand in daylight, the composition is wrong.

## Accessibility & Inclusion

- Target WCAG 2.2 AA.
- Honour `prefers-reduced-motion`: replace motion with instant state changes, not shorter motion.
- Body text maintains ≥4.5:1 contrast (Inter at `#242424` on white exceeds this by a wide margin).
- The red accent (`#E63946`) is validated at body-text sizes against white; it sits near the WCAG AA threshold for small text, so it is not used as primary body colour. Reserved for CTAs, accent punctuation, and section-number glyphs where size > 18pt or weight ≥ bold.
- Focus states are visible on every interactive element (never `outline: none` without a replacement).
- No information conveyed by colour alone.
- Minimum 44×44px touch targets on interactive elements.
