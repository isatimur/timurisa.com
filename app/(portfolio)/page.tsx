'use client'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../src/App.tsx'), {ssr: false})

export default function Page() {
    return (
        <App/>
    )

}