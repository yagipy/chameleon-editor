import { IPullDownCmark, usePullDownCmark } from '../hooks/usePullDownCmark'
import { useEffect, useState } from 'react'
import * as React from 'react'
import { columnLayouts, IColumnLayouts } from '../models/ColumnLayouts'

type Props = {
  text: string
  columnLayout: IColumnLayouts
}

export const SlidePreview = ({ text, columnLayout }: Props) => {
  const instance: IPullDownCmark | null = usePullDownCmark()
  const [slides, setSlides] = useState<string[]>(
    instance?.pulldown_cmark(text).split('<hr />') ?? [],
  )
  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setSlides(instance?.pulldown_cmark(text).split('<hr />') ?? [])
  }, [text, instance])

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  return (
    <div>
      <div style={{ display: 'flex', height: 20 }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          prev
        </button>
        <span>
          {currentPage}/{slides.length - 1}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === slides.length - 1}
        >
          next
        </button>
      </div>
      <div
        style={
          columnLayout === columnLayouts.PREVIEW_ONLY
            ? { width: 1200, height: 650, border: 'solid' }
            : { width: 600, height: 450, border: 'solid' }
        }
        dangerouslySetInnerHTML={{
          __html: slides[currentPage],
        }}
      />
    </div>
  )
}
