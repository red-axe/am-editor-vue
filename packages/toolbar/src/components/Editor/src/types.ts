import { EngineInterface } from '@aomao/engine'
export type { ChangeInterface } from '@aomao/engine'
import { Ref } from 'vue'
export interface StyleOption {
  height: number | string
  width: number | string
  margin: string
  padding: string
  background: string
  border: string
  minHeight: string | number
}

export type NODES = string | undefined | (string | {})[]

export interface Message {
  type: 'success' | 'warning' | 'error'
  msg: string
}

export interface ChangePayload {
  html: string
  json: NODES
}

export interface EditorInstance {
  engine: EngineInterface
  container: Ref<HTMLElement | null>
}
