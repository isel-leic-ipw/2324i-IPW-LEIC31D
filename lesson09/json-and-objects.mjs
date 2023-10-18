const str = '{ "a": 123 }'

let obj = JSON.parse(str)
console.log(obj)

const str1 = JSON.stringify(obj)
console.log(str1)


let o = {
    x: "SLB",
    y: [
        {
            b: 23,
            c: "Glorioso"
        }
    ]
}

const str2 = JSON.stringify(o)
console.log(str2)
