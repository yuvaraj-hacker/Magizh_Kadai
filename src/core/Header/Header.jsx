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
import { useMemo } from "react";
import { Search, X, Loader2, TrendingUp, Tag, ShoppingBag, Wand } from "lucide-react";
import { searchProducts } from '../../shared/services/apiproducts/apiproduct';
import apiurl from '../../shared/services/apiendpoint/apiendpoint';

export default function Header(props) {

  const { languages, ScrollToTop, handleLogout, wishlistData, setWishlistData, getDisplayLetter, ToggleFn, Toggle, visible, setVisible, showUserDropdown, setShowUserDropdown,
    openform } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [expandSearch, setExpandSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exactMatches, setExactMatches] = useState([]);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);

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
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [opencategories, setOpenCategories] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(!location || !deliveryOption);
  const today = new Date(); // for date
  const nextWeekStartDate = new Date(today);
  nextWeekStartDate.setDate(today.getDate() + 7);
  const userDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  const [prevWishlistCount, setPrevWishlistCount] = useState(0);


  const allCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await apigetallcategory();
      setCategories(res.resdata);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    allCategories();
  }, [allCategories]);

  const sortedCategories = categories
    .filter(category => category.Category_Name !== "Everything" && category.Category_Name !== "All Categories")
    .sort((a, b) => {
      if (a.Category_Name === "Drinkware/Bottles") return -1;
      if (b.Category_Name === "Drinkware/Bottles") return 1;
    });



  const debouncedSearch = useMemo(() => {
    let timeoutId;
    return async (value) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        if (value.trim().length > 0) {
          try {
            setIsLoading(true);
            const results = await searchProducts(value);

            // Find exact matches
            const exactMatchedProducts = results.filter(product =>
              product.Product_Name.toLowerCase() === value.toLowerCase()
            );

            setExactMatches(exactMatchedProducts);
            setSearchResults(results);
            setIsLoading(false);
            setShowResults(results.length > 0);
          } catch (error) {
            console.error("Error fetching search results:", error);
            setSearchResults([]);
            setExactMatches([]);
            setIsLoading(false);
          }
        } else {
          setSearchResults([]);
          setExactMatches([]);
          setShowResults(false);
          setIsLoading(false);
        }
      }, 300);
    };
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Clear search input
  const clearSearch = () => {
    console.log("workk")
    setExpandSearch(false)
    setSearchTerm("");
    setSearchResults([]);
    setExactMatches([]);
    setShowResults(false);
  };

  // Handle clicking on a search result
  const handleResultClick = (product) => {
    setShowResults(false);
    setSearchTerm('');
    if (product.Product_Name) {
      navigate(`/product-details/${product._id}`);
    } else {
      let searchUrl = `/products?category=${encodeURIComponent(product.Category)}`;
      if (product.Sub_Category) {
        searchUrl += `&subcategory=${encodeURIComponent(product.Sub_Category)}`;
      }
      searchUrl += `&Product_Name=${encodeURIComponent(product.Product_Name)}`;
      navigate(searchUrl);
    }
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) { setShowResults(false); }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) { setOpenCategories(false); }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get product image or default
  const getProductImage = (images) => {
    return images && images.length > 0
      ? `${apiurl()}/${images[0]}`
      : '/path-to-default-product-image.jpg';
  }

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
      navigate('/wishlist');
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
  const AllCategories = () => (
    <>  <div className={` max-h-[50vh] w-64 bg-white rounded-xl border cursor-default overflow-auto`}>
      <ul className="divide-y p-2 hover:*:bg-gray-100 *:rounded-lg" >
        {categories
          .filter((category) => category.Category_Name !== "All Categories" && category.Category_Name !== "Everything")
          .map((category) => (
            <li key={category._id} className="group py-1">
              <Link to={`${category.Category_Name == 'All Categories' ? '/products' : `/products?category=${category.Category_Name}`}`}>
                <div className="flex gap-2 justify-start items-center p-0.5 overflow-hidden">
                  <img src={`${apiurl()}/${category.Images[0]}`} alt="" className="lg:w-14 w-10 rounded-lg group-hover:scale-105 duration-300" />
                  <h5 className="whitespace-pre-wrap text-sm text-gray-500">{category.Category_Name}</h5>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
    </>
  )
  return (
    <>
      <header>
        <div className={`fixed lg:z-50 z-40 w-full ml-auto ${scrolled ? 'shadow-md' : 'shadow-md'} `}>
          <div className={`flex w-full bg-gray-50 dark:bg-black ${scrolled ? 'shadow-md' : 'shadow-md'} `}>
            <div className='inline-flex flex-row-reverse w-full h-full  2xl:px-10 px-2 md:px-5 lg:flex-row'>
              <div className='flex items-center relative  w-full justify-between  '>
                {/* logo */}
                <div className='flex items-center  rounded-r-md'>
                  <Link to={'/'} onClick={ScrollToTop}><img src="/images/Logo/Logo.png" alt="" className='w-24 p-1 min-w-24 lg:w-36' />
                  </Link>
                </div>
                {/* search */}
                <div className={`lg:max-w-[30vw] lg:w-full z-10 lg:static absolute  right-0 `}>
                  <div className=" ">
                    <div className={` ${expandSearch ? 'w-[70vw] lg:w-auto' : 'w-10 h-10'} ease-in  duration-300 float-right overflow-hidden h-auto z-50 flex items-center  border border-primary lg:px-1 lg:bg-primary justify-between w-full lg:*:py-1.5      rounded-full dark:bg-gray-800 dark:border-gray-700`}>
                      {isLoading ? (
                        <Loader2 className="lg:hidden animate-spin w-10 h-10 mr-2 text-primary dark:text-white" />
                      ) : (
                        <Search onClick={() => setExpandSearch(true)} className="lg:hidden w-8 h-8 bg-primary dark:bg-red-800 !p-2 rounded-full text-white" />
                      )}
                      <input ref={searchRef} type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for products.."
                        className={`${expandSearch ? 'pl-4 w-[50vw]' : 'w-0 '} duration-300 lg:w-full p-0 lg:p-2 lg:pl-4 text-sm placeholder-gray-400 lg:bg-white rounded-3xl  bg-transparent focus:outline-none dark:text-white dark:placeholder-gray-300`}
                        onFocus={() => searchResults.length > 0 && setShowResults(true)} />
                      {(searchTerm || expandSearch) ? (
                        <i className="fi fi-rr-cross-small lg:text-gray-300 lg:block  text-black    cursor-pointer px-2 lg:mt-1    flex justify-center items-center lg:bg-primary" onClick={clearSearch}></i>
                      ) :
                        (<i className="fi fi-rr-search   text-gray-300 lg:block hidden cursor-pointer px-2 mt-1    bg-primary  flex justify-center items-center" onClick={() => { setTimeout(() => searchRef.current?.focus(), 100); }}></i>
                        )}
                    </div>
                  </div>
                </div>
                {showResults && searchTerm.trim().length > 0 && (
                  <div ref={searchRef} className="absolute left-0 top-10 lg:top-16 right-0 z-50 lg:p-4 p-0 mt-2 bg-white dark:bg-gray-600 border-2 border-[#38031D]/10 rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
                    {searchResults.length === 0 ? (
                      <div className="flex flex-col items-center justify-center lg:p-8 p-2 text-center bg-gray-100 rounded-xl">
                        <div className="relative ">
                          <img className="w-40" src="/images/Design/nofound.png" alt="" />
                        </div>
                        <h3 className="lg:text-2xl text-base font-bold text-gray-700 mb-3 dark:text-white">
                          Oops! No Products Found
                        </h3>
                        <p className="max-w-xs mb-4 text-sm text-gray-600 dark:text-white">
                          "No results match your search. Try something else!"
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Exact Matches Section */}
                        {exactMatches.length > 0 && (
                          <div>
                            <div className="flex items-center mb-3 pl-2 text-[#38031D]">
                              <ShoppingBag className="w-5 h-5 mr-2 dark:text-white" />
                              <h3 className="text-sm font-semibold dark:text-white">Exact Matches</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                              {exactMatches.map((product) => (
                                <Link to={`/product-details/${product._id}`}>
                                  <div key={product._id} className="flex flex-col items-center p-3 rounded-lg cursor-pointer group bg-[#38031D]/5 hover:bg-[#38031D]/10 transition-all duration-300"
                                    onClick={() => handleResultClick(product)}  >
                                    <div className="mb-2 overflow-hidden transition-shadow rounded-md shadow-sm group-hover:shadow-md">
                                      <img
                                        src={getProductImage(product.Images)}
                                        alt={product.Product_Name}
                                        className="object-cover w-24 h-24 transition-transform duration-300 group-hover:scale-110"
                                      />
                                    </div>
                                    <div className="text-center">
                                      <p className="text-xs font-medium text-gray-800 line-clamp-2 group-hover:text-[#38031D] transition-colors dark:text-white">
                                        {product.Product_Name}
                                      </p>
                                      {product.Brand_Name && (
                                        <p className="text-[10px] text-gray-500 flex items-center justify-center mt-1 dark:text-white">
                                          <Tag className="w-3 h-3 mr-1 text-green-400" />
                                          {product.Brand_Name}
                                        </p>
                                      )}
                                      {(product.Category || product.Sub_Category) && (
                                        <p className="text-[10px] text-gray-500 flex items-center justify-center mt-1 dark:text-white">
                                          <Wand className="w-3 h-3 mr-1 text-red-400" />
                                          {product.Category && product.Sub_Category ? `${product.Category}/${product.Sub_Category}` : product.Category || product.Sub_Category}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                        {/* Other Results Section */}
                        <div>
                          <div className="flex items-center mb-3 pl-2 text-primary">
                            <TrendingUp className="w-5 h-5 mr-2 dark:text-white" />
                            <h3 className="text-sm font-semibold dark:text-white py-2">
                              {exactMatches.length > 0 ? "Other Results" : "Search Results"}
                            </h3>
                          </div>
                          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            {searchResults
                              .filter(product => !exactMatches.some(match => match._id === product._id))
                              .map((product) => (
                                <div key={product._id}
                                  className="flex flex-col items-center p-3 rounded-lg cursor-pointer group hover:bg-primary/5 dark:hover:bg-gray-500 transition-all duration-300"
                                  onClick={() => handleResultClick(product)}
                                >
                                  <div className="mb-2 overflow-hidden transition-shadow rounded-md shadow-sm group-hover:shadow-md">
                                    <img src={getProductImage(product.Images)} alt={product.Product_Name} className="object-cover w-24 h-24 transition-transform duration-300 group-hover:scale-110" />
                                  </div>
                                  <div className="text-center">
                                    <p className="text-xs font-medium text-gray-800 dark:text-white line-clamp-2 group-hover:text-primary dark:group-hover:text-white transition-colors">
                                      {product.Product_Name}
                                    </p>
                                    {product.Brand_Name && (
                                      <p className="text-[10px] text-gray-500 flex items-center justify-center mt-1 dark:text-white">
                                        <Tag className="w-3 h-3 mr-1" />
                                        {product.Brand_Name}
                                      </p>
                                    )}
                                    {(product.Category || product.Sub_Category) && (
                                      <p className="text-[10px] text-gray-500 flex items-center justify-center mt-1 dark:text-white">
                                        <Wand className="w-3 h-3 mr-1" />
                                        {product.Category && product.Sub_Category
                                          ? `${product.Category}/${product.Sub_Category}`
                                          : product.Category || product.Sub_Category}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* <div>
                </div> */}

                <div className='hidden flex-wrap gap-10 lg:flex  md:flex-nowrap '>
                  {/* icons */}
                  <div className='items-center justify-center hidden gap-5 text-xl text-gray-400 lg:flex'>
                    {/* <i onClick={ToggleFn} className="cursor-pointer fi fi-sr-settings lg:hidden"></i> */}
                    <Link to='/'>
                      <i className="fi fi-ss-house-chimney text-primary" title='Home'></i>
                    </Link>
                    <Link to='/products'>
                      <i className="fi fi-rs-shop text-primary" title='Shop'></i>
                    </Link>
                    {/* <div onClick={handleWishlistClick} className="relative cursor-pointer">
                      <div className="relative">
                        {isWishlistAnimating && (
                          <div className="absolute inset-0 duration-300 bg-red-100 rounded-full opacity-50 animate-ping"></div>
                        )}
                        <div className={`relative flex items-center justify-center transition-all duration-300 ease-in-out
                          ${isWishlistAnimating ? 'scale-125' : 'scale-100'}`}
                        >
                          <i title='WIshlist' className={`fi fi-bs-heart ${isWishlistAnimating ? 'text-red-500' : ''
                            }`}></i>

                        </div>
                      </div>
                    </div> */}
                    <Link to="/cart">
                      <div className='relative'>
                        <i className="fi fi-sr-shopping-cart text-primary" title='Cart'></i>
                        <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-600 rounded-full -right-3 -top-3">
                          {cartItems && cartItems?.length > 0 ? cartItems?.length : cartCount}
                        </span>
                      </div>
                    </Link>
                    {/* <button onClick={toggleDarkMode} className="p-2  rounded-full hover:bg-primary-dark dark:hover:bg-gray-700" aria-label="Toggle dark mode" >
                      {isDarkMode ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </button> */}
                    {/* <div className="relative" ref={userDropdownRef}>
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

                          <div className="py-2">
                            {isLoggedIn && userdetails?.Role === 'Admin' && (
                              <Link to="/admin/home" className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                <i className="fi fi-rr-home dark:text-white"></i>
                                <span className="text-sm dark:text-white">Admin Dashboard</span>
                              </Link>
                            )}
                            {isLoggedIn && userdetails?.Role !== 'Admin' && (
                              <>
                                <Link to="myorder" className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                  <i className="fi fi-rr-shopping-bag dark:text-white"></i>
                                  <span className="text-sm dark:text-white">My orders</span>
                                </Link>
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

                                 <Link className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50">
                                  <i className="fi fi-rr-users"></i>
                                  <span className="text-sm">Refer Friends, Get $20</span>
                                </Link>
                                <Link to="/setting" className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                  <i className="fi fi-rr-settings dark:text-white"></i>
                                  <span className="text-sm dark:text-white">Settings</span>
                                </Link>
                                <Link to='/help-center' className="flex items-center gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400">
                                  <i className="fi fi-rr-interrogation dark:text-white"></i>
                                  <span className="text-sm dark:text-white">Help center</span>
                                </Link>
                              </>
                            )}
                            <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-2 text-black hover:bg-gray-50 dark:hover:bg-gray-400" >
                              <i className="fa-solid fa-person-running dark:text-white"></i>
                              <span className="text-sm dark:text-white">Log out</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div> */}
                  </div>
                  <RegisterContinueGoogle visible={visible} setVisible={setVisible} />
                </div>
              </div>
            </div>
          </div>
          {/* <div className='bg-gray-50 border'>
            <div className="  p-2 max-w-[70rem] mx-auto  bg-gray-50 relative text-primary lg:block hidden" >
              <div className="flex flex-col  lg:flex-row flex-wrap xl:top-0  -top-10   gap-2 2xl:px-7 px-1">
                {categories.filter(category => category.Category_Name !== "Everything" && category.Category_Name !== "All Categories").map((category) => (
                  <div key={category.Category_Name} className="p-2   relative " onMouseEnter={() => setHoveredCategory(category.Category_Name)} onMouseLeave={() => setHoveredCategory(null)} >
                    <Link to={`/products?category=${category.Category_Name}`} className="flex items-center justify-between gap-1 cursor-pointer"   >
                      <p className="  whitespace-nowrap font-bold">{category.Category_Name}</p>
                      <i className={`fi fi-rr-angle-small-down flex items-center ${hoveredCategory === category.Category_Name && category.Subcategories ? 'rotate-180 duration-300' : 'duration-300'}`}></i>
                    </Link>
                    {hoveredCategory === category.Category_Name && category.Subcategories && (
                      <div className="mt-2 grid grid-cols-1 w-[18rem]    p-2 lg:absolute   bg-gray-50  rounded-md border">
                        {category.Subcategories.map((sub) => (
                          <Link key={sub.name} to={`/products?category=${category.Category_Name}&subcategory=${sub.name}`} className="px-3 py-1   rounded-md text-base hover:underline hover:underline-offset-4 transition-all"  >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div>
              </div>
            </div>
          </div> */}
          <div className='bg-gray-50 border border-y-gray-300 relative'>
            <div className="p-2 max-w-[65rem] mx-auto bg-gray-50 relative text-primary lg:block hidden" onMouseLeave={() => setHoveredCategory(null)}>
              <div className="flex flex-col lg:flex-row flex-wrap gap-2">
                {sortedCategories.map((category) => (
                  <div key={category.Category_Name} className={`p-2 relative border-b-2 ${hoveredCategory === category.Category_Name ? 'border-secondary' : 'border-transparent'}`}
                    onMouseEnter={() => setHoveredCategory(category.Category_Name)}   >
                    <Link to={`/products?category=${category.Category_Name}`} className="flex items-center justify-between gap-1 cursor-pointer">
                      <p className="whitespace-nowrap font-bold xl:text-base text-sm">{category.Category_Name}</p>
                      {/* {category.Subcategories && category.Subcategories.length > 0 && (
                        <i className={`fi fi-rr-angle-small-down flex items-center ${hoveredCategory === category.Category_Name ? 'rotate-180 duration-300' : 'duration-300'}`}></i>
                      )} */}
                    </Link>
                  </div>
                ))}
              </div>
              {/* {hoveredCategory && categories.find(category => category.Category_Name === hoveredCategory)?.Subcategories?.length > 0 && (
                <div className="absolute left-0 w-full bg-gray-50  shadow-md transition-all duration-300 border border-secondary ease-in-out">
                  <div className="max-w-[70rem] mx-auto p-4 grid grid-cols-3 gap-">
                    {categories.find(category => category.Category_Name === hoveredCategory)?.Subcategories.map((sub) => (
                      <>
                        <div className='w-fit'>
                          <Link key={sub.name}   to={`/products?category=${encodeURIComponent(hoveredCategory)}&subcategory=${encodeURIComponent(sub.name)}`} className="px-3 py-2 rounded-md text-sm  transition-all block" onClick={() => setHoveredCategory(null)}>
                            <div className='flex gap-2 items-center'>
                              <i class="fi fi-rr-caret-right flex items-center gap-2 no-underline text-secondary"></i>
                              <p className="hover:underline hover:underline-offset-4 font-semibold"> {sub.name}</p>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </header>



      {/* <DeliveryPickupModal isOpen={isDeliveryModalOpen} onClose={() => setIsDeliveryModalOpen(false)} onSelectOption={handleDeliveryOptionSelect} /> */}


    </>
  )
}
