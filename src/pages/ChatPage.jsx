import { SendHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ChatBubble from '../components/ChatBubble'
import TypingIndicator from '../components/TypingIndicator'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import useAuth from '../hooks/useAuth'
import EmptyState from '../components/ui/EmptyState'
import useAutoScroll from '../hooks/useAutoScroll'
import { chatQuickPrompts, generateAiResponse } from '../utils/mockData'

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function getStarterMessage(name) {
  const firstName = name?.split(' ')[0] || 'there'

  return [
    {
      id: 1,
      from: 'ai',
      text: `Hey ${firstName}, I am here to help. You can ask me about exams, fees, timetable, or any campus process.`,
      time: 'Now',
    },
  ]
}

export default function ChatPage() {
  const { user } = useAuth()
  const [messages, setMessages] = useState(() => getStarterMessage(user?.name))
  const [prompt, setPrompt] = useState('')
  const [typing, setTyping] = useState(false)

  const scrollRef = useAutoScroll(messages)
  const hasMessages = useMemo(() => messages.length > 0, [messages])

  const handleSend = (event) => {
    event.preventDefault()

    const cleanPrompt = prompt.trim()
    if (!cleanPrompt) {
      return
    }

    const userMessage = {
      id: Date.now(),
      from: 'user',
      text: cleanPrompt,
      time: formatTime(),
    }

    setMessages((prev) => [...prev, userMessage])
    setPrompt('')
    setTyping(true)
  }

  useEffect(() => {
    if (!typing) {
      return
    }

    const timeout = setTimeout(() => {
      const latestPrompt = messages[messages.length - 1]?.text || 'that question'

      const aiMessage = {
        id: Date.now() + 1,
        from: 'ai',
        text: generateAiResponse(latestPrompt),
        time: formatTime(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setTyping(false)
    }, 1100)

    return () => clearTimeout(timeout)
  }, [typing, messages])

  return (
    <div className="mx-auto max-w-4xl">
      <Card
        title="Student Support Chat"
        subtitle="Ask anything and get clear, calm guidance with realistic next steps"
        className="flex h-[78vh] flex-col"
      >
        <div className="mb-4 flex flex-wrap gap-2">
          {chatQuickPrompts.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setPrompt(item)}
              className="rounded-full border border-[var(--stroke)] bg-white px-3 py-1.5 text-xs text-[var(--text)] transition hover:bg-[var(--brand-soft)]"
            >
              {item}
            </button>
          ))}
        </div>

        <div ref={scrollRef} className="mb-4 flex-1 space-y-3 overflow-y-auto pr-1">
          {!hasMessages && (
            <EmptyState
              title="Your conversation is empty"
              message="Try asking about exam dates, fee deadlines, or timetable issues."
            />
          )}

          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              from={message.from}
              text={message.text}
              time={message.time}
            />
          ))}

          {typing && <TypingIndicator />}
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask anything about exams, fees, or timetable..."
            className="w-full rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-slate-400 focus:border-[var(--brand)] focus:ring-4 focus:ring-emerald-100"
          />
          <Button type="submit" className="px-4" disabled={!prompt.trim() || typing}>
            <SendHorizontal size={16} />
            Send
          </Button>
        </form>
      </Card>
    </div>
  )
}
