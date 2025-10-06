// src/components/PlayerPanel.jsx
import React from "react";

function PlayerPanel({ player, active }) {
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded border ${
        active ? "ring-2 ring-offset-1" : ""
      }`}
      style={{ minWidth: 180 }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
        style={{ backgroundColor: player.color }}
      >
        {initials}
      </div>
      <div className="text-left">
        <div className="text-sm font-medium">
          {player.name}{" "}
          {active && <span className="text-xs text-gray-600">— your turn</span>}
        </div>
        <div className="text-xs text-gray-600">Dice: {player.dice}</div>
      </div>
    </div>
  );
}

export default PlayerPanel;
