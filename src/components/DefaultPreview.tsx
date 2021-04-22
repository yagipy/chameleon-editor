import { ReactElement } from 'react'
import * as React from 'react'
import { IPullDownCmark, usePullDownCmark } from '../hooks/usePullDownCmark'
import { columnLayouts, IColumnLayouts } from '../models/ColumnLayouts'

type Props = {
  text: string
  columnLayout: IColumnLayouts
}
export const DefaultPreview = ({ text, columnLayout }: Props): ReactElement => {
  const instance: IPullDownCmark | null = usePullDownCmark()

  return (
    <div
      style={{
        width: `${columnLayout === columnLayouts.PREVIEW_ONLY ? '90%' : '40%'}`,
      }}
      dangerouslySetInnerHTML={{
        __html: instance?.pulldown_cmark(text) ?? '',
      }}
    />
  )
}
