let sayHello = function (a) {
    console.log("SLB")
}

sayHello.a = "Benfica"
sayHello.sayAgain = function () {
    console.log("Another SLB")
}
sayHello.o = {
    f: function () { }
}

let ret = sayHello()

console.log(ret)
sayHello()
sayHello.sayAgain()



// Function with return value
function getHello() {
    return "Glorioso"
}

console.log(getHello)
console.log(getHello())

let f1 = getHello

console.log(f1())


// Functions with arguments

function times(a, b) {
    return a * b
}

console.log(times(2, 3))
console.log(times(2, "SLB"))
console.log(times(2))
console.log(times())
console.log(times(3, 2, 3, 4, 5))

// Function with variable arguments
console.log("Variable args")
function timesVariableArgs(...args) {
    if (args.length == 0) {
        return 0;
    }
    let res = 1
    // for(let i = 0; i < args.length; ++i) {
    //     res *= args[i]
    // }
    for (const arg of args) {
        res *= arg
    }
    return res
}

console.log(timesVariableArgs(1, 2, 3, 4, 5))
console.log(timesVariableArgs(2, {}))
console.log(timesVariableArgs())




function multiplier(b) {
    return function (a) {
        return times(a, b)
    }
}

console.log(times(1, 9))
console.log(times(2, 9))
console.log(times(3, 9))
console.log(times(4, 9))
console.log(times(5, 9))
console.log(times(6, 9))
console.log(times(7, 9))
console.log(times(8, 9))
console.log(times(9, 9))

let nineMult = multiplier(9)
console.log(nineMult(1))
console.log(nineMult(1))
console.log(nineMult(2))
console.log(nineMult(3))
console.log(nineMult(4))
console.log(nineMult(5))
console.log(nineMult(6))
console.log(nineMult(7))
console.log(nineMult(8))
console.log(nineMult(9))

let tsMult = multiplier(37)
