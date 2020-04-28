import { nodes } from '../../test/nodes'
import { Api, Mixin } from '../internal'

describe(Api.ObjectTypeApi.name, () => {
  const node = nodes.ObjectTypeDefinition
  const api = Api.objectTypeApi(node)

  describe('mixins', () => {
    test(Mixin.NameMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.FieldDefinitionsMixin.name, () => {
      expect(api.getFields().map((a) => a.node)).toEqual(node.fields)
    })

    test(Mixin.InterfacesMixin.name, () => {
      expect(api.getInterfaces().map((a) => a.node)).toEqual(node.interfaces)
    })

    test(Mixin.TypeDefinitionAssertionMixin.name, () => {
      expect(api.isObjectType()).toBe(true)
    })

    test(Mixin.KindAssertionMixin.name, () => {
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
    test(Mixin.NameMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.FieldDefinitionsMixin.name, () => {
      expect(api.getFields().map((a) => a.node)).toEqual(node.fields)
    })

    test(Mixin.InterfacesMixin.name, () => {
      expect(api.getInterfaces().map((a) => a.node)).toEqual(node.interfaces)
    })

    test(Mixin.TypeDefinitionAssertionMixin.name, () => {
      expect(api.isInterfaceType()).toBe(true)
    })

    test(Mixin.KindAssertionMixin.name, () => {
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
    test(Mixin.NameMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.UnionTypesMixin.name, () => {
      expect(api.getTypes().map((a) => a.node)).toEqual(node.types)
    })

    test(Mixin.TypeDefinitionAssertionMixin.name, () => {
      expect(api.isUnionType()).toBe(true)
    })

    test(Mixin.KindAssertionMixin.name, () => {
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
    test(Mixin.NameMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.TypeDefinitionAssertionMixin.name, () => {
      expect(api.isScalarType()).toBe(true)
    })

    test(Mixin.KindAssertionMixin.name, () => {
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
    test(Mixin.NameMixin.name, () => {
      expect(api.getName()).toBe(node.name.value)
    })

    test(Mixin.DescriptionMixin.name, () => {
      expect(api.getDescription()).toBe(node.description?.value)
    })

    test(Mixin.DirectivesMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.EnumValueDefinitionMixin.name, () => {
      expect(api.getValues().map((a) => a.node)).toEqual(node.values)
    })

    test(Mixin.TypeDefinitionAssertionMixin.name, () => {
      expect(api.isEnumType()).toBe(true)
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(() => api.assertKind('Argument')).toThrowErrorMatchingInlineSnapshot(
        '"EnumTypeDefinition node \\"MyEnum\\" cannot be asserted as Argument"',
      )
    })
  })
})
