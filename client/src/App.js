import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'

// Check for spam from user (if they send a lot in short period of time)                    DONEDONE
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

    function isValidURL(string) {
        const res = string.match(
            /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        )
        return res !== null
    }

    function absolute_url(url) {
        const patternS = /^https:\/\//i
        const pattern = /^http:\/\//i

        if (pattern.test(url) || patternS.test(url)) {
            console.log('Valid url')
        } else {
            console.log('Invalid url')
        }
    }

    useEffect(() => {
        if (filterSwearWords(domain)[0]) {
            setSwearWord(filterSwearWords(domain).join(', '))
        }
        if (!isValidURL(domain)) {
            console.log('Domain not valid')
            setValidDomain(false)
        } else {
            console.log('Domain is valid')
            setValidDomain(true)
            absolute_url(domain)
        }
    }, [domain])

    return (
        <div className='container'>
            <div class='navbar'>{/* <header> CSGO Report</header> */}</div>
            <div class='main'>
                <div class='message'>
                    <p>Report a domain involved in phishing or any other illegalities</p>
                </div>
                <div class='form'>
                    <form action='' class='form'>
                        <input type='text' placeholder='Enter Domain Name...' class='testdomain' />
                        <button value='Submit' class='button'>
                            {' '}
                            Submit{' '}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
    // return (
    //     <div className='App'>
    //         <header className='appHeader'></header>
    //         <div className='container'>
    //             <input className='inputSection domainInput' onChange={(e) => setDomain(e.target.value)} />
    //             <div className='inputSection SubmitButton'>Report Domain</div>
    //         </div>
    //         {domain && !validDomain && (
    //             <div>
    //                 <span style={{ color: 'yellow' }}>{domain}</span> is not a valid Domain
    //             </div>
    //         )}
    //         {!validDomain && swearWord && (
    //             <div>
    //                 Words like
    //                 <span style={{ color: 'red' }}> {swearWord} </span>
    //                 are not allowed
    //             </div>
    //         )}
    //     </div>
    // )
}

export default App
