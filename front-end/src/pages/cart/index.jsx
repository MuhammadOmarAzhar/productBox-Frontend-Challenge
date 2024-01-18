import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {removeFromCart} from '@/redux/cartSlice';
import {useRouter} from 'next/router';

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
    <div className='bg-gray-300 h-screen p-8'>
      <div className='container mx-auto p-6 bg-white rounded-lg'>
        <h2 className='text-2xl font-bold mb-4 text-gray-600 text-center'>
          Shopping Cart
        </h2>

        {isClient &&
          (cartItems.length === 0 ? (
            <p className='text-gray-600 text-center text-2xl'>
              Your cart is empty.
            </p>
          ) : (
            <div>
              {cartItems.map((item) => {
                const {details, quantity} = item;
                return (
                  <div key={item.id} className='flex items-center mb-4'>
                    <img
                      src={details.img}
                      alt={details.name}
                      className='w-28 h-28 object-cover mr-4 rounded'
                    />
                    <div className='flex-1'>
                      <h3 className='font-semibold text-black'>
                        {details.name}
                      </h3>
                      <p className='text-orange-600'>Rs. {details.price}</p>
                      <p className='text-gray-600'>Quantity: {quantity}</p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className='text-red-500 hover:text-red-700 underline cursor-pointer'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className='mt-4 grid grid-cols-1 w-full text-end'>
                <p className='font-semibold text-black'>Total Amount:</p>
                <p className='text-orange-600 mb-2'>Rs. {totalAmount}</p>
                <button
                  onClick={handleCheckout}
                  className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cart;
