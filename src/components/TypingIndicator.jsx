import { motion } from 'framer-motion'

export default function TypingIndicator() {
  const dots = [0, 1, 2]

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-[var(--ai-bubble)] px-4 py-2 text-xs text-[var(--muted)]">
      <span>AI is typing</span>
      <div className="flex items-center gap-1">
        {dots.map((dot) => (
          <motion.span
            // The delay gives each dot a gentle sequential bounce.
            key={dot}
            className="size-1.5 rounded-full bg-[var(--muted)]"
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: dot * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}
