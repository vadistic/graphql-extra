import { ASTNode } from 'graphql'

export function isAstNode<Node = ASTNode>(input: any): input is Node {
  return typeof input === 'object' && 'kind' in input && typeof input.kind === 'string'
}

/**
 * apply props to fn or pass node along, with nullability support
 *
 * fragile - do not touch!
 */

// const name1 = nodeOrProps(nameNode, 'abc' as string)
// const name2 = nodeOrProps(nameNode, 'abc' as string | undefined)
// const name3 = nodeOrProps(nameNode, {} as NameNode)
// const name4 = nodeOrProps(nameNode, {} as NameNode | undefined)

export function nodeOrProps<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  input: Node | Props,
): Node
export function nodeOrProps<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  input: Node | Props | undefined,
): Node | undefined

export function nodeOrProps<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  input: Node | Props | undefined,
): Node | undefined {
  if (!input) {
    return
  }

  if (isAstNode<Node>(input)) {
    return input
  }

  return fn(input)
}

/**
 * apply props array to fn or pass nodes along, with nullability support
 *
 * also fragile - do not touch!
 */

// const names1 = nodeOrPropsArr(nameNode, ['abc'] as string[])
// const names2 = nodeOrPropsArr(nameNode, ['abc'] as string[] | undefined)
// const names3 = nodeOrPropsArr(nameNode, [] as NameNode[])
// const names4 = nodeOrPropsArr(nameNode, [] as NameNode[] | undefined)

export function nodeOrPropsArr<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  inputs: (Node | Props)[],
): Node[]
export function nodeOrPropsArr<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  inputs: (Node | Props)[] | undefined,
): Node[] | undefined

export function nodeOrPropsArr<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  inputs: (Node | Props)[] | undefined,
): Node[] | undefined {
  if (!inputs) {
    return
  }

  return inputs.map(input => nodeOrProps(fn, input))
}
