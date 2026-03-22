import { useEffect, useRef } from 'react'

export default function useAutoScroll(dependency) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [dependency])

  return containerRef
}
