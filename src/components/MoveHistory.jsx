import { useGame } from '../context/GameContext'

// MoveHistory.jsx — ADVANCED FEATURE: "Move History + Time Travel".
// Renders one entry per snapshot in `history`. Clicking an entry calls
// jumpTo(step), which just moves the reducer's `step` pointer — no
// board data is thrown away until you play a new move from the past.
export default function MoveHistory() {
  const { history, step, jumpTo, mode } = useGame()
  const locked = mode === 'online' // can't rewind a shared online game

  return (
    <div className="move-history" aria-label="Move history">
      <h3 className="move-history__title">Time Travel</h3>
      <ol className="move-history__list">
        {history.map((_, moveIndex) => {
          const label = moveIndex === 0 ? 'Game start' : `Move #${moveIndex}`
          const isCurrent = moveIndex === step
          return (
            <li key={moveIndex}>
              <button
                className={`move-history__btn ${isCurrent ? 'move-history__btn--active' : ''}`}
                onClick={() => jumpTo(moveIndex)}
                disabled={locked}
              >
                {label}
              </button>
            </li>
          )
        })}
      </ol>
      {locked && <p className="hint">Disabled during online games.</p>}
    </div>
  )
}
