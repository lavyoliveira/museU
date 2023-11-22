import '../app/css/style.css';

import Header from '../components/ui/header';
import Footer from '../components/ui/footer';
import Form from '../components/ui/form';

import { useState, useEffect } from 'react';

export default function (){
    return (
        <>
        <Header />
        <div className="flex flex-col min-h-screen justify-center items-center" style={{ backgroundColor: '#342720' }}>
            <Form />
            <div className='h-3 w-full' style={{ backgroundColor: '#42322A' }}></div>
        </div>
        </>
    )
}