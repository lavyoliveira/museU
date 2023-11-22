'use client';

import { useState, useEffect } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

import Link from 'next/link';

export default function Header() {
  const [top, setTop] = useState<boolean>(true);

  // detect whether the user has scrolled the page down by 10px
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header className='fixed w-full z-30 transition duration-300 ease-in-out' style={{ backgroundColor: '#342720' }}>
      <div className='max-w-6xl mx-auto px-5 sm:px-6'>
        <div className='flex items-center justify-between h-12 md:h-50'>
          <div className='shrink-0 mr-4'>
            <a
              href='/'
              className='text-white text-xl font-bold py-1 px-2 rounded hover:bg-amber-950 transition duration-300 ease-in-out'
            >
              museU online
            </a>
          </div>
          <Link href="/report">
          <div className='shrink-0 mr-4'>
            <button className='text-white hover:bg-amber-950 p-2 rounded transition duration-300 ease-in-out'>
              <AdjustmentsHorizontalIcon className='h-6 w-6' />
            </button>
          </div>
          </Link>
        </div>
      </div>
      <div className='h-3 w-full' style={{ backgroundColor: '#42322A' }}></div>
    </header>
  );
}
