import { useState } from "react";
import Lid from "./Lid";
import "../App.css";

export default function GameBoard({ players, onRestart }) {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [lid, setLid] = useState([null, null, null, null, null, null]);
  const [dumpster, setDumpster] = useState([]);
  const [message, setMessage] = useState("");

  const currentPlayer = players[currentPlayerIndex];

  const rollDie = () => Math.floor(Math.random() * 6) + 1;

  const getNextPlayerIndex = (startIndex) => {
    // find the next player with dice left
    let nextIndex = (startIndex + 1) % players.length;
    while (players[nextIndex].dice <= 0) {
      nextIndex = (nextIndex + 1) % players.length;
      // safety: break if all players are out
      if (players.every((p) => p.dice <= 0)) break;
    }
    return nextIndex;
  };

  const handleRoll = () => {
    // if everyone is out, stop
    if (players.every((p) => p.dice === 0)) return;

    // if the current player has no dice, skip their turn automatically
    if (currentPlayer.dice <= 0) {
      setCurrentPlayerIndex(getNextPlayerIndex(currentPlayerIndex));
      return;
    }

    const roll = rollDie();
    setMessage(`${currentPlayer.name} rolled a ${roll}`);

    setTimeout(() => {
      setLid((prev) => {
        const newLid = [...prev];
        const index = roll - 1;

        if (!newLid[index]) {
          newLid[index] = {
            owner: currentPlayer.name,
            color: currentPlayer.color,
            roll,
          };
        } else {
          setDumpster((prev) => [...prev, { roll, owner: currentPlayer.name }]);
        }

        const allFilled = newLid.every((slot) => slot !== null);

        if (allFilled) {
          setMessage(
            `${currentPlayer.name} filled the lid and claims the dice!`
          );
          setTimeout(() => {
            // award lid dice to player
            currentPlayer.dice += newLid.length;
            newLid.fill(null);
          }, 500);
        }

        // deduct die safely
        currentPlayer.dice = Math.max(0, currentPlayer.dice - 1);

        // advance turn to the next player who still has dice
        const nextPlayer = getNextPlayerIndex(currentPlayerIndex);
        setCurrentPlayerIndex(nextPlayer);

        return newLid;
      });
    }, 500);
  };

  const activePlayers = players.filter((p) => p.dice > 0);
  const gameOver = activePlayers.length === 1;
  const winner = gameOver ? activePlayers[0] : null;

  return (
    <div className="flex flex-col items-center justify-center space-y-4 relative min-h-screen">
      {/* Reset button fixed to bottom right */}
      <button
        onClick={onRestart}
        className="fixed bottom-6 right-6 bg-red-500 px-4 py-2 rounded hover:bg-red-400 z-50"
      >
        Reset Game
      </button>
      <h1 className="text-3xl font-bold mb-2">🗑️ Dumpster Dice</h1>

      {/* Player status */}
      <div className="flex space-x-4">
        {players.map((p, i) => (
          <div
            key={i}
            className={`p-2 rounded border ${
              i === currentPlayerIndex ? "border-yellow-400" : "border-gray-700"
            } ${p.dice === 0 ? "opacity-50 scale-95" : ""}`}
            style={{ backgroundColor: p.color + "55" }}
          >
            <p className="font-bold">{p.name}</p>
            <p>Dice: {p.dice}</p>
            {p.dice === 0 && <p className="text-red-400">Eliminated</p>}
          </div>
        ))}
      </div>

      {/* Lid */}
      <Lid lid={lid} players={players} />

      {/* Controls */}
      <div className="flex space-x-4 mt-4">
        {!gameOver && (
          <button
            onClick={handleRoll}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-400"
          >
            Roll Dice ({currentPlayer.name})
          </button>
        )}
      </div>

      {/* Winner Message */}
      {gameOver && (
        <div className="mt-4 text-center">
          <p className="text-xl font-bold mb-2">
            🏆 {winner.name} wins with {winner.dice} dice left!
          </p>
          <button
            onClick={onRestart}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-400 z-50 mt-2"
          >
            Reset Game
          </button>
        </div>
      )}

      <p className="mt-2 text-gray-300">{message}</p>
    </div>
  );
}
