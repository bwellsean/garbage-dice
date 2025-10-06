import { useState } from "react";

export default function SetupScreen({ onStart }) {
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([
    { name: "", color: "#3498db" },
    { name: "", color: "#e74c3c" },
  ]);
  const [openPickerIndex, setOpenPickerIndex] = useState(null);

  const handleNumPlayersChange = (e) => {
    const value = parseInt(e.target.value);
    setNumPlayers(value);
    const newPlayers = Array(value)
      .fill()
      .map((_, i) => players[i] || { name: "", color: getDefaultColor(i) });
    setPlayers(newPlayers);
  };

  const getDefaultColor = (i) => {
    const colors = [
      "#e74c3c",
      "#e67e22",
      "#f1c40f",
      "#2ecc71",
      "#3498db",
      "#9b59b6",
      "#ff69b4",
    ];
    return colors[i % colors.length];
  };

  const handlePlayerChange = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const handleColorSelect = (index, color) => {
    handlePlayerChange(index, "color", color);
    setOpenPickerIndex(null); // close the menu after choosing
  };

  const handleStart = () => {
    const filteredPlayers = players.map((p, i) => ({
      name: p.name || `Player ${i + 1}`,
      color: p.color,
      dice: 20,
    }));
    onStart(filteredPlayers);
  };

  const colorOptions = [
    { name: "Red", hex: "#e74c3c" },
    { name: "Orange", hex: "#e67e22" },
    { name: "Yellow", hex: "#f1c40f" },
    { name: "Green", hex: "#2ecc71" },
    { name: "Blue", hex: "#3498db" },
    { name: "Purple", hex: "#9b59b6" },
    { name: "Pink", hex: "#ff69b4" },
  ];

  return (
    <div className="setup-screen flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">🗑️ Trash Can Dice Game</h1>

      <label className="mb-2">
        Number of Players:
        <select
          value={numPlayers}
          onChange={handleNumPlayersChange}
          className="ml-2 bg-gray-800 border border-gray-600 p-1 rounded"
        >
          {[2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>

      <div className="space-y-3 mb-6">
        {players.map((p, i) => (
          <div
            key={i}
            className="relative flex items-center space-x-2 bg-gray-800 p-2 rounded"
          >
            <input
              type="text"
              placeholder={`Player ${i + 1} Name`}
              value={p.name}
              onChange={(e) => handlePlayerChange(i, "name", e.target.value)}
              className="p-1 rounded bg-gray-700 border border-gray-600 text-white"
            />

            {/* Color button */}
            <button
              onClick={() =>
                setOpenPickerIndex(openPickerIndex === i ? null : i)
              }
              className="w-8 h-8 rounded border border-gray-400"
              style={{ backgroundColor: p.color }}
              title="Choose color"
            ></button>

            {/* Custom color menu */}
            {openPickerIndex === i && (
              <div className="absolute top-12 left-0 bg-gray-800 border border-gray-600 rounded p-2 flex space-x-1 z-10">
                {colorOptions.map((c) => (
                  <button
                    key={c.hex}
                    onClick={() => handleColorSelect(i, c.hex)}
                    className="w-6 h-6 rounded-full border border-gray-700 hover:scale-110 transition-transform"
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleStart}
        className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-400"
      >
        Start Game
      </button>
    </div>
  );
}
