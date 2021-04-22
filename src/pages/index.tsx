import * as React from 'react'
import { ReactElement, useState } from 'react'
import { Preview } from '../components/Preview'
import { IPreviewTypes, previewTypes } from '../models/IPreviewTypes'
import { PreviewSelect } from '../components/PreviewSelect'

const sampleText =
  '# Cameleon editor\n' +
  '## One Source, All Usecase.\n' +
  '- マインドマップ、スライド、Todoリストの形式に対応予定\n' +
  '- そのままPDF化、SVG化も可能\n' +
  '\n' +
  '---\n' +
  '\n' +
  '## Feature\n' +
  '- アプリ by PWA or Electron\n' +
  '- Lint機能\n' +
  '\n' +
  '---\n' +
  '\n' +
  '## Tech Stack\n' +
  '- [パースロジック](https://github.com/ocuto/markdown-parser)\n' +
  '  - Rustで記述=>wasmに変換=>jsで呼び出し\n' +
  '- GitHubActionsでRust=>wasmに変換&デプロイ\n' +
  '\n' +
  '---'

const Home = (): ReactElement => {
  const [text, setText] = useState(sampleText)
  const [currentPreviewType, setCurrentPPreviewType] = useState<IPreviewTypes>(
    previewTypes.DEFAULT,
  )

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPPreviewType(previewTypes[event.target.value as IPreviewTypes])
  }

  return (
    <div style={{ width: '90%', maxWidth: 1500, margin: '0 auto' }}>
      <div>Chameleon editor</div>
      <PreviewSelect handleSelect={handleSelect} />
      <div style={{ display: 'flex' }}>
        <textarea
          value={text}
          onChange={handleChange}
          style={{ width: 500, height: 500, marginRight: 100 }}
        />
        <Preview text={text} type={currentPreviewType} />
      </div>
    </div>
  )
}

export default Home
