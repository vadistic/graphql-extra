import { KindEnum, ASTKindToNode, GraphQLError, ASTNode } from 'graphql';
/**
 * @category Internal
 */
export declare function validationError<K extends KindEnum>(kinds: K | K[], node: ASTNode): GraphQLError;
/**
 * @category Internal
 */
export declare function assertionError<K extends KindEnum>(kind: K, node: ASTNode): GraphQLError;
/**
 * @category Internal
 */
export declare function validateNodeKind<K extends KindEnum>(kind: K, node: ASTKindToNode[K]): void;
/**
 * @category Internal
 */
export declare function validateNodeKindsArr<K extends KindEnum>(kinds: K[], node: ASTKindToNode[K]): void;
