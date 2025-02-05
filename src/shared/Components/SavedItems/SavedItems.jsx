import { Link } from 'react-router-dom';
import apiurl from '../../services/apiendpoint/apiendpoint';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const ProductImage = ({ images, productId }) => {
    const imageArray = Array.isArray(images) ? images : [images];

    return (
        <div className="relative flex items-center justify-center w-full h-full ">
            {imageArray.map((image, index) => (
                <img key={`${productId}-${index}`} src={`${apiurl()}/${image}`} alt={`Product ${index + 1}`} className={`${index === 0 ? 'block' : 'hidden'} object-contain h-36`} />
            ))}
        </div>
    );
};

function SavedItems(props) {
    const { wishlist, clearWishlist, removeWishlistSelectedItem, handleIncreaseQuantity, handleDecreaseQuantity, handleAddToCart } = props;
    return (
        <>
            <section className='min-h-[70vh] md:my-5 my-5 '>
                <div className="p-4">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                        {wishlist.length > 0 && (
                            <div className="flex items-center">
                                <Link to="/profile">
                                    <i className="block mt-1 fi fi-rr-angle-left lg:hidden"></i>
                                </Link>
                                <h2 className="text-lg font-semibold md:text-2xl">Saved Items</h2>
                            </div>
                        )}
                        {wishlist.length > 0 && (
                            <button onClick={clearWishlist}
                                className='flex items-center gap-2 p-2 text-sm text-third duration-200   border rounded-full cursor-pointer md:text-base  '
                            >
                                <i className="fi fi-sr-trash flex justify-center items-center"></i>
                                <p>Clear All</p>
                            </button>
                        )}
                    </div>

                    {wishlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[60vh]">
                            <div className="text-center">
                                <div className="mb-2 text-gray-400">
                                    <i className="fi fi-ss-bookmark"></i>
                                </div>
                                <p className="mb-2 text-lg text-gray-500 dark:text-white">Nothing Saved Yet</p>
                                <Link to='/'>
                                    <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition-colors">
                                        Find Your Favourites
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            {wishlist?.map((item, index) => (
                                <div key={item._id} className="relative p-3 bg-white group border shadow-md rounded-xl   ">

                                    <div className="w-full h-full bg-cover  flex flex-col justify-center items-center dark:shadow-slate-500 dark:shadow-lg  relative ">
                                        <button onClick={() => removeWishlistSelectedItem(item)} className="absolute z-10 text-red-500 transition-transform top-2 right-2  " >
                                            <i className="fi fi-sr-trash text-xl    "></i>
                                        </button>

                                        <Link to={`/product-details/${item.productId?._id}`} state={{ product: item.productId }}>
                                            <ProductImage images={item.productId?.Images} productId={item.productId?._id} />
                                        </Link>



                                        {/* <button onClick={() => handleAddToCart(item)}
                                            className="group/it absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 p-1 flex justify-center items-center border-[1.5px] rounded-full border-[#259c51] bg-white hover:bg-[#259c51] overflow-hidden shadow-md duration-300"
                                        >
                                            <i className="fi fi-rr-shopping-cart text-2xl h-[30px] max-w-10 w-full text-[#259c51] group-hover/it:text-white"></i>
                                        </button> */}
                                        <div className='flex flex-col justify-between h-full space-y-4'>
                                            <div className="pl-1">
                                                <h2 className="mt-3 text-sm text-black md:text-base dark:text-white text-justify line-clamp-2">{item.productId?.Product_Name}</h2>
                                                <div className="flex items-center gap-3">
                                                    {/* <p className="text-sm line-through text-black/60 sm:text-base"> ${item.productId?.Regular_Price}</p> */}
                                                    <h3 className="font-semibold text-black md:text-lg shadow-white drop-shadow-md dark:text-white">${item.productId?.Sale_Price}</h3>
                                                </div>
                                            </div>
                                            <div className='flex justify-between'>
                                                <div className=" flex items-center gap-2">
                                                    <Minus onClick={() => handleDecreaseQuantity(index)} className=' border rounded-full hover:bg-gray-200 bg-white dark:text-black cursor-pointer' />
                                                    <span className="w-8 text-center dark:text-black">{item.Quantity}</span>
                                                    <Plus onClick={() => handleIncreaseQuantity(index)} className=' border rounded-full hover:bg-gray-200 bg-white dark:text-black cursor-pointer' />
                                                </div>
                                                <ShoppingCart onClick={() => handleAddToCart(item)} className="group/it w-5 h-5 dark:text-black dark:hover:text-white bottom-0 right-0  flex justify-center items-center  text-primary overflow-hidden   cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default SavedItems
