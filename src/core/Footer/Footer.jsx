import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RegisterContinueGoogle from '../../shared/Components/Register-ContiGoogle/RegisterContiGoogle';
import useAuth from '../../shared/services/store/useAuth';
import useCart from '../../shared/services/store/useCart';
import { useNavigate } from "react-router-dom";
import { useSidebar } from '../../Router/SidebarProvider';


export default function Footer({ setTogSidecat, TogSidecat }) {
   const { toggleSidebar } = useSidebar(); // Access toggle function
   const [visible, setVisible] = useState(false);
   const { isLoggedIn, userdetails, logout } = useAuth();
   const { cartItems, cartCount } = useCart();
   const navigate = useNavigate()
   const handleClick = (e) => {
      e.preventDefault(); // Prevent navigation from overriding click
      toggleSidebar();
   };


   const handleWishlistClick = (e) => {
      e.preventDefault();
      if (!isLoggedIn) {
         setVisible(true);
      } else {
         navigate('/saveditem');
      }
   };
   return (
      <>
         <section className='dark:bg-black'>

            {/* <section className=' max-w-[85rem] mx-auto px-5 pt-3 lg:pt-5 md:px-10'>
               <div className=''>
                  <div className=''>
                     <div className="bg-[url('/images/Footer/fooo.png')]   rounded-t-2xl bg-center ml-auto object-cover ">
                        <div className='grid flex-wrap p-3 font-semibold text-black xl:grid-cols-10 md:grid-cols-6 xsm:grid-cols-2 lg:p-5 lg:gap-5 gap-y-4'>
                           <div className='md:col-span-2 *:text-sm *:sm:text-base flex gap-1 lg:gap-3 items-center mx-auto '>
                              <img className='w-6 md:w-auto' src="/images/Footer/Delivery Time (1).png" alt="" />
                              <p className="text-xs md:text-base">Same Day
                                 Product Delivery</p>
                           </div>
                           <div className='md:col-span-2 *:text-sm *:sm:text-base flex gap-1 lg:gap-3 items-center mx-auto'>
                              <img className='w-6 md:w-auto' src="/images/Footer/Good Quality (1).png" alt="" />
                              <p className="text-xs md:text-base">100% Customer
                                 Satisfaction</p>
                           </div>
                           <div className='md:col-span-2 *:text-sm *:sm:text-base flex gap-1 lg:gap-3 items-center mx-auto'>
                              <img className='w-6 md:w-auto' src="/images/Footer/Computer Support (1).png" alt="" />
                              <p className="text-xs md:text-base">Help and Access
                                 is Our Mission</p>
                           </div>
                           <div className='  md:col-span-3 xl:col-span-2 *:text-sm *:sm:text-base flex gap-1 lg:gap-3 items-center mx-auto'>
                              <img className='w-7 md:w-auto' src="/images/Footer/Guarantee (1).png" alt="" />
                              <p className="text-xs md:text-base">100% Quality Products</p>
                           </div>
                           <div className='xsm:col-span-2 md:col-span-3 xl:col-span-2 *:text-sm *:sm:text-base flex gap-1 lg:gap-3 items-center mx-auto'>
                              <img className='w-6 md:w-auto' src="/images/Footer/Online Support.png" alt="" />
                              <p className="text-xs md:text-base">10 am to 9 pm  Support
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section> */}
            <section className='bg-primary   pb-[60px] lg:pb-0'>
               <div className='relative lg:px-10 md:py-10 py-5'>
                  <div className='max-w-[80rem] mx-auto text-white'>
                     <div className='grid md:grid-cols-2 grid-cols-1 gap-5 px-5 lg:grid-cols-8 xl:gap-16'>
                        <div className='lg:col-span-2 col-span-1 md:mx-auto justify-center mx-auto  flex  '>
                           <div className='flex flex-col justify-center gap-4 items-center'>
                              <div className='bg-white p-3 rounded-md'>
                                 <Link to='/'>
                                    <img className='cursor-pointer w-40' src="/images/Logo/Logo.png" alt="" />
                                 </Link>
                              </div>
                              <div className='space-y-2'>
                                 <div>
                                    <h1 className='text-secondary md:text-base'>Connect With Us</h1>
                                 </div>
                                 <div className='flex gap-3 justify-center'>
                                    <a href='https://www.facebook.com/people/Magizh-Kadai/61572463483920/' target='_blank'  >
                                       <img className='w-7' src="/images/Social/facebook.png" alt="" />
                                    </a>
                                    <a href='https://www.instagram.com/magizhkadai_official/?hl=en' target='_blank'>
                                       <img className='w-7' src="/images/Social/insta.png" alt="" />
                                    </a>
                                    {/* <a href='https://wa.me/918825695060' target='_blank' rel='noopener noreferrer'>
                                       <i className="fi fi-brands-whatsapp md:text-xl"></i>
                                    </a> */}
                                    <a href='https://www.youtube.com/@Magizhkadai' target='_blank' rel='noopener noreferrer'>
                                       <img className='w-7' src="/images/Social/youtube.png" alt="" />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                        <div className='md:mx-auto space-y-4 lg:col-span-2 col-span-1 mx-auto lg:text-left text-center'>
                           <h1 className='md:text-xl text-lg text-secondary'>Store and Sites</h1>
                           <div className=' text-sm space-y-3 '>
                              <p>  <Link to='/'><span className='hover:underline  w-fit'> Home </span> </Link></p>
                              <p>  <Link to='/products'> <span className='hover:underline  w-fit'> Products</span></Link></p>
                              {/* <p><Link to='/wishlist'> Wishlist </Link></p> */}
                              <p> <Link to='/cart'> <span className='hover:underline  w-fit'>Cart</span> </Link></p>
                           </div>
                        </div>
                        <div className=" md:mx-auto lg:col-span-2 col-span-1 space-y-4 lg:text-left text-center">
                           <h1 className="md:text-xl text-lg text-secondary">Policies</h1>
                           <div className=" space-y-3 text-sm  ">
                              <p>
                                 <Link to="/privacy-policy"> <span className='hover:underline  w-fit'>Privacy Policy</span>   </Link>
                              </p>
                              <p>
                                 <Link to="terms-and-conditions" >  <span className='hover:underline  w-fit'>Terms & Conditions</span>  </Link>
                              </p>
                              <p>
                                 <Link to="return-and-refund-policy" >  <span className='hover:underline  w-fit'> Return and Refund Policy </span> </Link>
                              </p>

                           </div>
                        </div>

                        <div className='lg:col-span-2 space-y-4 lg:text-left text-center' >
                           <p className="md:text-xl text-lg  text-secondary">Contact Information</p>
                           <div className='space-y-3 text-sm'>
                              <p >
                                 <span className="">Mobile Number: </span>
                                 <a href="https://wa.me/918807700218" target="_blank" rel="noopener noreferrer" className=" hover:underline w-fit">+91 88256 95060</a>
                              </p>
                              <p className="">
                                 <span>Email: </span>
                                 <a href="https://mail.google.com/mail/" target="_blank" rel="noopener noreferrer" className=" hover:underline">
                                    magizhkadai@gmail.com
                                 </a>
                              </p>
                              <p className=""> <span className=''>
                                 Address:   </span>Narayanan Nagar Road, <br /> Ramakrishna
                                 school Opposite, <br /> Villupuram 605 602.</p>
                           </div>
                           {/* <div className='relative'>
                              <input className='w-full p-2 pl-4 text-black rounded-sm focus:outline-none' type="text" placeholder='Email Address' />
                              <button className="absolute right-1 py-1 top-1  bg-[#38031d] text-white  hover:bg-black px-3 rounded-sm ">
                                 Subscribe
                              </button>
                           </div> */}

                        </div>
                     </div>
                  </div>
               </div>
               <hr className='' />
               <div className='justify-center gap-2 py-2 text-center text-white lg:py-4 md:text-base lg:flex'>
                  <p className='text-[10px] sm:text-sm'> © Magizh Kadai {new Date().getFullYear()} | Developed by <a href='https://thirstycrowz.com/' target='_blank'> <span className='underline cursor-pointer underline-offset-2'>Thirsty Crowz</span>  </a></p>
               </div>
            </section>

         </section>

         {/* mobile footer */}
         <section className='fixed bottom-0 left-0 z-40 w-full lg:hidden'>
            <div className='bg-primary'>
               <div className="  flex  justify-around items-center text-xl py-3 text-white  *:flex *:flex-col *:justify-center *:items-center">
                  <div className="cursor-pointer "> <Link to='/'> <i className="flex flex-col items-center fi fi-rs-house-chimney "></i><p className='text-xs '>Home</p> </Link></div>
                  <Link to='/products'>
                     <div className="cursor-pointer" >
                        <i className="fi fi-rs-shop flex flex-col items-center"></i><p className='text-xs '>Products</p>
                     </div>
                  </Link>
                  <div className="relative cursor-pointer">
                     <Link to="/cart" className="relative inline-block">
                        <div className="relative">
                           <i className="flex flex-col items-center fi fi-sr-shopping-cart"></i>
                           {cartItems && cartItems.length > 0 && (
                              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -top-2 -right-2">
                                 {cartItems.length}
                              </span>
                           )}

                           {cartCount > 0 && (
                              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -top-2 -right-2">
                                 {cartCount}
                              </span>
                           )}


                        </div>
                        <p className='text-xs'>Cart</p>
                     </Link>
                  </div>
                  <div onClick={() => { setTogSidecat(true) }} className="cursor-pointer"><i className="flex flex-col items-center fi fi-rs-category"></i><p className='text-xs '>Categories</p></div>

                  {/* {isLoggedIn ? (
                     <div className="cursor-pointer" onClick={handleClick}>
                        <i className="flex flex-col items-center fi fi-sr-user"></i>
                        <p className='text-xs'>Account</p>
                     </div>
                  ) : (
                     <div
                        className="cursor-pointer"
                        onClick={() => setVisible(true)}
                     >
                        <i className="flex flex-col items-center fi fi-sr-user"></i>
                        <p className='text-xs'>Login</p>
                     </div>
                  )} */}
               </div>
            </div>
         </section>

         {/* Only show the registration modal if not logged in */}
         {!isLoggedIn && (
            <RegisterContinueGoogle
               visible={visible}
               setVisible={setVisible}
            />
         )}


         <RegisterContinueGoogle visible={visible} setVisible={setVisible} />
      </>
   )
}
