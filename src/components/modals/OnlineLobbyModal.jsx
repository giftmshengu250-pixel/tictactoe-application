import { useState } from 'react'
import Modal from '../Modal'
import { useGame } from '../../context/GameContext'

// Random 4-character room code (no look-alike characters like 0/O, 1/I).
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const makeRoomCode = () =>
  Array.from({ length: 4 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')

// OnlineLobbyModal.jsx — create a room (you become X) or join one (you
// become O). Two tabs/windows using the same code play each other.
export default function OnlineLobbyModal({ onClose }) {
  const { online, startOnline, setMode } = useGame()
  const [joinCode, setJoinCode] = useState('')
  const supported = typeof BroadcastChannel !== 'undefined'

  const createRoom = () => startOnline(makeRoomCode(), 'X')
  const joinRoom = (e) => {
    e.preventDefault()
    const code = joinCode.trim().toUpperCase()
    if (code.length >= 3) startOnline(code, 'O')
  }
  const leaveRoom = () => setMode('local')

  const statusText = {
    waiting: online.mySymbol === 'X' ? 'Waiting for a friend to join…' : 'Looking for the room…',
    connected: `Connected — you are ${online.mySymbol}. ${online.opponentName || 'Opponent'} is in the room!`,
    disconnected: 'Your opponent left the room.',
  }[online.status]

  return (
    <Modal title="Online Multiplayer" onClose={onClose}>
      {!supported && <p className="empty">Your browser doesn't support online rooms (BroadcastChannel).</p>}

      {online.room ? (
        <div className="lobby">
          <p className="hint">Room code</p>
          <p className="lobby__code">{online.room}</p>
          <p className="lobby__status">{statusText}</p>
          {online.status === 'waiting' && online.mySymbol === 'X' && (
            <p className="hint">Open this page in a second tab, choose Online Multiplayer → Join, and enter the code.</p>
          )}
          <div className="modal__actions">
            <button className="btn" onClick={onClose}>Back to game</button>
            <button className="btn btn--reset" onClick={leaveRoom}>Leave room</button>
          </div>
        </div>
      ) : (
        <div className="lobby lobby--choices">
          <div className="lobby__card">
            <h3>Create a room</h3>
            <p className="hint">You play X and share the code.</p>
            <button className="btn btn--reset" onClick={createRoom} disabled={!supported}>Create room</button>
          </div>
          <form className="lobby__card" onSubmit={joinRoom}>
            <h3>Join a room</h3>
            <input className="input" value={joinCode} maxLength={6} placeholder="ROOM CODE"
              onChange={(e) => setJoinCode(e.target.value)} aria-label="Room code" />
            <button className="btn" type="submit" disabled={!supported || joinCode.trim().length < 3}>Join room</button>
          </form>
          <div className="lobby__card lobby__card--disabled">
            <h3>Random opponent</h3>
            <p className="hint">Matching with strangers needs a game server — not included in this front-end version.</p>
          </div>
        </div>
      )}
    </Modal>
  )
}
