/**
 * Daniel Moxon
 * Copyright (C) 2020
 * https://github.com/dcmox/moxy-algos
 */

import { detectCycle } from './detectCycle'
import { BinaryHashTree } from './lib/binaryHashTree'
import { HashedList } from './lib/hashedList'
import { INode } from './lib/interfaces'
import { LinkedList } from './lib/linkedList'

export class MoxyAlgos {
    public static HashedList(items: any[]): HashedList { return new HashedList(items) }
    public static LinkedList(items: any[]): LinkedList { return new LinkedList(items) }
    public static detectCycle(nodes: INode[] | LinkedList): boolean { return detectCycle(nodes) }
    public static BinaryHashTree(data: any): BinaryHashTree { return new BinaryHashTree(data) }
}

export default MoxyAlgos
