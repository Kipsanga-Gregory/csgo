import axiosInstance from './axios'

const swearWords = process.env.REACT_APP_SWEAR_WORDS.split(',')
export const reportUrl = async (domain) => {
    const { data } = await axiosInstance.post('/reportDomain', { domain: domain })
    console.log(data)
    return data
}

export const filterSwearWords = (str) => {
    let words = []
    swearWords.forEach((word) =>
        str.replace(/ /g, '').toLowerCase().includes(word.replace(/ /g, '').toLowerCase()) ? words.push(word) : null
    )
    return words
}

export const isValidURL = (string) => {
    const res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
    return res !== null
}

export const absolute_url = (url) => {
    const patternS = /^https:\/\//i
    const pattern = /^http:\/\//i

    if (pattern.test(url) || patternS.test(url)) {
        return true
    } else {
        return false
    }
}
