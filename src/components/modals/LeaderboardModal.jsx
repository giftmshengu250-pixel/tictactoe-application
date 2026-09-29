import { useState } from 'react'
import Modal from '../Modal'
import { clearLeaderboard, loadLeaderboard } from '../../utils/leaderboard'

// LeaderboardModal.jsx — top players from online games, ranked by wins.
// Data lives in this browser's localStorage (see utils/leaderboard.js).
export default function LeaderboardModal({ onClose }) {
  const [rows, setRows] = useState(() => loadLeaderboard())

  const handleClear = () => {
    clearLeaderboard()
    setRows([])
  }

  return (
    <Modal title="Leaderboards" onClose={onClose}>
      <p className="hint">Online multiplayer rankings (saved in this browser).</p>
      {rows.length === 0 ? (
        <p className="empty">No online games yet. Create or join a room from Game Modes → Online Multiplayer.</p>
      ) : (
        <table className="table">
          <thead>
            <tr><th>#</th><th>Player</th><th>W</th><th>L</th><th>D</th></tr>
          </thead>
          <tbody>
            {rows.slice(0, 10).map((r, i) => (
              <tr key={r.name}><td>{i + 1}</td><td>{r.name}</td><td>{r.wins}</td><td>{r.losses}</td><td>{r.draws}</td></tr>
            ))}
          </tbody>
        </table>
      )}
      {rows.length > 0 && (
        <div className="modal__actions">
          <button className="btn" onClick={handleClear}>Clear leaderboard</button>
        </div>
      )}
    </Modal>
  )
}
