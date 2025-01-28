import { Link } from 'react-router-dom';
import apiurl from '../../services/apiendpoint/apiendpoint';

const ProductImage = ({ images, productId }) => {
    const imageArray = Array.isArray(images) ? images : [images];

    return (
        <div className="relative flex items-center justify-center w-full h-full">
            {imageArray.map((image, index) => (
                <img key={`${productId}-${index}`} src={`${apiurl()}/${image}`} alt={`Product ${index + 1}`} className={`${index === 0 ? 'block' : 'hidden'} object-contain  min-h-[140px]  max-h-[140px]`} />
            ))}
        </div>
    );
};

function WishList(props) {

    const { wishlist, clearWishlist, removeWishlistSelectedItem, handleIncreaseQuantity, handleDecreaseQuantity, handleAddToCart } = props;

    return (
        <section className='min-h-[70vh] my-5 md:my-10'>
            <div className="px-5 ">
                <div className="flex flex-wrap items-center justify-between mb-4 ">
                    <div className='flex items-center gap-3'>
                        <h2 className="text-lg font-semibold md:text-2xl">Saved Items</h2>
                        <span className="px-3 py-1 text-sm bg-gray-100 rounded-full dark:text-black">{wishlist.length} items </span>
                    </div>
                    {wishlist.length > 0 && (
                        <button onClick={clearWishlist} className='flex items-center gap-2 p-2 text-sm text-red-400 duration-200 bg-red-100 border rounded-full cursor-pointer md:text-base hover:scale-105'  >
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
                            <p className="mb-2 text-lg text-gray-500">No Saved Items To Show</p>
                            <Link to='/'>
                                <button className="bg-[#540045] text-white px-4 py-2 rounded-md hover:bg-[#3a0030] transition-colors">
                                    Start Shopping
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {wishlist?.map((item, index) => (
                            <div key={item._id} className="relative px-4 pt-8 pl-6 duration-300 md:pt-10 md:pl-10 group">
                                <img className="absolute -z-10 -top-0 -left-0 group-hover:animate-wiggle" src="/images/Design/rangoli 16.png" alt="" />
                                <div className="w-full bg-cover p-4 min-h-[160px]  max-h-[160px] bg-white flex justify-center items-center shadow-md border rounded-lg relative cursor-pointer">
                                    <button onClick={() => removeWishlistSelectedItem(item)} className="absolute text-lg text-red-500 transition-transform top-2 right-2 hover:scale-110" >
                                        <i className="fi fi-sr-trash"></i>
                                    </button>

                                    <Link to={`/product-details/${item.productId?._id}`} state={{ product: item.productId }}>
                                        <ProductImage images={item.productId?.Images} productId={item.productId?._id} />
                                    </Link>

                                    <div className="absolute flex items-center gap-2 bottom-2 left-4">
                                        <button onClick={() => handleDecreaseQuantity(index)} className="px-2 text-gray-600 bg-gray-100 border rounded-full ">
                                            -
                                        </button>
                                        <span className="text-center w-9">{item.Quantity}</span>
                                        <button onClick={() => handleIncreaseQuantity(index)} className="px-2 text-gray-600 bg-gray-100 border rounded-full" >
                                            +
                                        </button>
                                    </div>

                                    <button onClick={() => handleAddToCart(item)} className="group/it absolute bottom-0 right-0 translate-y-1/3 translate-x-1/3 p-1 flex justify-center items-center border-[1.5px] rounded-full border-[#259c51] bg-white hover:bg-[#259c51] overflow-hidden shadow-md duration-300"  >
                                        <i className="fi fi-rr-shopping-cart text-base   px-2 py-1  max-w-10 w-full text-[#259c51] group-hover/it:text-white"></i>
                                    </button>
                                </div>
                                <div className="pl-1">
                                    <h2 className="mt-3 text-sm text-black md:text-base">{item.productId?.Product_Name}</h2>
                                    <div className="flex items-center gap-3">
                                        <p className="text-sm line-through text-black/60 sm:text-base"> ${item.productId?.Regular_Price}</p>
                                        <h3 className="font-semibold text-black md:text-lg shadow-white drop-shadow-md">${item.productId?.Sale_Price}</h3>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default WishList;