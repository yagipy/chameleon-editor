import { ReactElement } from 'react'
import * as React from 'react'
import { IPreviewTypes } from '../models/IPreviewTypes'
import { DefaultPreview } from './DefaultPreview'
import { MindMapPreview } from './MindMapPreview'
import { SlidePreview } from './SlidePreview'

type Props = {
  text: string
  type: IPreviewTypes
}
export const Preview = ({ text, type }: Props): ReactElement => {
  switch (type) {
    case 'DEFAULT':
      return <DefaultPreview text={text} />
    case 'MIND_MAP':
      return <MindMapPreview text={text} />
    case 'SLIDE':
      return <SlidePreview text={text} />
    default:
      return <span>not support preview type. please reload.</span>
  }
}
