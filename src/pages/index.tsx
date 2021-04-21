import * as React from 'react'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { IPullDownCmark, usePullDownCmark } from '../hooks/usePullDownCmark'
import { Transformer } from 'markmap-lib'
import * as markmap from 'markmap-view'
import { Preview } from '../components/Preview'
import { stringToEnum } from '../lib/utils/converter'

const sampleText =
  '# Cameleon editor\n' +
  '## One Source, All Usecase.\n' +
  '- マインドマップ、スライド、Todoリストの形式に対応予定\n' +
  '- そのままPDF化、SVG化も可能\n' +
  '\n' +
  '## Feature\n' +
  '- アプリ by PWA or Electron\n' +
  '- Lint機能\n' +
  '\n' +
  '## Tech Stack\n' +
  '- [パースロジック](https://github.com/ocuto/markdown-parser)\n' +
  '  - Rustで記述=>wasmに変換=>jsで呼び出し\n' +
  '- GitHubActionsでRust=>wasmに変換&デプロイ\n'
const { Markmap } = markmap
const transformer = new Transformer()

export const previewTypes = stringToEnum(['DEFAULT', 'MIND_MAP'])

export type PreviewTypes = keyof typeof previewTypes

type PreviewSelectProps = {
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const PreviewSelect = (props: PreviewSelectProps) => {
  return (
    <select onChange={props.handleSelect}>
      {Object.keys(previewTypes).map((previewType) => {
        return <option value={previewType}>{previewType}</option>
      })}
    </select>
  )
}

const Home = (): ReactElement => {
  const [text, setText] = useState(sampleText)
  const [mark, setMark] = useState<markmap.Markmap>()
  const [currentPreviewType, setCurrentPPreviewType] = useState<PreviewTypes>(
    previewTypes.DEFAULT,
  )
  const instance: IPullDownCmark | null = usePullDownCmark()
  const { root } = transformer.transform(text)
  const mindmapSvgRef = useRef(null)

  useEffect(() => {
    if (mindmapSvgRef.current) {
      setMark(
        Markmap.create(
          (mindmapSvgRef.current as unknown) as SVGElement,
          undefined,
          root,
        ),
      )
    }
  }, [currentPreviewType])

  useEffect(() => {
    mark?.setData(root)
  }, [text])

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPPreviewType(previewTypes[event.target.value as PreviewTypes])
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
        {currentPreviewType === previewTypes.DEFAULT ? (
          <Preview text={instance?.pulldown_cmark(text) ?? ''} />
        ) : (
          <svg ref={mindmapSvgRef} width={600} height={600} />
        )}
      </div>
    </div>
  )
}

export default Home
