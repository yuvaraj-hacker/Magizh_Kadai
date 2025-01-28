import { Link } from 'react-router-dom';
import apiurl from '../../services/apiendpoint/apiendpoint';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const ProductImage = ({ images, productId }) => {
    const imageArray = Array.isArray(images) ? images : [images];

    return (
        <div className="relative flex items-center justify-center w-full h-full group-hover:scale-105 duration-300">
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
            <section className='min-h-[70vh] md:my-10'>
                <div className="p-4">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Link to="/profile">
                                <i className="block mt-1 fi fi-rr-angle-left lg:hidden"></i>
                            </Link>
                            <h2 className="text-lg font-semibold md:text-2xl">Saved Items</h2>
                        </div>
                        {wishlist.length > 0 && (
                            <button onClick={clearWishlist}
                                className='flex items-center gap-2 p-2 text-sm text-red-400 duration-200 bg-red-100 border rounded-full cursor-pointer md:text-base hover:scale-105'
                            >
                                <i className="fi fi-sr-trash"></i>
                                <p>Clear Items</p>
                            </button>
                        )}
                    </div>

                    {wishlist.length === 0 ? (
                        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg h-[500px]">
                            <div className="text-center">
                                <div className="mb-2 text-gray-400">
                                    <i className="fi fi-rr-bookmark"></i>
                                </div>
                                <p className="mb-2 text-lg text-gray-500 dark:text-white">No Saved Items To Show</p>
                                <Link to='/'>
                                    <button className="bg-[#540045] text-white px-4 py-2 rounded-md hover:bg-[#3a0030] transition-colors">
                                        Start Shopping
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {wishlist?.map((item, index) => (
                                <div key={item._id} className="relative bg-white group border rounded-xl shadow-md hover:shadow-xl duration-300 hover:-translate-y-1 active:scale-95">
                                   
                                    <div className="w-full h-full bg-cover p-4 flex flex-col justify-center items-center dark:shadow-slate-500 dark:shadow-lg  relative ">
                                        <button onClick={() => removeWishlistSelectedItem(item)} className="absolute z-10 text-red-500 transition-transform top-2 right-2 hover:scale-110" >
                                            <i className="fi fi-sr-trash border p-1 rounded-full pt-1.5 px-[7px] bg-white hover:bg-red-100"></i>
                                        </button>

                                        <Link to={`/product-details/${item.productId?._id}`} state={{ product: item.productId }}>
                                            <ProductImage images={item.productId?.Images} productId={item.productId?._id} />
                                        </Link>

                                       
                                       
                                        {/* <button onClick={() => handleAddToCart(item)}
                                            className="group/it absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 p-1 flex justify-center items-center border-[1.5px] rounded-full border-[#259c51] bg-white hover:bg-[#259c51] overflow-hidden shadow-md duration-300"
                                        >
                                            <i className="fi fi-rr-shopping-cart text-2xl h-[30px] max-w-10 w-full text-[#259c51] group-hover/it:text-white"></i>
                                        </button> */}
                                  <div className='flex flex-col justify-between h-full'>
                                    <div className="pl-1">
                                        <h2 className="mt-3 text-sm text-black md:text-base dark:text-white text-justify line-clamp-2">{item.productId?.Product_Name}</h2>
                                        <div className="flex items-center gap-3">
                                            {/* <p className="text-sm line-through text-black/60 sm:text-base"> ${item.productId?.Regular_Price}</p> */}
                                            <h3 className="font-semibold text-black md:text-lg shadow-white drop-shadow-md dark:text-white">${item.productId?.Sale_Price}</h3>
                                        </div>
                                    </div>
                                    <div className='flex justify-between'>
                                         <div className=" flex items-center gap-2"> 
                                            <Minus onClick={() => handleDecreaseQuantity(index)} className='p-1 border rounded-full hover:bg-gray-200 bg-white dark:text-black cursor-pointer'/>
                                            <span className="w-8 text-center dark:text-black">{item.Quantity}</span> 
                                            <Plus onClick={() => handleIncreaseQuantity(index)} className='p-1 border rounded-full hover:bg-gray-200 bg-white dark:text-black cursor-pointer'/>
                                        </div> 
                                        <ShoppingCart onClick={() => handleAddToCart(item)} className="group/it w-10 h-10 p-2 dark:text-black dark:hover:text-white bottom-0 right-0 
                                         flex justify-center items-center border-[1.5px] rounded-full border-[#259c51] bg-white hover:bg-[#259c51] hover:text-white overflow-hidden text-green-600
                                        shadow-md duration-300 cursor-pointer" />
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
