
import url from 'url'

console.log(import.meta)
console.log(import.meta.url)

const currentDir = url.fileURLToPath(new URL('.', import.meta.url))
console.log(currentDir)