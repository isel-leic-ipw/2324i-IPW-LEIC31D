// JavaScript (aka ECMASCript) module import - ESM
import { copyProperties } from '../ex2.mjs'

import assert from 'node:assert'

describe('Ex2 module tests', function () {
  // Arrange
  const validators = [
    {
      name: "p1", validators: [s => typeof s == 'string' && s.length > 2, s => s[0] == "a"]
    },
    {
      name: "p2", validators: [s => Number.isInteger(s)]
    }
  ]

  const obj1 = { p1: "a" }
  const obj2 = { p1: 123 }
  const obj3 = { p1: "abc", p2: 123 }

  it('should return an empty object if no validator succeeds', function () {
    // Arrange

    // Act 
    const ret = copyProperties(obj1, validators)

    // Assert
    assert.deepEqual(ret, {}, "Should return an empty object")
  })
})

