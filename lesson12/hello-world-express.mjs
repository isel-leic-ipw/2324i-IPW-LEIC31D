import express from 'express'

const PORT = 1904 


const app = express()


app.get('/', (req, rsp)  => {
    rsp.set('Content-Type', 'text/plain')
    rsp.end("SLB não está nos melhores dias!!!!")
})

app.listen(PORT, () => console.log(`Server waiting for requests on http://localhost:${PORT}`))

