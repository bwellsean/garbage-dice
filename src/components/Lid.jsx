import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Lid({ lid, players = [] }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6 bg-lid p-4 rounded-2xl">
      {lid.map((slot, i) => (
        <LidSlot key={i} slot={slot} index={i} />
      ))}
    </div>
  );
}

// Individual slot (with flash animation logic)
function LidSlot({ slot, index }) {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (slot) {
      setFlash(true);
      const timeout = setTimeout(() => setFlash(false), 700); // a bit longer for fade
      return () => clearTimeout(timeout);
    }
  }, [slot]);

  return (
    <div className="relative w-20 h-20 flex items-center justify-center border border-gray-600 rounded-xl bg-gray-800 overflow-hidden">
      {!slot && (
        <span className="text-gray-500 text-xl font-bold">{index + 1}</span>
      )}

      <AnimatePresence>
        {slot && (
          <motion.div
            key={slot.owner + index}
            initial={{ scale: 0.3, opacity: 0, rotate: -30 }}
            animate={{ scale: 1.1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 8 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl shadow-lg"
            style={{
              backgroundColor: slot.color,
              boxShadow: `0 0 15px ${slot.color}`,
            }}
          >
            {/* Smooth fading glow overlay */}
            {flash && (
              <motion.div
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 1.4 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `radial-gradient(circle, ${slot.color}66 0%, transparent 70%)`,
                  filter: "blur(6px)",
                }}
              />
            )}

            <span className="text-2xl font-bold text-white z-10">
              {slot.roll}
            </span>
            <span className="text-sm uppercase opacity-75 mt-1 z-10">
              {getInitials(slot.owner)}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
