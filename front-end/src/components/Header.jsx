import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import {useSelector} from 'react-redux';

const Header = () => {
  const cartItems = useSelector((state) => state.cart);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className='bg-gray-800 text-white p-4 flex justify-between items-center'>
      <div>
        <h1 className='text-2xl font-bold'>
          <Link href='/items'>
            <h1 className='text-white'>Store</h1>
          </Link>
        </h1>
      </div>

      <div className='flex gap-4'>
        <h1>
          <Link href='/'>
            <h1 className='text-white'>Home</h1>
          </Link>
        </h1>
        <h1>
          <Link href='/add-items'>
            <h1 className='text-white'>Add Items</h1>
          </Link>
        </h1>
      </div>

      <div>
        <Link href='/cart'>
          <div className='flex items-center text-xl cursor-pointer'>
            <FontAwesomeIcon icon={faShoppingCart} />
            {totalQuantity > 0 && (
              <span className='bg-red-500 text-white rounded-full px-2 ml-1'>
                {totalQuantity}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
