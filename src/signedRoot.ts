import assert from "assert";

import {
  AnyContainerType,
  ContainerType,
  SerializableObject,
  Type,
} from "./types";

import { hashTreeRoot } from "./hashTreeRoot";

import {
  copyType,
  parseType,
} from "./util/types";

/**
 * Merkleize an SSZ object w/o its last field
 * Used for signing/verifying signed data
 * @method signedRoot
 * @param {SerializableObject} value
 * @param {AnyContainerType} type
 * @returns {Buffer}
 */
export function signedRoot(value: SerializableObject, type: AnyContainerType): Buffer {
  const _type = parseType(type);
  assert(_type.type === Type.container);
  const truncatedType = copyType(type) as ContainerType;
  truncatedType.fields.pop();
  return hashTreeRoot(value, _type);
}
