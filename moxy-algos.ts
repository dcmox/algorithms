/**
 * Daniel Moxon
 * Copyright (C) 2020
 * https://github.com/dcmox/moxy-algos
 */

import { detectCycle } from './detectCycle'
import { base58Decode, base58Encode } from './lib/base58'
import { BinaryHashTree } from './lib/binaryHashTree'
import { HashedList } from './lib/hashedList'
import { INode } from './lib/interfaces'
import { LinkedList } from './lib/linkedList'
import { sha256 } from './lib/sha256'

export class MoxyAlgos {
    public static HashedList(items: any[]): HashedList { return new HashedList(items) }
    public static LinkedList(items: any[]): LinkedList { return new LinkedList(items) }
    public static detectCycle(nodes: INode[] | LinkedList): boolean { return detectCycle(nodes) }
    public static BinaryHashTree(data: any): BinaryHashTree { return new BinaryHashTree(data) }
    public static sha256(data: any): string { return sha256(data) }
    public static base58Encode(data: any): string { return base58Encode(data) }
    public static base58Decode(data: any): string { return base58Decode(data) }
}

export default MoxyAlgos
