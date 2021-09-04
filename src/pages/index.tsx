import * as React from 'react'
import { ReactElement, useEffect, useState } from 'react'
import { Preview } from '../components/Preview'
import { IPreviewTypes, previewTypes } from '../models/IPreviewTypes'
import { PreviewSelect } from '../components/PreviewSelect'
import { ColumnsLayoutSelect } from '../components/ColumnLayoutSelect'
import { columnLayouts, IColumnLayouts } from '../models/ColumnLayouts'
import { LocalStorageKeys } from '../lib/LocalStorageKeys'

const sampleText =
  '# Cameleon editor\n' +
  '## One Source, All Usecase.\n' +
  '- マインドマップ、スライドの形式に対応\n' +
  '- そのままPDF化、SVG化も可能(予定)\n' +
  '---\n' +
  '\n' +
  '## Tech Stack\n' +
  '- [パースロジック](https://github.com/yagipy/markdown-parser)\n' +
  '  - Rustで記述=>wasmに変換=>jsで呼び出し\n' +
  '- GitHubActionsでRust=>wasmに変換&デプロイ\n' +
  '---\n' +
  '\n' +
  '## Welcome to Contribute!\n' +
  '- マークダウンパーサー: https://github.com/yagipy/markdown-parser\n' +
  '- Webクライアント: https://github.com/yagipy/chameleon-editor\n'

const Home = (): ReactElement => {
  const [text, setText] = useState('')
  const [currentPreviewType, setCurrentPPreviewType] = useState<IPreviewTypes>(
    previewTypes.DEFAULT,
  )
  const [
    currentColumnLayout,
    setCurrentColumnLayout,
  ] = useState<IColumnLayouts>(columnLayouts.TWO_COLUMNS)

  useEffect(() => {
    setText(localStorage.getItem(LocalStorageKeys.text) ?? sampleText)
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
    localStorage.setItem(LocalStorageKeys.text, event.target.value)
  }

  const handleSelectPreviewType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentPPreviewType(previewTypes[event.target.value as IPreviewTypes])
  }

  const handleSelectColumnLayout = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentColumnLayout(event.target.value as IColumnLayouts)
  }

  return (
    <div style={{ width: '90%', maxWidth: 1500, margin: '0 auto' }}>
      <div>Chameleon editor</div>
      <PreviewSelect handleSelect={handleSelectPreviewType} />
      <ColumnsLayoutSelect handleSelect={handleSelectColumnLayout} />
      <div style={{ display: 'flex' }}>
        {currentColumnLayout !== columnLayouts.PREVIEW_ONLY && (
          <textarea
            value={text}
            onChange={handleChange}
            style={
              currentColumnLayout === columnLayouts.TEXTAREA_ONLY
                ? { width: '100%', height: 650 }
                : { width: '40%', height: 650, marginRight: 100 }
            }
          />
        )}
        {currentColumnLayout !== columnLayouts.TEXTAREA_ONLY && (
          <Preview
            text={text}
            type={currentPreviewType}
            columnLayout={currentColumnLayout}
          />
        )}
      </div>
    </div>
  )
}

export default Home
