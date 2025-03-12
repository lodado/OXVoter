import react, { Children, cloneElement, isValidElement, ReactNode } from 'react'

const processNode = (node: ReactNode, fillOverwrite?: string): ReactNode => {
  if (!isValidElement(node)) return node

  let newProps = {}
  if (node.props.fill && fillOverwrite) {
    newProps = { ...node.props, fill: fillOverwrite }
  } else {
    newProps = { ...node.props }
  }

  if (node.props.children) {
    return cloneElement(
      node,
      newProps,
      Children.map(node.props.children, (child) => processNode(child, fillOverwrite)),
    )
  }

  return cloneElement(node, newProps)
}

export default processNode
