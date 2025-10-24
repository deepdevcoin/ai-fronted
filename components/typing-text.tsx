"use client"

import { useEffect, useState } from "react"

interface TypingTextProps {
  text: string
  speed?: number
}

export function TypingText({ text, speed = 30 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    if (!text) {
      setDisplayedText("")
      return
    }

    let index = 0
    setDisplayedText("")

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <p className="text-foreground leading-relaxed whitespace-pre-wrap">
      {displayedText}
      {displayedText.length < text.length && <span className="animate-pulse">▌</span>}
    </p>
  )
}
