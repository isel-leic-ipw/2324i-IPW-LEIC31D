let a = [1,"2",3,4,5, "Sport", "Lisboa", "e", "Benfica"]
let o = {'0': 1, '1': "2", '2': 3, '3': 4, '4': 5, '5': "Sport", '6': "Lisboa", '7': "e", '8': "Benfica" }

a[0] = 1
o[0] = 1
console.log(a[0])
console.log(o[0])

console.log(a)
console.log(o)
console.log(a.length)
console.log(o.length)

a[1003] = 123
console.log(a.length)
console.log(a)

a.length = 3
console.log(a)

// a.a = "SLB"
// console.log(a)
// console.log(a.length)

// a[1327] = 55
// a[57625] = 99
// console.log(a)
// console.log(a.length)
// console.log(a[57000])
// console.log(a[58000])


// // a.length = 3
// // console.log(a)

