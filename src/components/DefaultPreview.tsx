import { ReactElement } from 'react'
import * as React from 'react'
import { IPullDownCmark, usePullDownCmark } from '../hooks/usePullDownCmark'

type Props = {
  text: string
}
export const DefaultPreview = ({ text }: Props): ReactElement => {
  const instance: IPullDownCmark | null = usePullDownCmark()

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: instance?.pulldown_cmark(text) ?? '',
      }}
    />
  )
}
