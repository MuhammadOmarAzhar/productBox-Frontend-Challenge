import React, {useState} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Loader from '@/components/Loader';

const AddItems = () => {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    img: '',
  });

  const clearState = () => {
    setFormData({
      name: '',
      price: '',
      img: '',
    });
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

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const uploadItem = async () => {
    try {
      // Input validation
      if (!formData.name || !formData.price || !formData.img) {
        toast.warning('Please fill in all fields', {
          position: 'top-center',
        });
        return;
      }
      setLoader(true);
      await mutation.mutateAsync(formData);
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
              value={formData.img}
              name='img'
              onChange={handleInputChange}
            />
          </div>
          <div className='my-4'>
            <label className='block mb-2 text-sm font-medium text-gray-900'>
              {'Name'}
            </label>
            <input
              type='text'
              className='focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
              value={formData.name}
              name='name'
              onChange={handleInputChange}
            />
          </div>
          <div className='my-4'>
            <label className='block mb-2 text-sm font-medium text-gray-900'>
              {'Price (Rs.)'}
            </label>
            <input
              type='text'
              className='focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
              value={formData.price}
              name='price'
              onChange={handleInputChange}
            />
          </div>
          <button
            className='bg-gray-800 hover:bg-gray-600 w-full text-white font-semibold mb-4 py-2 px-4 relative'
            onClick={uploadItem}
            disabled={loader}
          >
            {loader ? (
              <div className='flex justify-center items-center'>
                <Loader />
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
