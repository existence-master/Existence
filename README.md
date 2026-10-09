# Existence

The website of [Existence](https://existence.technology). Technology at the frontiers of tomorrow.

## What is on the page

Four beats, in order:

1. **Hero.** The word EXISTENCE painted onto a texture and warped by a liquid shader that ripples under the cursor.
2. **Vision.** The page turns to paper. "Technology at the frontiers of tomorrow" rises line by line, with an outlined marquee underneath.
3. **Sentient.** Our flagship, [a personal AI assistant that runs on your own computer](https://github.com/existence-master/sentient). The name pours from outline to solid as you scroll.
4. **Contact.** Two doors: mail and GitHub.

## Stack

Next.js 16 (App Router), React 19, Tailwind CSS 4, React Three Fiber, Motion, Lenis.

## Run it

```bash
npm install
npm run dev
```

Then open the URL the dev server prints. `npm run build` makes the production build and `npm start` serves it.

## Layout

```
app/
  layout.js        fonts, metadata, grain
  page.js          renders the site
  providers.js     smooth scrolling (Lenis)
  globals.css      theme tokens, theme flip, type classes
  sentient/        redirect to the Sentient repository
components/
  home/
    Site.jsx       preloader, cursor, nav, the four sections
    Hero.jsx       Vision.jsx  Sentient.jsx  Contact.jsx
    Nav.jsx        Preloader.jsx
    ui.jsx         cursor, magnetic wrapper, rise lines, marquee, theme hook
  three/
    LiquidWord.jsx the hero shader
public/            the ring mark, the Sentient mark, favicon
```

## Contact

- GitHub: [github.com/existence-master](https://github.com/existence-master)
- Mail: existence.master@gmail.com
