import { useEffect, useState } from 'react'
import { pulldown_cmark } from 'markdown-parser'

export type IPullDownCmark = {
  pulldown_cmark: typeof pulldown_cmark
}

export const usePullDownCmark = () => {
  const [state, setState] = useState<IPullDownCmark | null>(null)
  useEffect(() => {
    ;(async () => {
      const wasmContainer = await import('markdown-parser')
      setState(wasmContainer)
    })()
  }, [])
  return state
}
