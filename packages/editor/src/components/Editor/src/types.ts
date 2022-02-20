export interface StyleOption {
  height?: number | string
  width?: number | string
  margin: string
  padding: string
  background?: string
  border: string
  minHeight: string | number
}

export type NODES = string | undefined | (string | {})[]
