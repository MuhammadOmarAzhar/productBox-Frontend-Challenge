import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Swal from 'sweetalert2';
import {useDispatch} from 'react-redux';
import {resetCart} from '@/redux/cartSlice';

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const amount = parseFloat(router.query.totalAmount) || 0;
    setTotalAmount(amount);
  }, [router.query.totalAmount]);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePayment = () => {
    Swal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      text: `Total Amount: Rs. ${totalAmount}`,
    }).then(() => {
      dispatch(resetCart());
      router.push('/items');
    });
  };

  return (
    <div className='bg-gray-300 h-screen p-8'>
      <div className='container mx-auto p-6 bg-white rounded-lg'>
        <h2 className='text-2xl font-bold mb-4 uppercase text-gray-600 text-center'>
          Checkout
        </h2>
        <div className='text-black grid gap-3'>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>
              Payment Method
            </label>
            <div className='flex gap-3'>
              <div>
                <label className='flex items-center cursor-pointer'>
                  <input
                    type='radio'
                    name='payment-method'
                    value='cashOnDelivery'
                    checked={paymentMethod === 'cashOnDelivery'}
                    onChange={handlePaymentChange}
                  />
                  <span className='ml-2'>Cash on Delivery</span>
                </label>
              </div>
              <div>
                <label className='flex items-center cursor-pointer'>
                  <input
                    type='radio'
                    name='payment-method'
                    value='cardPayment'
                    checked={paymentMethod === 'cardPayment'}
                    onChange={handlePaymentChange}
                  />
                  <span className='ml-2'>Card Payment</span>
                </label>
              </div>
            </div>
          </div>
          <div className='flex items-center justify-between gap-3'>
            <p className='font-semibold text-black'>
              Total Amount: Rs. {totalAmount}
            </p>
            <button
              className='bg-gray-800 text-white px-4 py-2 rounded'
              onClick={handlePayment}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
