import { SendHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import ChatBubble from '../components/ChatBubble'
import TypingIndicator from '../components/TypingIndicator'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import useAutoScroll from '../hooks/useAutoScroll'
import { starterMessages } from '../utils/mockData'

function formatTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatPage() {
  const [messages, setMessages] = useState(starterMessages)
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
        text: `Thanks for asking. Here is a quick direction for "${latestPrompt}". I can also break this into step-by-step actions if you want.`,
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
        subtitle="Ask anything and get clear, calm guidance"
        className="flex h-[78vh] flex-col"
      >
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
            className="w-full rounded-2xl border border-[var(--stroke)] bg-white px-4 py-3 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-emerald-100"
          />
          <Button type="submit" className="inline-flex items-center gap-2 px-4">
            <SendHorizontal size={16} />
            Send
          </Button>
        </form>
      </Card>
    </div>
  )
}
