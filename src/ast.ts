/* eslint-disable no-dupe-class-members */
import { ObjectEditor, ObjectEditorConfig } from './editors/object.editor'
import { Thunk, thunkable } from './types'

enum EditorKind {
  Any = 'TypeDefinition',
  Object = 'ObjectTypeDefinition',
}

type DefinitionEditor = ObjectEditor

type DefinitionEditorConfig = ObjectEditorConfig

// type EditorByKind<K> = K extends EditorKind ? EditorConfigToClass[K] : DefinitionEditor

export class AST {
  types = new Map<string, DefinitionEditor>()

  getType(typename: string) {
    const editor = this.types.get(typename)

    if (!editor) {
      throw Error(`${this.getType.name}: type ${typename} not found`)
    }

    if (kind && editor.kind !== kind) {
      throw Error(`${this.getType.name}: type ${typename} is ${editor.kind} not ${kind}`)
    }

    return editor
  }

  createType(typename: string) {
    const { typename, config } = this.disambiguateInput(input)

    if (this.types.has(typename)) {
      throw Error(`${this.createType.name}: type ${typename} already exists`)
    }

    const editor = new ObjectEditor(this, config)
    this.types.set(typename, editor)

    return editor
  }

  getOrCreateType(typename: string, onCreate?: Thunk<DefinitionEditorConfig>): DefinitionEditor {
    const prevEditor = this.types.get(typename)

    if (prevEditor) {
      return prevEditor
    }

    const nextEditor = new ObjectEditor(this, thunkable(onCreate))

    this.types.set(typename, nextEditor)

    return nextEditor
  }

  private create(clazz: DefinitionEditor, config: DefinitionEditorConfig) {
    const typename = config.typename

    if (this.types.has(typename)) {
      throw Error(`ast.create(): type ${typename} already exists`)
    }
  }
}
