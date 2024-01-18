import React, {useState} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';

const AddItems = () => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  const clearState = () => {
    setImage('');
    setName('');
    setPrice('');
  };

  const uploadItem = async () => {
    try {
      setLoader(true);
      let data = {
        name,
        price,
        img: image,
      };

      await axios.post('http://localhost:3000/items', data);
      clearState();
      setLoader(false);
      toast.success('Item added successfully', {
        position: 'top-center',
      });
    } catch (error) {
      toast.error('Failed to add item', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className='bg-gray-200 flex items-center justify-center h-screen'>
      <div className='bg-white shadow rounded-lg p-8 w-full md:w-[40%] h-full md:h-auto'>
        <div className='py-6 px-6 lg:px-8'>
          <h3 className='-mt-6 -ml-7 text-xl font-medium text-gray-900 text-center'>
            Add Items
          </h3>
        </div>
        <div className='my-4'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>
            {'Image Url'}
          </label>
          <input
            type='text'
            className='focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label className='block mb-2 text-sm font-medium text-gray-900'>
            {'Name'}
          </label>
          <input
            type='text'
            className='focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='my-4'>
          <label className='blockmb-2 text-sm font-medium text-gray-900'>
            {'Price (Rs.)'}
          </label>
          <input
            type='text'
            className='focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-700 w-full text-white font-semibold py-2 px-4 rounded relative'
          onClick={uploadItem}
          disabled={loader}
        >
          {loader ? 'Loading...' : 'Add Item'}
        </button>
      </div>
    </div>
  );
};

export default AddItems;
