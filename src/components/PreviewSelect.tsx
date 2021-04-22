import * as React from 'react'
import { previewTypes } from '../models/IPreviewTypes'

type Props = {
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const PreviewSelect = (props: Props) => {
  return (
    <div style={{ display: 'flex' }}>
      <span style={{ marginRight: 8 }}>preview type is</span>
      <select onChange={props.handleSelect}>
        {Object.keys(previewTypes).map((previewType) => {
          return <option value={previewType}>{previewType}</option>
        })}
      </select>
      <span>.</span>
    </div>
  )
}
