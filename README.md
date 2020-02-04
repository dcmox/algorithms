# moxy-algorithms
Useful data structures and algorithms

## Features
* LinkedList
* HashedList
* BinaryHashTree w/ hash validation and proofs
* detectCycle (loops)
* sha256
* base58

## Usage
```typescript
    const moxyalgos = require('moxy-algos').MoxyAlgos
    const data = ['hello', 'world', 'this', 'is', 'a', 'test', 'to', 'see', 'if', 'our', 'binary', 'hash', 'tree', 'works', 'as', 'expected']
    const tree = MoxyAlgos.BinaryHashTree(data)

    console.log(JSON.stringify(tree, null, 2))
    console.log(tree.validate()) // true

    const tree = MoxyAlgos.BinaryHashTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16])

    console.log(JSON.stringify(tree, null, 2))
    console.log(tree.getProofs('2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3')) // Gives you the necessary node hashes to prove a transaction is valid
    console.log(tree.verifyHash('2c624232cdd221771294dfbb310aca000a0df6ac8b66b696d90ef06fdefb64a3')) // Verifies hash is valid
```