import React, {useEffect, useState} from 'react';
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Button,
} from '@mui/material';
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
        <h2 className='text-2xl font-bold mb-4 text-gray-600 text-center'>
          Checkout
        </h2>
        <div className='text-black grid gap-3'>
          <FormControl component='fieldset'>
            <RadioGroup
              row
              aria-label='payment-method'
              name='payment-method'
              value={paymentMethod}
              onChange={handlePaymentChange}
            >
              <div>
                <div className='hover:shadow-lg border rounded-lg px-2 mb-2'>
                  <FormControlLabel
                    value='cashOnDelivery'
                    control={<Radio />}
                    label='Cash on Delivery'
                  />
                </div>
                <div className='hover:shadow-lg border rounded-lg px-2 mb-2'>
                  <FormControlLabel
                    value='cardPayment'
                    control={<Radio />}
                    label='Card Payment'
                  />
                </div>
              </div>
            </RadioGroup>
          </FormControl>
          <div className='flex-1 sm:flex items-center justify-between w-full gap-3'>
            <p className='font-semibold text-black mb-2 sm:mb-0'>
              Total Amount: Rs. {totalAmount}
            </p>
            <Button
              variant='contained'
              className='bg-blue-500'
              onClick={handlePayment}
            >
              Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
