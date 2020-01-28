/**
 * Daniel Moxon
 * Copyright (C) 2020
 * https://github.com/dcmox/moxy-algos
 */

import { detectCycle } from './detectCycle'
import { HashedList } from './lib/hashedList'
import { LinkedList } from './lib/linkedList'
import { BinaryHashTree } from './lib/binaryHashTree'

export class MoxyAlgos {
    public static HashedList(items: any[]): HashedList { return new HashedList(items) }
    public static LinkedList(items: any[]): LinkedList { return new LinkedList(items) }
    public static detectCycle(nodes: INode[] | LinkedList): boolean { return detectCycle(nodes) }
    public static BinaryHashTree(data: any): BinaryHashTree { return new BinaryHashTree(data) }
}

export default MoxyAlgos

