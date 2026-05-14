# AlgoLab — Watch Algorithms Come Alive

Interactive web app that animates classic CS algorithms step-by-step. Built to make sorting, pathfinding, and maze generation visually (and audibly) intuitive.

> **Live demo:** _coming soon — deploy URL goes here_

---

## Features

- **Sorting Visualizer** — Bubble, Selection, Insertion, Merge, Quick, Heap, Shell, Cocktail. Watch swaps and comparisons play out on a cell grid or a bar chart, with live counts.
- **Pathfinder** — Place start/end points on a grid, draw walls, and watch BFS, DFS, Dijkstra, and A\* explore the grid in real time. Includes a maze generator.
- **Sound effects** — Toggle audible tones on sort steps. Each comparison/swap plays a short pitch mapped to the value being touched, so each algorithm has its own distinct "sound."
- **Speed control** — Pause, resume, reset, and adjust execution speed.
- **Dark / light theme** — Persisted between sessions.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript |
| Build tool | Vite |
| State | Redux Toolkit + redux-persist |
| Routing | React Router |
| Styling | SCSS modules + Tailwind |
| Audio | Web Audio API (no audio files bundled) |
| Testing | Vitest, Cypress |

---

## Run Locally

```bash
git clone https://github.com/Rahul200512/algolab.git
cd algolab
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Available scripts

```bash
npm run dev       # start dev server
npm run build     # type-check + production build
npm run preview   # preview production build
npm run test      # run unit tests (vitest)
npm run lint      # oxlint + stylelint
```

---

## Project Structure

```
src/
├── host/              # App shell — routing, theme, store wiring
├── lib/               # Shared components (navbar, footer, theme icon) and helpers
│   └── helpers/
│       └── sound.ts   # Web Audio tone generator used by the sort hook
└── apps/
    ├── sorting-visualizer/   # Sorting algorithms + visualizer UI + redux slice
    └── path-finder/          # Pathfinding algorithms + grid UI
```

The sorting and pathfinder apps each manage their own Redux slice, components, and algorithm implementations — they share only the `lib/` primitives and the host shell.

---

## Credits

Originally based on the open-source [`algo-visualizers`](https://github.com/sadanandpai/algo-visualizers) project (MIT). This fork is rebranded as AlgoLab and adds the Web Audio sound-effects feature.

---

## License

MIT
