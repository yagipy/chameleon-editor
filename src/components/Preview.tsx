import { ReactElement } from 'react'
import * as React from 'react'
import { IPreviewTypes } from '../models/IPreviewTypes'
import { DefaultPreview } from './DefaultPreview'
import { MindMapPreview } from './MindMapPreview'
import { SlidePreview } from './SlidePreview'
import { IColumnLayouts } from '../models/ColumnLayouts'

type Props = {
  text: string
  type: IPreviewTypes
  columnLayout: IColumnLayouts
}
export const Preview = ({ text, type, columnLayout }: Props): ReactElement => {
  switch (type) {
    case 'DEFAULT':
      return <DefaultPreview text={text} columnLayout={columnLayout} />
    case 'MIND_MAP':
      return <MindMapPreview text={text} columnLayout={columnLayout} />
    case 'SLIDE':
      return <SlidePreview text={text} columnLayout={columnLayout} />
    default:
      return <span>not support preview type. please reload.</span>
  }
}
