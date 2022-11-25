import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
// User sends duplicated domain name (meaning this domain has been sent already before)
// Check for spam from user (if they send a lot in short period of time)                    DONEDONE
// Give error if user sends domain with invalid words (like swear words)                    DONEDONE
//Check if Iframe script is submitted
function App() {
    let swearWords = ['spider', 'monkey', 'pig']
    const [domain, setDomain] = useState('')
    const [swearWord, setSwearWord] = useState('')
    const [validDomain, setValidDomain] = useState(true)

    function filterSwearWords(str) {
        let words = []
        swearWords.forEach((word) =>
            str.replace(/ /g, '').toLowerCase().includes(word.replace(/ /g, '').toLowerCase()) ? words.push(word) : null
        )
        return words
    }
    function isDomain(arg) {
        let regexDomain =
            /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?/
        if (arg.match(regexDomain)) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        if (filterSwearWords(domain)[0]) {
            setSwearWord(filterSwearWords(domain).join(', '))
        }
        if (!isDomain(domain)) {
            console.log('Domain not valid')
            setValidDomain(false)
        } else {
            console.log('Domain is valid')
            setValidDomain(true)
        }
    }, [domain])

    return (
        <div className='App'>
            <header className='appHeader'></header>
            <div className='container'>
                <input className='inputSection domainInput' onChange={(e) => setDomain(e.target.value)} />
                <div className='inputSection SubmitButton'>Report Domain</div>
            </div>
            {domain && !validDomain && (
                <div>
                    <span style={{ color: 'yellow' }}>{domain}</span> is not a valid Domain
                </div>
            )}
            {!validDomain && swearWord && (
                <div>
                    Words like
                    <span style={{ color: 'red' }}> {swearWord} </span>
                    are not allowed
                </div>
            )}
        </div>
    )
}

export default App
