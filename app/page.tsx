'use client'
import dynamic from 'next/dynamic'

const App = dynamic(() => import('../src/App.tsx'), {
  ssr: false,
  loading: () => null
})

export default function Page() {
  return (
    <div suppressHydrationWarning>
      <App/>
    </div>
  )
}