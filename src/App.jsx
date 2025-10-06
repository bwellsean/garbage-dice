import { useState } from "react";
import SetupScreen from "./components/SetupScreen";
import GameBoard from "./components/GameBoard";

function App() {
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = (playerData) => {
    setPlayers(playerData);
    setGameStarted(true);
  };

  const handleRestart = () => {
    setPlayers([]);
    setGameStarted(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {!gameStarted ? (
        <SetupScreen onStart={handleStartGame} />
      ) : (
        <GameBoard players={players} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
