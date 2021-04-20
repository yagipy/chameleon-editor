import * as React from 'react'
import { pulldown_cmark } from '../../markdown-parser/pkg'
import { ReactElement, useState } from 'react'

let wasmContainer: { pulldown_cmark: typeof pulldown_cmark }
import('../../markdown-parser/pkg').then((wasm) => (wasmContainer = wasm))

type Props = {
  text: string
}

const Preview = ({ text }: Props): ReactElement => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text,
      }}
    />
  )
}

export default (): ReactElement => {
  const [text, setText] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  return (
    <>
      <div>Chameleon editor</div>
      <div style={{ display: 'flex' }}>
        <textarea
          value={text}
          onChange={handleChange}
          style={{ width: 500, height: 500, marginRight: 100 }}
        />
        <Preview text={wasmContainer?.pulldown_cmark(text)} />
      </div>
    </>
  )
}
