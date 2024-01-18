import React from 'react';
import {useRouter} from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/items');
  };

  const handleAddItem = () => {
    router.push('/add-items');
  };

  return (
    <div className='bg-gray-200 flex justify-center items-center h-screen'>
      <div className='flex-1 p-4'>
        <img
          src='/assets/store.jpg'
          alt='Store Image'
          className='w-full h-auto rounded-md'
        />
      </div>
      <div className='flex-1 p-4 text-center'>
        <h1 className='text-black text-4xl font-bold mb-4'>Store</h1>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold mr-4 py-2 px-4 rounded'
          onClick={handleGetStarted}
        >
          Get Started
        </button>
        <button
          className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
          onClick={handleAddItem}
        >
          Add items
        </button>
      </div>
    </div>
  );
};

export default Home;
