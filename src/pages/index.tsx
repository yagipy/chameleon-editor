import * as React from 'react'
import { ReactElement, useState } from 'react'
import { pulldown_cmark } from 'markdown-parser'
import { IPullDownCmark, usePullDownCmark } from '../hooks/usePullDownCmark'
// let wasmContainer: { pulldown_cmark: typeof pulldown_cmark }
// import('../../markdown-parser/pkg').then((wasm) => (wasmContainer = wasm))

const sampleText =
  '# Cameleon editor\n' +
  '## One Source, All Usecase.\n' +
  '- マインドマップ、スライド、Todoリストの形式に対応予定\n' +
  '  - そのままPDF化、SVG化も可能\n' +
  '\n' +
  '## Feature\n' +
  '- アプリ by PWA or Electron\n' +
  '- Lint機能\n' +
  '- \n' +
  '\n' +
  '## Tech Stack\n' +
  '- パースロジックをRustで記述=>wasmに変換=>jsで呼び出し\n' +
  '  - パースロジック: https://github.com/ocuto/markdown-parser\n' +
  '- GitHubActionsでRust=>wasmに変換&デプロイ\n'

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

const Home = (): ReactElement => {
  const [text, setText] = useState(sampleText)
  const instance: IPullDownCmark | null = usePullDownCmark()

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  return (
    <div style={{ width: '80%', maxWidth: 1300, margin: '0 auto' }}>
      <div>Chameleon editor</div>
      <div style={{ display: 'flex' }}>
        <textarea
          value={text}
          onChange={handleChange}
          style={{ width: 500, height: 500, marginRight: 100 }}
        />
        <Preview text={instance?.pulldown_cmark(text) ?? ''} />
      </div>
    </div>
  )
}

export default Home
