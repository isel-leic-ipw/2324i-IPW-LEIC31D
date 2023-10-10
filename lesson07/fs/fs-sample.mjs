
import { readFile, writeFile } from 'node:fs/promises'


// const p = readFile('./SLB1.txt')
// p.then(processFile)
// p.catch(processError)

readFile('./SLB.txt')
    .then(processFile)
    .catch(processError)



console.log("END")

function processFile(fileContent) {
    console.log("File content ready")
    const fileContentStr = fileContent.toString()
    console.log(fileContentStr)

    const firstLine = fileContentStr.split('\n')[0]

    writeFile('./SLB1.txt', firstLine)
        .then(processWrite)
    
    function processWrite() {
        console.log("File slb.txt written with success")
    }
}


function processError(err) {
    console.log("Error occurred reading file")
    console.log(err)
}


