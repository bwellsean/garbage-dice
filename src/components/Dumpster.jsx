import { motion, AnimatePresence } from "framer-motion";

export default function Dumpster({ dumpster }) {
  return (
    <div className="mt-8 p-4 bg-gray-900 rounded-xl border border-gray-700 w-full max-w-md mx-auto text-center">
      <h2 className="text-lg font-bold text-gray-300 mb-2">Dumpster</h2>

      <div className="relative h-48 overflow-hidden flex flex-wrap justify-center items-end gap-3">
        <AnimatePresence>
          {dumpster.map((die, index) => (
            <motion.div
              key={`${die.owner}-${die.roll}-${index}-${Math.random()}`}
              initial={{
                y: -200, // start higher up
                opacity: 0,
                rotate: Math.random() * -180,
                scale: 0.6,
              }}
              animate={{
                y: Math.random() * 40, // small randomized landing offset
                opacity: 1,
                rotate: Math.random() * 360,
                scale: 1,
              }}
              exit={{
                y: 200,
                opacity: 0,
                scale: 0.5,
                rotate: 180,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 10, // lower damping = bouncier
                mass: 0.5,
              }}
              className="w-12 h-12 flex items-center justify-center rounded-md shadow-md text-white font-bold"
              style={{
                backgroundColor: die.color,
                boxShadow: `0 0 12px ${die.color}`,
              }}
            >
              {die.roll}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
