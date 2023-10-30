


const URL = 'https://eloquentjavascript.net/11_async.html'


async function f1(n) {
    return n * 2
}

async function f2() {
    let n1 = await f1(10)
    let n2 = await f1(5)
    return n1 + n2 + "SLB"
}


async function f2_1() {
    return f1(10)
        .then(n1 => f1(5).then(n2 => n1 + n2 + "SLB"))
        
}


console.log(f1())
console.log(await f2())