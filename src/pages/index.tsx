import * as React from 'react'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { Preview } from '../components/Preview'
import { IPreviewTypes, previewTypes } from '../models/IPreviewTypes'
import { PreviewSelect } from '../components/PreviewSelect'
import { ColumnsLayoutSelect } from '../components/ColumnLayoutSelect'
import { columnLayouts, IColumnLayouts } from '../models/ColumnLayouts'

const sampleText =
  '# Cameleon editor\n' +
  '## One Source, All Usecase.\n' +
  '- マインドマップ、スライド、Todoリストの形式に対応予定\n' +
  '- そのままPDF化、SVG化も可能\n' +
  '---\n' +
  '\n' +
  '## Feature\n' +
  '- アプリ by PWA or Electron\n' +
  '- Lint機能\n' +
  '---\n' +
  '\n' +
  '## Tech Stack\n' +
  '- [パースロジック](https://github.com/ocuto/markdown-parser)\n' +
  '  - Rustで記述=>wasmに変換=>jsで呼び出し\n' +
  '- GitHubActionsでRust=>wasmに変換&デプロイ\n' +
  '---\n' +
  '\n' +
  '## Welcome to Contribute!\n' +
  '- マークダウンパーサー: https://github.com/ocuto/markdown-parser\n' +
  '- Webクライアント: 近日公開\n'

const Home = (): ReactElement => {
  const [text, setText] = useState(sampleText)
  const [currentPreviewType, setCurrentPPreviewType] = useState<IPreviewTypes>(
    previewTypes.DEFAULT,
  )
  const [
    currentColumnLayout,
    setCurrentColumnLayout,
  ] = useState<IColumnLayouts>(columnLayouts.TWO_COLUMNS)
  const [fileHandle, setFileHandle] = useState()

  const handleChange = async (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setText(event.target.value)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const writable = await fileHandle.createWritable()
    await writable.write(event.target.value)
    await writable.close()
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

  const readFileContent = async (files: FileList | null) => {
    // if (!files) {
    //   return
    // }
    // setText(await files[0].text())
    const options = {
      types: [
        {
          description: 'Text Files',
          accept: {
            'text/plain': ['.txt', '.text'],
          },
        },
      ],
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [handle] = await window.showOpenFilePicker()
    const file = await handle.getFile()
    const text = await file.text()
    setText(text)
    setFileHandle(handle)
  }

  return (
    <div style={{ width: '90%', maxWidth: 1500, margin: '0 auto' }}>
      <div>Chameleon editor</div>
      <PreviewSelect handleSelect={handleSelectPreviewType} />
      <ColumnsLayoutSelect handleSelect={handleSelectColumnLayout} />
      {/*<input type={"file"} onChange={event => readFileContent(event.target.files)} multiple={true}/>*/}
      <button onClick={() => readFileContent(null)}>
        ローカルファイルを選択
      </button>
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
