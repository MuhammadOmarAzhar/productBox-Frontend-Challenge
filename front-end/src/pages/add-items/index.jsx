import React, {useState} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import {Grid} from 'react-loader-spinner';
import {useMutation, useQueryClient} from '@tanstack/react-query';

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

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      await axios.post('http://localhost:3000/items', data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries('items');
      clearState();
      setLoader(false);
      toast.success('Item added successfully', {
        position: 'top-center',
      });
    },
  });

  const uploadItem = async () => {
    try {
      setLoader(true);
      let data = {
        name,
        price,
        img: image,
      };

      await mutation.mutateAsync(data);
    } catch (error) {
      setLoader(false);
      toast.error('Failed to add item', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className='bg-gray-200 flex items-center justify-center h-screen'>
      <div className='bg-white shadow rounded-lg h-full w-full md:w-[40%] md:h-fit'>
        <div
          className='h-72 bg-cover bg-center'
          style={{backgroundImage: 'url("/assets/store1.jpg")'}}
        >
          <h1
            className='text-center text-white font-semibold bg-black text-xl p-2'
            style={{opacity: 0.7}}
          >
            Place your items for sale here!
          </h1>
        </div>

        <div className='px-8'>
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
            className='bg-gray-800 hover:bg-gray-600 w-full text-white font-semibold mb-4 py-2 px-4 relative'
            onClick={uploadItem}
            disabled={loader}
          >
            {loader ? (
              <div className='flex justify-center items-center'>
                <Grid
                  height='30'
                  width='30'
                  color='#FFFFFF'
                  ariaLabel='grid-loading'
                  radius='12.5'
                  wrapperStyle={{}}
                  wrapperClass=''
                  visible={true}
                />
              </div>
            ) : (
              'Add Item'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
