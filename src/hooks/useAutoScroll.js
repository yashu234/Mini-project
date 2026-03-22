import { useEffect, useRef } from 'react'

export default function useAutoScroll(dependency) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }, [dependency])

  return containerRef
}
