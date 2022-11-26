import logo from './logo.svg'
import './App.css'
import { useEffect, useState } from 'react'
import { filterSwearWords, absolute_url, isValidURL, reportUrl } from './functions/helpers'

const botHumanThreshold = 3
const timeBeforeTrial = 60
let interval

function App() {
    const [domain, setDomain] = useState('')
    const [swearWord, setSwearWord] = useState('')
    const [validDomain, setValidDomain] = useState(true)
    const [absoluteUrl, setAbsolute] = useState(true)
    const [success, setSuccess] = useState(false)
    const [errors, setErrors] = useState('')
    const [loading, setLoading] = useState(false)
    const [count, setCount] = useState(0)
    const [abuse, setAbuse] = useState(false)
    const [countDown, setCountDown] = useState(timeBeforeTrial)

    useEffect(() => {
        setErrors('')
        if (!absolute_url(domain)) {
            setAbsolute(false)
        } else {
            setAbsolute(true)
        }

        if (filterSwearWords(domain)[0]) {
            setSwearWord(filterSwearWords(domain).join(', '))
        } else {
            setSwearWord('')
        }
        if (!isValidURL(domain)) {
            setValidDomain(false)
            absolute_url(domain)
        } else {
            setValidDomain(true)
            absolute_url(domain)
        }
    }, [domain])

    useEffect(() => {
        if (abuse) {
            setTimeout(() => {
                setAbuse(false)
                setCountDown(60)
                setCount(0)
                clearInterval(interval)
            }, 60000)
            interval = setInterval(() => {
                setCountDown((prev) => prev - 1)
            }, 1000)
        }
    }, [abuse])

    const submitDomain = async (e) => {
        e.preventDefault()
        if (abuse) {
            return
        }
        if (count >= botHumanThreshold) {
            console.log('sUBMited bots')
            setAbuse(true)
            return
        }
        if (absoluteUrl && validDomain && !swearWord) {
            setLoading(true)
            setCount(count + 1)
            const result = await reportUrl(domain)
            setLoading(false)
            if (result.message !== 'Success') {
                setErrors(result.message)
                return
            }
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 7000)
            return
        }
        console.group('Not valid to be sent')
    }

    return (
        <div className='container'>
            <div class='navbar'>{/* <header> CSGO Report</header> */}</div>
            {loading ? (
                <div class='main'>
                    <div class='message'>
                        <div class='loader'>
                            <div class='inner one'></div>
                            <div class='inner two'></div>
                            <div class='inner three'></div>
                        </div>
                    </div>
                    <div class='message'>Adding the domain to blacklist, please wait ...</div>
                </div>
            ) : (
                <div class='main'>
                    <div class='message'>
                        <p>Report a domain involved in phishing or any other illegalities</p>
                    </div>
                    <div class='form'>
                        <form action='' class='form'>
                            <input
                                type='text'
                                placeholder='Enter Domain Name...'
                                class='testdomain'
                                onChange={(e) => setDomain(e.target.value)}
                            />

                            <button value='Submit' class='button' onClick={(e) => submitDomain(e)}>
                                {' '}
                                Submit{' '}
                            </button>
                        </form>
                    </div>
                    <div className='infoSection'>
                        {success && <div style={{ color: 'yellow' }}>Domain reported successfully.</div>}
                        {errors && <div>* {errors}</div>}
                        {domain && !absoluteUrl && (
                            <div>
                                * Url should start with protocol ie{' '}
                                <span style={{ color: 'yellow' }}> http, https ...</span>
                            </div>
                        )}
                        {absoluteUrl && domain && !validDomain && (
                            <div>
                                *<span style={{ color: 'yellow' }}> {domain}</span> is not a valid domain
                            </div>
                        )}
                        {absoluteUrl && validDomain && swearWord && (
                            <div>
                                * Words like
                                <span style={{ color: 'red' }}> {swearWord} </span>
                                are not allowed
                            </div>
                        )}
                        {abuse && <div>* Too frequent reports received, try again after {countDown} Secs.</div>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
