import {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {isEmpty} from 'lodash';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '@/redux/cartSlice';
import axios from 'axios';
import Loader from '@/components/Loader';

const Items = () => {
  const [loader, setLoader] = useState(true);
  const [itemList, setItemList] = useState([]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleAddToCart = (item) => {
    dispatch(addToCart({id: item.id, details: item}));
    toast.success('Item added to the cart!', {position: 'top-center'});
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/items');
      const items = [...response.data];
      setItemList(items);
    } catch (error) {
      console.error('Error fetching items', error);
      toast.error('Error fetching items', {
        position: 'top-center',
      });
    }
    setLoader(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='bg-gray-200 min-h-screen'>
      {loader ? (
        <Loader loading={true} />
      ) : (
        <div className='p-10'>
          <div className=' bg-white p-4 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
            {itemList.map((res) => {
              return (
                <div
                  key={res.id}
                  className='w-64 grid grid-cols-1 overflow-hidden mb-10'
                >
                  <div>
                    <img className='w-64 h-64 mb-4' src={res.img} alt='Item' />
                  </div>
                  <div className='w-64'>
                    <div className='text-black text-xl mb-2'>{res.name}</div>
                    <p className='text-gray-700'>Rs. {res.price}</p>
                    <button
                      className='bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 w-full mt-4'
                      onClick={() => handleAddToCart(res)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isEmpty(itemList) ? (
        <div className='text-gray-600 h-screen flex-1 text-center text-2xl'>
          No items available yet.
        </div>
      ) : null}
    </div>
  );
};

export default Items;
