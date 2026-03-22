export default function TypingIndicator() {
  const dots = [0, 1, 2]

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-[var(--ai-bubble)] px-4 py-2 text-xs text-[var(--muted)]">
      <span>AI is typing</span>
      <div className="flex items-center gap-1">
        {dots.map((dot) => (
          <span
            key={dot}
            className="size-1.5 animate-pulse rounded-full bg-[var(--muted)]"
            style={{ animationDelay: `${dot * 0.18}s` }}
          />
        ))}
      </div>
    </div>
  )
}
