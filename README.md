# moxy-algorithms
Useful data structures and algorithms

## Features
* LinkedList
* HashedList
* BinaryHashTree
* detectCycle (loops)

## Usage
```typescript
    const moxyalgos = require('moxy-algos').MoxyAlgos
    const data = ['hello', 'world', 'this', 'is', 'a', 'test', 'to', 'see', 'if', 'our', 'binary', 'hash', 'tree', 'works', 'as', 'expected']
    const tree = MoxyAlgos.BinaryHashTree(data)

    console.log(JSON.stringify(tree, null, 2))
    console.log(tree.validate())
```