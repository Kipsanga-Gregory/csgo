const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { saveDomain, isDomainReported, updateDomainsCache } = require('./helpers')
const spawn = require('child_process').spawn

const PORT = process.env.PORT || 4000

const app = express()

const staticFiles = express.static(path.join(__dirname, '../client/build'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(staticFiles)

app.use('/*', staticFiles)

updateDomainsCache()

app.post('/reportDomain', async (req, res) => {
    try {
        const isDomainReportedBefore = await isDomainReported(req.body.domain)
        if (isDomainReportedBefore) {
            res.send({ message: 'Domain already reported' })
            return
        }
        const spawnProcess = spawn('python3', ['./python/cloudflare.py', req.body.domain])
        spawnProcess.stdout.on('data', (data) => {
            console.log('Data received from python', data.toString())
            saveDomain(req.body.domain)
            res.send({ message: data.toString() })
        })
    } catch (error) {
        res.send({ message: 'failed' })
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
