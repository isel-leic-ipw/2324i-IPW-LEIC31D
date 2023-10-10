// JavaScript (aka ECMASCript) module import - ESM
import { validateProperty } from '../ex1.mjs' 
//import * as ex1 from '../ex1.mjs' 

// Node.js module import - CJS
//const validateProperty = require('../ex1.mjs')

import assert from 'node:assert'

describe('Ex1 module tests', function () {
  // Arrange
  const validator = {name : "p1" , validators: [s => typeof s == 'string' && s.length > 2, s => s[0]=="a"]  }
  const obj1 = { p1 : "abc" }
  const obj2 = { p2 : 123 }

  describe('#validateProperty tests', function () {
    it('should return false if validator defines a non existing property', function () {
      // Arrange
  
      // Act 
      const valid = validateProperty(obj2, validator)

      // Assert
      assert.equal(valid, false, "Should return false")
    })
    it('should return true if validator defines an existing property and all validators succeed', function () {
      // Arrange

      // Act 
      const valid = validateProperty(obj1, validator)

      // Assert
      assert.ok(valid, "Should return true")
    })
  })

})

