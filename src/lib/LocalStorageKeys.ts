import { stringToEnum } from './utils/converter'
import { columnLayouts } from '../models/ColumnLayouts'

export const LocalStorageKeys = stringToEnum(['text'])

export type ILocalStorageKeys = keyof typeof LocalStorageKeys
