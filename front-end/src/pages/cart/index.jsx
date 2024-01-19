import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart} from '@/redux/cartSlice';
import {useRouter} from 'next/router';
import {Divider} from '@mui/material';
import Link from 'next/link';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart({id: itemId}));
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const {details, quantity} = item;
    return total + (details.price || 0) * quantity;
  }, 0);

  const handleCheckout = () => {
    router.push(`/checkout?totalAmount=${totalAmount}`);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='bg-gray-300 flex gap-10 min-h-screen p-8'>
      <div className='p-6 bg-white w-3/4 min-h-screen'>
        <h2 className='text-2xl font-bold mb-4 text-gray-600 uppercase text-center'>
          Shopping Cart
        </h2>

        {isClient &&
          (cartItems.length === 0 ? (
            <div className='mt-20 grid'>
              <div className='w-full flex justify-center items-center'>
                <img
                  src='/assets/cart.png'
                  alt='Store Image'
                  className='max-w-64 max-h-64'
                />
              </div>
              <h1 className='text-gray-600 text-center text-2xl'>
                Your cart is empty.
              </h1>
              <Link href='/items'>
                <p className='text-blue-600 text-center hover:underline text-lg'>
                  Browse items here!
                </p>
              </Link>
            </div>
          ) : (
            <div className='flex'>
              <table className='w-full'>
                <thead className='bg-gray-800 text-white'>
                  <tr>
                    <th className='px-2 text-left'>Products</th>
                    <th className='px-2 text-left'>Price</th>
                    <th className='px-2 text-left'>Quantity</th>
                    <th className='px-2 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody className='text-black'>
                  {cartItems.map((item) => {
                    const {details, quantity} = item;
                    return (
                      <tr key={item.id} className='border-b'>
                        <td className='p-2'>
                          <div className='flex items-center'>
                            <img
                              src={details.img}
                              alt={details.name}
                              className='w-12 h-12 object-cover rounded mr-2'
                            />
                            <h3 className='font-semibold'>{details.name}</h3>
                          </div>
                        </td>
                        <td className='p-2'>Rs. {details.price}</td>
                        <td className='p-2'>{quantity}</td>
                        <td className='p-2'>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className='text-red-600 hover:text-red-700 cursor-pointer'
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
      </div>
      <div className='grid grid-cols-1 bg-white p-4 h-52 w-1/4'>
        {isClient && (
          <>
            <div className='flex justify-between'>
              <p className='font-semibold text-black'>Subtotal: </p>
              <p className='text-black font-semibold'>Rs. {totalAmount}</p>
            </div>
            <div className='flex justify-between'>
              <p className=' text-black'>Shipping: </p>
              <p className='text-gray-600 '>Enter Address</p>
            </div>
            <div className='flex justify-between'>
              <p className=' text-black'>Duties & Taxes: </p>
              <p className='text-gray-600 '>Due Upon Delivery</p>
            </div>
            <Divider />
            <div className='flex justify-between'>
              <p className='font-semibold text-black'>You Pay: </p>
              <p className='text-gray-600'>Rs. {totalAmount}</p>
            </div>
            <button
              onClick={handleCheckout}
              className='bg-gray-800 hover:bg-gray-600 text-white font-semibold py-2 px-4'
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
