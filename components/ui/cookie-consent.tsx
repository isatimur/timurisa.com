'use client'

import { useState, useEffect } from 'react'
import { Button } from './button'
import { X } from 'lucide-react'

export function CookieConsent() {
    const [showConsent, setShowConsent] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent')
        if (!consent) {
            setShowConsent(true)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem('cookieConsent', 'true')
        setShowConsent(false)
    }

    if (!showConsent) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-70 backdrop-blur-md shadow-lg py-1.5 px-4 z-50 border-t border-blue-100">
            <div className="container mx-auto flex items-center justify-between">
                <p className="text-xs sm:text-sm text-gray-600 flex-grow mr-4">
                    We use cookies to enhance your experience. By continuing, you agree to our use of cookies. <a href="https://en.wikipedia.org/wiki/HTTP_cookie" className="text-primary hover:text-primary/80">More info</a>
                </p>
                <div className="flex items-center space-x-4">
                    <Button onClick={acceptCookies} className="bg-primary hover:bg-primary/80 text-white text-xs sm:text-sm py-1 px-3">
                        Accept
                    </Button>
                    <button onClick={() => setShowConsent(false)} className="text-gray-400 hover:text-blue-500">
                        <X size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}