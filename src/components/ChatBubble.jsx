import { cn } from '../utils/cn'

export default function ChatBubble({ from, text, time }) {
  const isUser = from === 'user'

  return (
    <div className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[85%] rounded-3xl px-4 py-3 sm:max-w-[70%]',
          isUser
            ? 'rounded-br-md bg-[var(--user-bubble)] text-white'
            : 'rounded-bl-md bg-[var(--ai-bubble)] text-[var(--text)]',
        )}
      >
        <p className="text-sm leading-relaxed">{text}</p>
        <p className={cn('mt-2 text-[11px]', isUser ? 'text-emerald-100' : 'text-slate-500')}>
          {time}
        </p>
      </div>
    </div>
  )
}
