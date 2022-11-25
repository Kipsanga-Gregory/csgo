const fs = require('fs')

const dataFilePath = './reportedDomains.txt'
let domainsCache = []

const updateDomainsCache = () => {
    try {
        fs.readFile(dataFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            const allDomains = JSON.parse(data)
            domainsCache = allDomains
        })
    } catch (error) {
        console.log(error.message)
    }
}
const saveDomain = (domain) => {
    try {
        fs.writeFile(dataFilePath, JSON.stringify([...domainsCache, domain]), (err) => {
            if (err) {
                console.error(err)
                return
            }
            updateDomainsCache()
        })
    } catch (error) {
        console.log(error.message)
    }
}

const isDomainReported = async (domain) => {
    try {
        const isDomainSaved = domainsCache.filter((storedDomain) => {
            return storedDomain === domain
        })
        if (isDomainSaved.length) {
            return true
        }
        return false
    } catch (error) {
        console.log(error.message)
        return false
    }
}

module.exports = {
    saveDomain,
    isDomainReported,
    updateDomainsCache,
}
