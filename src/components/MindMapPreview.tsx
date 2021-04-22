import { useEffect, useRef, useState } from 'react'
import * as markmap from 'markmap-view'
import { Transformer } from 'markmap-lib'
import * as React from 'react'
import { columnLayouts, IColumnLayouts } from '../models/ColumnLayouts'

type Props = {
  text: string
  columnLayout: IColumnLayouts
}

const { Markmap } = markmap
const transformer = new Transformer()

export const MindMapPreview = ({ text, columnLayout }: Props) => {
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

  return (
    <svg
      ref={mindmapSvgRef}
      width={columnLayout === columnLayouts.PREVIEW_ONLY ? 1200 : 600}
      height={650}
    />
  )
}
