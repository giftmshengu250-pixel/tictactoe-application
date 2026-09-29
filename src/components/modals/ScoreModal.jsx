import Modal from '../Modal'
import { useGame } from '../../context/GameContext'

// ScoreModal.jsx — "Scoreboard / Reset": session wins, losses and ties,
// with the option to clear the history.
export default function ScoreModal({ onClose }) {
  const { scores, displayNames, mode, clearScores, reset } = useGame()
  const total = scores.X + scores.O + scores.Draws

  return (
    <Modal title="Scoreboard / Reset" onClose={onClose}>
      <p className="hint">This session · {total} game{total === 1 ? '' : 's'} played</p>
      <table className="table">
        <thead>
          <tr><th>Player</th><th>Wins</th><th>Losses</th><th>Ties</th></tr>
        </thead>
        <tbody>
          <tr><td>{displayNames.X} (X)</td><td>{scores.X}</td><td>{scores.O}</td><td>{scores.Draws}</td></tr>
          <tr><td>{displayNames.O} (O)</td><td>{scores.O}</td><td>{scores.X}</td><td>{scores.Draws}</td></tr>
        </tbody>
      </table>
      <div className="modal__actions">
        <button className="btn btn--reset" onClick={clearScores}>Clear history</button>
        <button className="btn" onClick={() => { reset(); onClose() }}>Restart board</button>
      </div>
      {mode === 'online' && <p className="hint">Online results are also added to the Leaderboard.</p>}
    </Modal>
  )
}
