import * as React from 'react'
import { columnLayouts } from '../models/ColumnLayouts'

type Props = {
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ColumnsLayoutSelect = (props: Props) => {
  return (
    <div style={{ display: 'flex' }}>
      <span style={{ marginRight: 8 }}>column layout is</span>
      <select onChange={props.handleSelect}>
        {Object.keys(columnLayouts).map((columnLayout) => {
          return <option value={columnLayout}>{columnLayout}</option>
        })}
      </select>
      <span>.</span>
    </div>
  )
}
