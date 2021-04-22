import { stringToEnum } from '../lib/utils/converter'

export const columnLayouts = stringToEnum([
  'TWO_COLUMNS',
  'TEXTAREA_ONLY',
  'PREVIEW_ONLY',
])
export type IColumnLayouts = keyof typeof columnLayouts
