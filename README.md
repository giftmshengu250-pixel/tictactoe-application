# Tic Tac Toe — Neon Corridor Edition

A React TicTacToe game with `useReducer` + `Context` state management,
built for the "JR Frontend Intern at React HQ" assignment. Theme: neon
tube-lit X/O (from the reference image) fused with a squid-game guard
palette (pink/black, floating circle-triangle-square).

## 1. Run it locally in VS Code

```bash
# 1. Open this folder in VS Code
# 2. Open a terminal in VS Code (Ctrl+` / Cmd+`) and run:
npm install
npm run dev
```

Then open the URL it prints (usually **http://localhost:5173**).

Requires **Node.js 18+**. Check with `node -v`; install from
[nodejs.org](https://nodejs.org) if needed.

## 1b. Using the menu bar (top of the game)

| Menu | What's inside |
|---|---|
| 🏠 **Main Menu** | The start screen: pick Solo (then a difficulty), Local Multiplayer or Online. Reach it again via 📊 Stats & System → Main Menu, the 🏠 Menu button, or the ◯ △ □ logo |
| 🎮 **Game Modes** | Solo / Single Player (vs computer), Local Multiplayer / Pass & Play, Online Multiplayer (opens room lobby) |
| ⚙️ **Game Settings** | Difficulty: Easy, Medium, Hard, Impossible (used in Solo mode) |
| 🛠️ **Options** | Themes / Skins: Neon (default), Dark, Light, Wooden — saved between visits |
| 📊 **Stats & System** | Scoreboard / Reset (with Clear history), Leaderboards, Help / Rules, Exit / Quit |

**To play the computer:** 🎮 Game Modes → *Solo / Single Player*, then ⚙️ Game Settings → pick a difficulty.

**Online Multiplayer (how it works here):** 🎮 Game Modes → *Online Multiplayer* → *Create room*
(you're X) and note the 4-letter code. Open the game in a **second tab/window**, choose
*Online Multiplayer → Join room*, and enter the code (you're O). This uses the browser's
`BroadcastChannel`, so it works between tabs/windows on the same browser/computer. Playing
between different computers over the internet needs a server (e.g. Socket.io, Firebase or
Supabase Realtime) — that is not included, and "Random opponent" is shown as unavailable for
the same reason. The Leaderboard is saved in the browser's localStorage.

## 2. Project structure

```
src/
  reducer/gameReducer.js   <- ALL game state logic (heavily commented)
  context/GameContext.jsx  <- Context provider + useGame() custom hook
  utils/gameLogic.js       <- win/draw rules + computer opponent & difficulty (pure functions)
  utils/leaderboard.js     <- online leaderboard saved in localStorage
  utils/storage.js         <- safe localStorage helpers
  components/
    Board.jsx, Square.jsx  <- the 3x3 grid
    StatusBar.jsx          <- "Next Player: X" / "Winner: O" / "Draw!"
    Scoreboard.jsx         <- MANUAL FEATURE: X/O/Draw score tracker
    MainMenu.jsx           <- start screen (mode + difficulty picker)
    GameMode.jsx           <- in-game Solo/Local/Online switcher + difficulty chips
    MenuBar.jsx            <- the single menu bar (modes/settings/themes/stats)
    Modal.jsx + modals/    <- Help, Scoreboard, Leaderboard, Online lobby, Exit screen
    Controls.jsx           <- Restart + Undo buttons
    MoveHistory.jsx        <- ADVANCED FEATURE: move history + time travel
    PlayerNameForm.jsx     <- rename "X"/"O" to real names (bonus)
    SquidBackground.jsx    <- decorative theme background only
  styles/index.css         <- all styling (design tokens at the top)
```

## 3. How the assignment requirements map to the code

| Requirement | Where |
|---|---|
| 3x3 board, alternating turns, no overwrite | `gameReducer.js` → `MAKE_MOVE` |
| Win detection (row/col/diagonal) | `utils/gameLogic.js` → `calculateWinner` |
| Draw detection | `utils/gameLogic.js` → `isDraw` |
| Status text | `components/StatusBar.jsx` |
| Manual feature (no AI): **Scoreboard** | `components/Scoreboard.jsx` + `RECORD_SCORE` action |
| State management: **Context + useReducer** (Option B) | `context/GameContext.jsx` + `reducer/gameReducer.js` |
| Solo vs computer (Easy → Impossible incl. minimax) | `utils/gameLogic.js` (getComputerMove) + AI effect in `GameContext.jsx` |
| Advanced feature: **Move History + Time Travel** | `components/MoveHistory.jsx` + `JUMP_TO` action |
| Restart / Undo (bonus utility) | `components/Controls.jsx` |
| Player name input (bonus) | `components/PlayerNameForm.jsx` |

The reducer is the single source of truth; components only call the
named functions returned by `useGame()` (`makeMove`, `undo`, `jumpTo`,
`reset`, `setPlayerNames`) — they never call `dispatch` directly, and
none of the display components (`Square`, `Board`) contain game rules.

## 4. Deployment (Netlify or Vercel)

Both `netlify.toml` and `vercel.json` are already included, so either
platform will build with zero extra config.

**Netlify (drag-and-drop, fastest):**
1. Run `npm run build` locally — this creates a `dist/` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag
   the `dist` folder in. You'll get a live link instantly.

**Netlify (via GitHub, recommended for the submission):**
1. Push this folder to a new GitHub repo.
2. On [netlify.com](https://netlify.com) → "Add new site" → "Import an
   existing project" → pick your repo.
3. Build command: `npm run build`, Publish directory: `dist` (already
   pre-filled by `netlify.toml`). Click Deploy.

**Vercel:**
1. Push this folder to a new GitHub repo.
2. On [vercel.com](https://vercel.com) → "Add New Project" → import the
   repo → it auto-detects Vite → Deploy.

Submit both the **live link** and the **GitHub repo link**.

## 5. Loom video checklist (must be under 4 minutes)

Record with your face visible in the corner, and cover:
1. **Gameplay demo** — play one game to a win, then play one to a draw.
2. **Manual feature** — point at the scoreboard, show it updating.
3. **State management tour** — briefly open `gameReducer.js` and
   `GameContext.jsx`, explain the action types and the custom hook.
4. **Advanced feature** — undo a couple of moves, then click an older
   entry in "Time Travel" to jump back to it.

## 6. Notes

- No `localStorage` is used, so scores reset on a full page refresh —
  that's expected behavior for this assignment scope.
- While viewing a past move (Undo / Time Travel) you can play a square
  to branch the game from that point — later moves are discarded.
- In Solo mode Undo rewinds to *your* previous turn (your move + the
  computer's reply). Undo and Time Travel are disabled in online games.
- Theme and difficulty are remembered via localStorage.
