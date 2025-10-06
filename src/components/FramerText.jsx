import { motion } from "motion/react";

export default function FramerTest() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 bg-blue-500 rounded-small"
      />
    </div>
  );
}
