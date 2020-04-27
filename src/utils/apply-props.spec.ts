import { Ast } from '../internal'
import {
  applyProps, applyPropsArr, applyPropsNullable, applyPropsNullableArr, applyPropsPartial,
} from './apply-props'

describe('apply-props', () => {
  const node = Ast.fieldNode('myField')
  const props = 'myField'

  test(applyProps.name, () => {
    expect(applyProps(Ast.fieldNode, node)).toEqual(node)
    expect(applyProps(Ast.fieldNode, props)).toEqual(node)
    expect(applyProps(Ast.fieldNode, node)).toBe(node)
  })


  test(applyPropsArr.name, () => {
    expect(applyPropsArr(Ast.fieldNode, [node, node])).toEqual([node, node])
    expect(applyPropsArr(Ast.fieldNode, [props, props])).toEqual([node, node])
    expect(applyPropsArr(Ast.fieldNode, [node, props])).toEqual([node, node])
  })

  test(applyPropsNullable.name, () => {
    expect(applyPropsNullable(Ast.fieldNode, undefined)).toEqual(undefined)
    expect(applyPropsNullable(Ast.fieldNode, props)).toEqual(node)
    expect(applyPropsNullable(Ast.fieldNode, node)).toEqual(node)
  })

  test(applyPropsNullableArr.name, () => {
    expect(applyPropsNullableArr(Ast.fieldNode, [node])).toEqual([node])
    expect(applyPropsNullableArr(Ast.fieldNode, [props])).toEqual([node])
    expect(applyPropsNullableArr(Ast.fieldNode, undefined)).toBe(undefined)
  })


  test('partial', () => {
    expect(applyPropsPartial(Ast.fieldNode, {})).toMatchObject({ kind: node.kind })

    const whole = Ast.fieldNode({ name: 'myfield', selections: ['myNestedField'] })
    const subset = applyPropsPartial(Ast.fieldNode, { selections: ['myNestedField'] })

    expect(whole).toMatchObject(subset)
    expect(whole.selectionSet).toEqual(subset.selectionSet)
  })
})
