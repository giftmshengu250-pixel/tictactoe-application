import { useGame } from '../context/GameContext'

// Scoreboard.jsx — MANUAL FEATURE (built without AI assistance):
// tracks X wins / O wins / draws across games, kept in the reducer's
// `scores` slice so it survives board resets within the same session.
// The small "Clear" link dispatches CLEAR_SCORES (Scoreboard / Reset).
export default function Scoreboard() {
  const { scores, displayNames, clearScores } = useGame()

  return (
    <div>
      <div className="scoreboard" aria-label="Scoreboard">
        <div className="scoreboard__item scoreboard__item--x">
          <span className="scoreboard__label">{displayNames.X}</span>
          <span className="scoreboard__value">{scores.X}</span>
        </div>
        <div className="scoreboard__item scoreboard__item--draw">
          <span className="scoreboard__label">Draws</span>
          <span className="scoreboard__value">{scores.Draws}</span>
        </div>
        <div className="scoreboard__item scoreboard__item--o">
          <span className="scoreboard__label">{displayNames.O}</span>
          <span className="scoreboard__value">{scores.O}</span>
        </div>
      </div>
      <button className="link-btn" onClick={clearScores}>Clear scoreboard</button>
    </div>
  )
}
