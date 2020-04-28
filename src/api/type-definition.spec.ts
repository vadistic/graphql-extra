import { nodes } from '../../test/nodes'
import { Api, Mixin } from '../internal'

describe(Api.ObjectTypeApi.name, () => {
  const node = nodes.ObjectTypeDefinition
  const api = Api.objectTypeApi(node)

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionApiMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesApiMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.FieldDefinitionsApiMixin.name, () => {
      expect(api.getFields().map((a) => a.node)).toEqual(node.fields)
    })

    test(Mixin.TypeDefinitionAssertionApiMixin.name, () => {
      expect(api.isObjectType()).toBe(true)
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(() => api.assertKind('Argument')).toThrowErrorMatchingInlineSnapshot(
        '"ObjectTypeDefinition node \\"MyObject\\" cannot be asserted as Argument"',
      )
    })
  })
})

// ────────────────────────────────────────────────────────────────────────────────

describe(Api.InterfaceTypeApi.name, () => {
  const node = nodes.InterfaceTypeDefinition
  const api = Api.interfaceTypeApi(node)

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionApiMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesApiMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.FieldDefinitionsApiMixin.name, () => {
      expect(api.getFields().map((a) => a.node)).toEqual(node.fields)
    })

    test(Mixin.TypeDefinitionAssertionApiMixin.name, () => {
      expect(api.isInterfaceType()).toBe(true)
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(() => api.assertKind('Argument')).toThrowErrorMatchingInlineSnapshot(
        '"InterfaceTypeDefinition node \\"MyInterface\\" cannot be asserted as Argument"',
      )
    })
  })
})

// ────────────────────────────────────────────────────────────────────────────────

describe(Api.UnionTypeApi.name, () => {
  const node = nodes.UnionTypeDefinition
  const api = Api.unionTypeApi(node)

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionApiMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesApiMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.UnionTypesMixin.name, () => {
      expect(api.getTypes().map((a) => a.node)).toEqual(node.types)
    })

    test(Mixin.TypeDefinitionAssertionApiMixin.name, () => {
      expect(api.isUnionType()).toBe(true)
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(() => api.assertKind('Argument')).toThrowErrorMatchingInlineSnapshot(
        '"UnionTypeDefinition node \\"MyUnion\\" cannot be asserted as Argument"',
      )
    })
  })
})

// ────────────────────────────────────────────────────────────────────────────────

describe(Api.ScalarTypeApi.name, () => {
  const node = nodes.ScalarTypeDefinition
  const api = Api.scalarTypeApi(node)

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionApiMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesApiMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.TypeDefinitionAssertionApiMixin.name, () => {
      expect(api.isScalarType()).toBe(true)
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(() => api.assertKind('Argument')).toThrowErrorMatchingInlineSnapshot(
        '"ScalarTypeDefinition node \\"MyScalar\\" cannot be asserted as Argument"',
      )
    })
  })
})

// ────────────────────────────────────────────────────────────────────────────────

describe(Api.EnumTypeApi.name, () => {
  const node = nodes.EnumTypeDefinition
  const api = Api.enumTypeApi(node)

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionApiMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesApiMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.EnumValueDefinitionMixin.name, () => {
      expect(api.getValues().map((a) => a.node)).toEqual(node.values)
    })

    test(Mixin.TypeDefinitionAssertionApiMixin.name, () => {
      expect(api.isEnumType()).toBe(true)
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(() => api.assertKind('Argument')).toThrowErrorMatchingInlineSnapshot(
        '"EnumTypeDefinition node \\"MyEnum\\" cannot be asserted as Argument"',
      )
    })
  })
})
