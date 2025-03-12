type GenericObject = { [key: string]: any }

function kebabToCamelCase(string: string): string {
  return string.replace(/-./g, (match) => match[1].toUpperCase());
}

function isObject(value: any): value is GenericObject {
  return value && typeof value === 'object' && !Array.isArray(value)
}

export default function convertLeafKeysToCamelCase(obj: GenericObject): GenericObject {
  function dfs(current: any): any {
    if (isObject(current)) {
      return Object.entries(current).reduce((acc: GenericObject, [key, value]) => {
        // 중간 노드에서는 키 변경 없이 재귀 호출
        if (isObject(value) || Array.isArray(value)) {
          acc[`.${key}`] = dfs(value)
        } else {
          // leaf 노드에서만 키를 camelCase로 변환
          const camelCaseKey = kebabToCamelCase(key)
          acc[camelCaseKey] = value
        }
        return acc
      }, {})
    }
    if (Array.isArray(current)) {
      return current.map((item) => dfs(item)) // 배열 내부 요소 처리
    }
    return current
  }

  return dfs(obj)
}
