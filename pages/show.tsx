import '../app/css/style.css';
import Header from '../components/ui/header';
import Footer from '../components/ui/footer';
import { useState, useEffect } from 'react';
import { ArrowLongLeftIcon, ArrowLongRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import obras from '../mocks/obras.json'

interface Slide {
  url: string;
  title: string;
  author: string;
  description: string;
}

export default function Show() {

  const slides: Slide[] = obras;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setShowDetails(false);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
     setShowDetails(false);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <Header />
      <div className='relative'>
        {!showDetails && (
          <div
            className='absolute bottom-8 right-8 bg-black bg-opacity-50 p-2 rounded-full cursor-pointer'
            onClick={toggleDetails}
          >
            <InformationCircleIcon className='h-10 w-10 text-white' />
          </div>
        )}

        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className='w-full h-screen bg-center bg-cover duration-500'
        ></div>

        {/* Card de Informações */}
        {showDetails && (
          <div className='absolute bottom-0 right-0 mb-8 mr-8 bg-black bg-opacity-50 p-4 rounded-lg text-white'>
            <h2 className='text-xl font-bold'>{slides[currentIndex].title}</h2>
            <p className='text-sm'>{`Autor: ${slides[currentIndex].author}`}</p>
            <p className='text-sm'>{slides[currentIndex].description}</p>
          </div>
        )}

        {/* Botões de Navegação */}
        <div
          className='group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer w-12 h-12 flex items-center justify-center'
          onClick={prevSlide}
        >
          <ArrowLongLeftIcon />
        </div>
        <div
          className='group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer w-12 h-12 flex items-center justify-center'
          onClick={nextSlide}
        >
          <ArrowLongRightIcon />
        </div>
      </div>
      <Footer />
    </>
  );
}
