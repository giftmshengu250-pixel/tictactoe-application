import Modal from '../Modal'

// HelpModal.jsx — "Help / Rules": a quick guide to playing and winning.
export default function HelpModal({ onClose }) {
  return (
    <Modal title="Help / Rules" onClose={onClose}>
      <h3>How to play</h3>
      <ul>
        <li>The board is a 3×3 grid. <b>X</b> always goes first, then <b>O</b>.</li>
        <li>Click an empty square to place your mark. Filled squares can't be changed.</li>
        <li>Get <b>three in a row</b> (across, down or diagonally) to win.</li>
        <li>If all nine squares fill up with no winner, it's a <b>draw</b>.</li>
      </ul>
      <h3>Game modes</h3>
      <ul>
        <li><b>Solo:</b> you play X against the computer (O). Pick a difficulty in Game Settings.</li>
        <li><b>Local Multiplayer:</b> two people take turns on the same screen.</li>
        <li><b>Online Multiplayer:</b> create a room code and join it from a second tab/window.</li>
      </ul>
      <h3>Difficulty</h3>
      <ul>
        <li><b>Easy:</b> random moves. <b>Medium:</b> blocks and takes wins.</li>
        <li><b>Hard:</b> smart, but slips up sometimes. <b>Impossible:</b> never loses — a draw is the best you can do.</li>
      </ul>
      <h3>Tips</h3>
      <ul>
        <li>Take the centre or a corner on your first move.</li>
        <li>Use <b>Undo</b> or the <b>Time Travel</b> list to revisit earlier moves.</li>
      </ul>
    </Modal>
  )
}
