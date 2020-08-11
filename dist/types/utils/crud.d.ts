import type * as GQL from 'graphql';
/**
 * @category Internal
 */
export interface CrudConfig<Node, Api, Props, Target> {
    /** parent node */
    parent: GQL.ASTNode;
    /** parent key with an array */
    key: string;
    /** how provided props should be coerced to node */
    factory: (props: Props) => Node;
    /** how returned node should be wrapped */
    api: (el: Node) => Api;
    /** compare function - usually pointing to name */
    matcher: (el: Node) => Target;
    /** custom getter/ ref callback instead of parent[key] */
    ref?: (next?: any[]) => any[];
    /** additional kind filter */
    kindFilter?: GQL.KindEnum[];
}
/**
 * @category Internal
 */
export declare class Crud<Value extends GQL.ASTNode, Api, Props, Target> {
    protected config: CrudConfig<Value, Api, Props, Target>;
    constructor(config: CrudConfig<Value, Api, Props, Target>);
    get arr(): Value[];
    set arr(next: Value[]);
    protected get arrOfKind(): Value[];
    has(filter: Target): boolean;
    test(filter: Partial<Props | Value>): boolean;
    set(props: (Props | Value)[]): this;
    findOneNode(filter: Target | Partial<Props | Value>): Value | undefined;
    findOneNodeIndex(filter: Target | Partial<Props | Value>): number;
    findOneNodeOrFail(filter: Target | Partial<Props | Value>): Value;
    findManyNodes(filter?: Target | Partial<Props | Value>): Value[];
    findManyNodeIndicies(filter?: Target | Partial<Props | Value>): number[];
    findOne(filter: Target | Partial<Props | Value>): Api | undefined;
    findOneName(filter: Target | Partial<Props | Value>): Target | undefined;
    findOneOrFail(filter: Target | Partial<Props | Value>): Api;
    findMany(filter?: Target | Partial<Props | Value>): Api[];
    findManyNames(filter?: Target | Partial<Props | Value>): Target[];
    create(props: Props | Value): this;
    upsert(props: Props | Value): this;
    update(filter: Target | Partial<Props | Value>, props: Partial<Props | Value>): this;
    remove(filter: Target | Partial<Props | Value>): this;
    protected _target(filter: Target | Partial<Props | Value>): string;
    protected _location(): string;
    protected _filter(filter: Target | Partial<Props | Value>): (node: Value) => boolean;
}
