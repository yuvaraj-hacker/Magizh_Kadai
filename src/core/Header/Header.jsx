import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import RegisterContinueGoogle from '../../shared/Components/Register-ContiGoogle/RegisterContiGoogle';
import useAuth from '../../shared/services/store/useAuth';
import useCart from '../../shared/services/store/useCart';
import { useDarkMode } from '../../shared/services/DarkMode/DarkModeContext';
import { Sun, Moon } from 'lucide-react';
import SearchBar from '../../shared/Components/searchbar/searchbar';
// import DeliveryPickupModal from '../../shared/Components/Header/DeliveryPickupModal';
import { getWishlistItems } from '../../shared/services/wishlist/wishlist';
import { apigetallcategory } from '../../shared/services/apicategory/apicategory';
import NewForm from '../../shared/Components/Register-ContiGoogle/NewFormGoogle';
import { useSidebar } from '../../Router/SidebarProvider';

export default function Header(props) {

  const { languages, ScrollToTop, handleLogout, wishlistData, setWishlistData, getDisplayLetter, ToggleFn, Toggle, visible, setVisible, showUserDropdown, setShowUserDropdown,
    openform } = props;

  const { cartItems, cartCount } = useCart();
  const { toggleSidebar } = useSidebar(); // Access toggle function
  const [currentLang, setCurrentLang] = useState('English');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn, userdetails, } = useAuth();
  const [translateInitialized, setTranslateInitialized] = useState(false);
  const navigate = useNavigate()
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [location, setLocation] = useState(localStorage.getItem('selectedLocation') || '');
  const [deliveryOption, setDeliveryOption] = useState(localStorage.getItem('purchaseType') || '');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [opencategories, setOpenCategories] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(!location || !deliveryOption);
  const today = new Date(); // for date
  const nextWeekStartDate = new Date(today);
  nextWeekStartDate.setDate(today.getDate() + 7);

  const userDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  const [prevWishlistCount, setPrevWishlistCount] = useState(0);


  const getWishlistItem = useCallback(async () => {
    if (userdetails?.Email) {
      const res = await getWishlistItems(userdetails.Email);
      setWishlistData(res.response);
      { console.log(res.response) }
    }
  }, [userdetails?.Email, userdetails?.Quantity]);  // Dependency on userdetails.Email

  // Effect to fetch wishlist items upon login
  useEffect(() => {
    if (isLoggedIn) {
      getWishlistItem();
    } else {
      setWishlistData([]);  // Clear wishlist data on logout
    }
  }, [isLoggedIn, getWishlistItem]);
  //   useEffect(() => {
  //     if (isMounted) {
  //         getWishlistItem();
  //     }
  //     return () => { isMounted = false; };
  // }, []);

  useEffect(() => {
    { console.log(wishlistData.length) }
    const currentWishlistCount = wishlistData?.length || 0;
    if (currentWishlistCount > prevWishlistCount) {
      setIsWishlistAnimating(true);
      const timer = setTimeout(() => setIsWishlistAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevWishlistCount(currentWishlistCount);
  }, [wishlistData?.length]);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setVisible(true);
    } else {
      navigate('/saveditem');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdowns on route change
  useEffect(() => {
    setShowUserDropdown(false);
    setShowLangDropdown(false);
  }, [location]);

  useEffect(() => {
    if (!location) {
      setIsLocationModalOpen(true);
    }
    else if (!deliveryOption) {
      setIsDeliveryModalOpen(true);
    }
  }, [location, deliveryOption]);

  useEffect(() => {
    // Check if location or delivery option is not set
    if (!location || !deliveryOption) {
      setIsDeliveryModalOpen(true);
      setShowUserDropdown(false);
      setShowLangDropdown(false);
    }
  }, [location, deliveryOption]);


  const handleDeliveryOptionSelect = (details) => {
    const { option, location } = details;
    setDeliveryOption(option);
    setLocation(location);
    localStorage.setItem('purchaseType', option);
    localStorage.setItem('selectedLocation', location);
    setIsDeliveryModalOpen(false);
  };

  useEffect(() => {
    // Wait for Google Translate to initialize
    const checkTranslateInit = setInterval(() => {
      if (window.google?.translate?.TranslateElement) {
        setTranslateInitialized(true);
        clearInterval(checkTranslateInit);
      }
    }, 100);

    return () => clearInterval(checkTranslateInit);
  }, []);

  const handleLanguageClick = (lang) => {
    setCurrentLang(lang.name);
    setShowLangDropdown(false);

    if (translateInitialized) {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = lang.code;
        select.dispatchEvent(new Event('change'));
      }
    }
  };


  const onclickcategories = async () => {
    setOpenCategories(!opencategories)
    const res = await apigetallcategory()
    setCategories(res.resdata)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header>
        <div className={`fixed lg:z-50 z-40 w-full ml-auto ${scrolled ? 'shadow-md' : 'shadow-md'} `}>
          <div className='flex w-full bg-white dark:bg-black'>
            <div className='inline-flex flex-row-reverse w-full h-full px-3 lg:flex-row'>
              <div className='flex items-center  w-full justify-between lg:py-4 py-2'>
                {/* logo */}
                <div className='flex items-center lg:px-5 rounded-r-md'>
                  <Link to={'/'} onClick={ScrollToTop}><img src="/images/Logo/Logo.png" alt="" className='w-24 p-1 min-w-24 lg:w-36' />
                  </Link>
                </div>
                {/* search */}
                <div className={`  lg:max-w-[40vw] lg:w-full z-10`}> <SearchBar categories={categories} onclickcategories={onclickcategories} opencategories={opencategories} setOpenCategories={setOpenCategories} /></div>
                <div className='hidden flex-wrap gap-10 lg:flex md:flex-nowrap lg:px-5'>
                  {/* icons */}
                  <div className='items-center justify-center hidden gap-5 text-xl text-gray-400 lg:flex'>
                    <i onClick={ToggleFn} className="cursor-pointer fi fi-sr-settings lg:hidden"></i>
                    <Link to='/'>
                      <i className="fi fi-ss-house-chimney"></i>
                    </Link>
                    <Link to='/products'>
                      <i className="fi fi-rs-shop"></i>
                    </Link>
                    <div onClick={handleWishlistClick} className="relative cursor-pointer">
                      <div className="relative">
                        {isWishlistAnimating && (
                          <div className="absolute inset-0 duration-300 bg-red-100 rounded-full opacity-50 animate-ping"></div>
                        )}
                        <div className={`relative flex items-center justify-center transition-all duration-300 ease-in-out
                          ${isWishlistAnimating ? 'scale-125' : 'scale-100'}`}
                        >
                          <i className={`fi fi-bs-heart ${isWishlistAnimating ? 'text-red-500' : ''
                            }`}></i>
                          {/* <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -right-3 -top-3">
                          { wishlistData && wishlistData?.length > 0 ? wishlistData.length : '0' }
                        </span> */}
                        </div>

                      </div>
                    </div>
                    <Link to="/cart">
                      <div className='relative'>
                        <i className="fi fi-sr-shopping-cart"></i>
                        <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -right-3 -top-3">
                          {cartItems && cartItems?.length > 0 ? cartItems?.length : cartCount}
                        </span>
                      </div>

                    </Link>
                    <button onClick={toggleDarkMode} className="p-2  rounded-full hover:bg-primary-dark dark:hover:bg-gray-700" aria-label="Toggle dark mode" >
                      {isDarkMode ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </button>
                    <div className="relative" ref={userDropdownRef}>
                      <Link onClick={openform}>
                        {userdetails ? (
                          <div className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full bg-secondary ring-2 ring-white">
                            <span className="text-lg font-bold text-white">
                              {getDisplayLetter()}
                            </span>
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-100 ring-2 ring-white">
                            <i className="text-xl text-gray-500 fi fi-rr-user"></i>
                          </div>
                        )}

                      </Link>

                      {showUserDropdown && isLoggedIn && (
                        <div className="absolute right-0 z-50 mt-2 bg-white rounded-lg shadow-lg dark:bg-gray-600 w-72">
                          {/* User info header */}
                          <div className="p-4 border-b">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full dark:bg-white dark:text-secondary">
                                {userdetails?.First_Name?.charAt(0).toUpperCase()}
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-600 dark:text-white">{userdetails?.First_Name}</h3>
                                <p className="text-sm text-gray-600 dark:text-white">{userdetails?.Email}</p>
                                <p className="text-xs text-gray-500 dark:text-white">ID: {userdetails?._id?.slice(-8)}</p>
                              </div>
                            </div>
                          </div>
                          {/* Menu items */}
                          <div className="py-2">
                            {isLoggedIn && userdetails?.Role === 'Admin' && (
                              <Link to="/admin/home" className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                <i className="fi fi-rr-home dark:text-white"></i>
                                <span className="text-sm dark:text-white">Admin Dashboard</span>
                              </Link>
                            )}
                            {isLoggedIn && userdetails?.Role !== 'Admin' && (
                              <>
                                {/* <Link to="myorder" className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                  <i className="fi fi-rr-shopping-bag dark:text-white"></i>
                                  <span className="text-sm dark:text-white">My orders</span>
                                </Link> */}
                                <Link to="/dashboard" onClick={toggleSidebar} className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                  <i className="fi fi-ts-book-user dark:text-white flex justify-center items-center"></i>
                                  <span className="text-sm dark:text-white">My Account</span>
                                </Link>
                                <Link to="/myorder" className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                  <i className="fi fi-rr-shopping-bag dark:text-white  flex justify-center items-center"></i>
                                  <span className="text-sm dark:text-white">My Orders</span>
                                </Link>
                                <Link to='/help-center' className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                  <i className="fi fi-rr-interrogation dark:text-white  flex justify-center items-center"></i>
                                  <span className="text-sm dark:text-white">Help center</span>
                                </Link>
                                {/*
                                <Link className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50">
                                  <i className="fi fi-rr-users"></i>
                                  <span className="text-sm">Refer Friends, Get $20</span>
                                </Link> */}
                                {/* <Link to="/setting" className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                  <i className="fi fi-rr-settings dark:text-white"></i>
                                  <span className="text-sm dark:text-white">Settings</span>
                                </Link>
                                <Link to='/help-center' className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                  <i className="fi fi-rr-interrogation dark:text-white"></i>
                                  <span className="text-sm dark:text-white">Help center</span>
                                </Link> */}
                              </>
                            )}
                            <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400" >
                              <i className="fa-solid fa-person-running dark:text-white"></i>
                              <span className="text-sm dark:text-white">Log out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <RegisterContinueGoogle visible={visible} setVisible={setVisible} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* <DeliveryPickupModal isOpen={isDeliveryModalOpen} onClose={() => setIsDeliveryModalOpen(false)} onSelectOption={handleDeliveryOptionSelect} /> */}


    </>
  )
}
