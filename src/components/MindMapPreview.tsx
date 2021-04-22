import { useEffect, useRef, useState } from 'react'
import * as markmap from 'markmap-view'
import { Transformer } from 'markmap-lib'
import * as React from 'react'

type Props = {
  text: string
}

const { Markmap } = markmap
const transformer = new Transformer()

export const MindMapPreview = ({ text }: Props) => {
  const [mark, setMark] = useState<markmap.Markmap>()
  const { root } = transformer.transform(text)
  const mindmapSvgRef = useRef(null)

  useEffect(() => {
    if (mindmapSvgRef.current) {
      setMark(
        Markmap.create(
          (mindmapSvgRef.current as unknown) as SVGElement,
          undefined,
          root,
        ),
      )
    }
  }, [])

  useEffect(() => {
    mark?.setData(root)
  }, [text])

  return <svg ref={mindmapSvgRef} width={600} height={600} />
}
