import { stringToEnum } from '../lib/utils/converter'

export const previewTypes = stringToEnum(['DEFAULT', 'MIND_MAP', 'SLIDE'])
export type IPreviewTypes = keyof typeof previewTypes
