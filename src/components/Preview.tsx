import { ReactElement } from 'react'
import * as React from 'react'

type Props = {
  text: string
}
export const Preview = ({ text }: Props): ReactElement => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  )
}
