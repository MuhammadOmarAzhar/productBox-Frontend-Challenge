import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRight, faPlus} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Home = () => {
  return (
    <div className='bg-gray-200 h-screen'>
      <div
        className='flex h-3/4 items-center justify-end bg-cover bg-center'
        style={{backgroundImage: 'url("/assets/store2.jpg")'}}
      >
        <div
          className='grid grid-cols-1 p-4 text-center items-center w-96 h-full bg-white'
          style={{opacity: 0.8}}
        >
          <div>
            <h1 className='text-black text-4xl font-bold mb-4'>
              Welcome to Rando Store
            </h1>
            <p className='text-black text-xl'>
              Your go-to destination for fresh, high-quality essentials. Elevate
              your shopping experience with a diverse selection that promises
              both convenience and flavor. Start exploring now for a tasteful
              journey at your fingertips!
            </p>
          </div>
          <Link href='/items'>
            <h1 className='hover:text-xl text-black text-lg items-center justify-center flex gap-2 uppercase font-bold'>
              Shop Now
              <FontAwesomeIcon icon={faArrowRight} />
            </h1>
          </Link>
        </div>
      </div>
      <div className='bg-gray-800 h-1/4 py-4 px-6'>
        <div className='bg-white p-4 w-72 flex-1'>
          <h1 className='text-black text-lg font-bold'>
            Want to sell on our platform?
          </h1>
          <p className='text-black'>
            You can now expand your business and sell items on our website
          </p>
          <Link href='/add-items'>
            <h1 className='hover:underline text-black font-bold'>
              <FontAwesomeIcon icon={faPlus} /> Add items
            </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
