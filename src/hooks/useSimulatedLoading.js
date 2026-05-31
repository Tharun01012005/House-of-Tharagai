import { useEffect, useState } from 'react'

export function useSimulatedLoading(dependencies = [], duration = 1000) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    const timeoutId = window.setTimeout(() => setIsLoading(false), duration)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, dependencies)

  return isLoading
}