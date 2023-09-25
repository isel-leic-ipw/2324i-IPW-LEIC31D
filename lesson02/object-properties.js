let o1 = {
    n1: 123,
    n2: "Benfica",
    n3: "SLB"
}

for(let n in o1) {
    console.log(n) 
    console.log(o1.n)       // undefined 
    console.log(o1['n'])    // undefined
    console.log(o1[n])      // 123 or Banfica
}









// for(let n in o1) {
//     console.log('property name:' + n)
//     console.log('property value:' + o1[n])

// }

