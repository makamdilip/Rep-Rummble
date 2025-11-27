import { motion } from 'framer-motion'

export function GradientMesh() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Primary gradient orb */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />

      {/* Secondary gradient orb */}
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl"
      />

      {/* Tertiary gradient orb */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] gradient-grid" />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] noise-overlay" />
    </div>
  );
}
