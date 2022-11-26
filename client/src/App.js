import './App.css'
import { useEffect, useState } from 'react'
import { filterSwearWords, absolute_url, isValidURL, reportUrl } from './functions/helpers'

const botHumanThreshold = Number(process.env.REACT_APP_BOT_HUMAN_THRESHOLD)
const timeBeforeTrial = Number(process.env.REACT_APP_TIME_BEFORE_NEXT_TRIAL)

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
    const [selfReporting, setSelfReported] = useState(false)

    useEffect(() => {
        setErrors('')
        if (domain === 'http://csgoreports.net' || domain === 'https://csgoreports.net') {
            setSelfReported(true)
        } else {
            setSelfReported(false)
        }
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
            <div className='navbar'>{/* <header> CSGO Report</header> */}</div>
            {loading ? (
                <div className='main'>
                    <div className='message'>
                        <div className='loader'>
                            <div className='inner one'></div>
                            <div className='inner two'></div>
                            <div className='inner three'></div>
                        </div>
                    </div>
                    <div className='message'>Adding the domain to blacklist, please wait ...</div>
                </div>
            ) : (
                <div className='main'>
                    <div className='message'>
                        <p>Report a domain involved in phishing or any other illegalities</p>
                    </div>
                    <div className='form'>
                        <form action='' className='form'>
                            <input
                                defaultValue={domain}
                                type='text'
                                placeholder='Enter Domain Name...'
                                className='testdomain'
                                onChange={(e) => setDomain(e.target.value)}
                            />

                            <button value='Submit' className='button' onClick={(e) => submitDomain(e)}>
                                {' '}
                                Submit{' '}
                            </button>
                        </form>
                    </div>
                    <div className='infoSection'>
                        {success && <div className='spanYellow'>Domain reported successfully.</div>}
                        {errors && <div>* {errors}</div>}
                        {selfReporting && (
                            <div>
                                Come on... we don't phish &#128580;, we however report those who do &#128526;.
                                <span className='spanYellow'></span>
                            </div>
                        )}
                        {domain && !absoluteUrl && (
                            <div>
                                * Url should start with protocol ie <span className='spanYellow'> http, https ...</span>
                            </div>
                        )}
                        {absoluteUrl && domain && !validDomain && (
                            <div>
                                *<span className='spanYellow'> {domain}</span> is not a valid domain
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
