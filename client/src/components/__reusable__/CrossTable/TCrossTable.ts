type TFunctionCondition = (...args: any[]) => boolean

interface MapperForCrossTable {
  elements: string[]
  attributeNameTh: string
  attributeNameTd: string
  transformFnTd: (source: string) => string
  transformFnTh: (source: string) => string
}

export { type TFunctionCondition, type MapperForCrossTable }
