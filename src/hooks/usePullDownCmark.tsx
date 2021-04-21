import { useEffect, useState } from 'react'
import { pulldown_cmark } from 'markdown-parser'

export type IPullDownCmark = {
  pulldown_cmark: typeof pulldown_cmark
}

export const usePullDownCmark = () => {
  const [state, setState] = useState<IPullDownCmark | null>(null)
  useEffect(() => {
    const loadWasm = async () => {
      const wasmContainer = await import('markdown-parser')
      setState(wasmContainer)
    }
    loadWasm()
  }, [])
  return state
}
