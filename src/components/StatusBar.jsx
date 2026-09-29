import { useGame } from '../context/GameContext'

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

// StatusBar.jsx — shows "Next Player: X" / "Winner: O" / "Draw!"
// plus a small chip telling you which mode you're in.
export default function StatusBar() {
  const {
    winner, isDraw, currentPlayer, displayNames, isViewingLatest, step, history,
    mode, difficulty, online, isComputerThinking,
  } = useGame()

  const modeLabel =
    mode === 'solo' ? `Solo · ${cap(difficulty)}` : mode === 'online' ? `Online · Room ${online.room}` : 'Local Multiplayer'

  let statusText
  let statusClass = 'status'
  let subNote = null

  if (winner) {
    statusText = `Winner: ${displayNames[winner]}`
    statusClass += ' status--winner'
  } else if (isDraw) {
    statusText = 'Draw!'
    statusClass += ' status--draw'
  } else if (mode === 'online' && online.status !== 'connected') {
    statusText = online.status === 'waiting' ? 'Waiting for opponent…' : 'Opponent left the room'
    statusClass += ' status--draw'
    if (online.status === 'waiting') subNote = `Share room code ${online.room} — open it in a second tab.`
  } else {
    statusText = `Next Player: ${displayNames[currentPlayer]}`
    statusClass += currentPlayer === 'X' ? ' status--x' : ' status--o'
    if (isComputerThinking) subNote = 'Computer is thinking…'
    else if (mode === 'online') subNote = currentPlayer === online.mySymbol ? 'Your turn' : "Opponent's turn"
  }

  return (
    <div className="status-wrap">
      <span className="mode-chip">{modeLabel}</span>
      <p className={statusClass}>{statusText}</p>
      {subNote && <p className="status-subnote">{subNote}</p>}
      {!isViewingLatest && (
        <p className="status-subnote">
          Viewing move {step} of {history.length - 1} — play a square to branch from here.
        </p>
      )}
    </div>
  )
}
