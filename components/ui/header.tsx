'use client'

import { useState, useEffect } from 'react'
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid'

export default function Header() {

  const [top, setTop] = useState<boolean>(true)

  // detect whether user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true)
  }  

  useEffect(() => {
    scrollHandler()
    window.addEventListener('scroll', scrollHandler)
    return () => window.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <header className='fixed w-full z-30 transition duration-300 ease-in-out bg-amber-950'>
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-50">
        <div className="shrink-0 mr-4">
          <a href="/" className="text-white text-xl font-bold py-2 px-4 rounded">
            museU online
            </a>
            </div>


          <div className="shrink-0 mr-4">
          <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />
          </div>

        </div>
      </div>
    </header>
  )
}
