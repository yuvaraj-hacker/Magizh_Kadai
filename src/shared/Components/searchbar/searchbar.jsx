import { useState, useEffect, useRef, useMemo } from "react";
import { Search, X, Loader2, TrendingUp, Tag, Box, ShoppingBag, Wand, DropletIcon, Droplet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../services/apiproducts/apiproduct";
import apiurl from "../../services/apiendpoint/apiendpoint";
import RequestForProducts from "./RequestForProducts ";
import { useCallback } from "react";
import { Dialog } from "primereact/dialog";
import { Link } from "react-router-dom";

const SearchBar = ({ categories, onclickcategories, opencategories, setOpenCategories, }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [expandSearch, setExpandSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [exactMatches, setExactMatches] = useState([]);
  const searchRef = useRef(null);
  const categoryRef = useRef(null);
  const navigate = useNavigate();

  // Advanced debounced search with exact matching
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
  };


  const AllCategories = () => (
    <>  <div className={` max-h-[50vh] w-64 bg-white rounded-xl border cursor-default overflow-auto`}>
      <ul className="divide-y p-2 hover:*:bg-gray-100 *:rounded-lg" >
        {console.log(categories)}
        {categories.map(
          (category) =>
            category.Category_Name !== "Everything" && (
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
    <div className="relative w-full ">
      {/* Search Input */}
      <div className={` ${expandSearch ? 'w-[70vw] lg:w-auto' : 'w-10 h-10'} ease-in duration-300 float-right h-auto z-50 flex items-center justify-between w-full lg:*:py-4 bg-white border border-gray-200 rounded-full dark:bg-gray-800 dark:border-gray-700`}>
        {isLoading ? (
          <Loader2 className="lg:hidden animate-spin w-10 h-10 mr-2 text-primary dark:text-white" />
        ) : (
          <Search onClick={() => setExpandSearch(true)} className="lg:hidden w-10 h-10 bg-secondary dark:bg-red-800 !p-2 rounded-full text-white" />
        )}
        <div onClick={onclickcategories} ref={categoryRef} className={`lg:inline-flex min-w-[170px] hidden whitespace-nowrap text-sm border-r relative items-center gap-1 cursor-pointer !px-4 select-none ${opencategories && 'bg-gray-200'} rounded-l-full`}> {opencategories ? 'Close Categories' : 'Select Categories'} <i class={`fi fi-br-angle-small-down pt-1 duration-300  ${opencategories ? 'rotate-180' : 'rotate-0'}`}></i>
          {<div className={`absolute top-[60px] left-0 transition-all ease-in overflow-hidden duration-300 ${opencategories ? ' max-h-[50vh]' : ' max-h-0'}`} ><AllCategories opencategories={opencategories} setOpenCategories={setOpenCategories} categories={categories} /></div>}
        </div>
        <input ref={searchRef} type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for products.."
          className={`${expandSearch ? 'pl-4 w-[50vw]' : 'w-0 '} duration-300 lg:w-full p-0 lg:p-2 lg:pl-4 text-sm placeholder-gray-400 bg-transparent focus:outline-none dark:text-white dark:placeholder-gray-300`}
          onFocus={() => searchResults.length > 0 && setShowResults(true)}
        />
        {(searchTerm || expandSearch) ? (
          <X className="!p-0 -translate-x-2 z-20 text-gray-500 cursor-pointer hover:text-[#38031D] dark:text-white transition-colors" onClick={clearSearch} />
        ) : (
          <i className="fi fi-rr-search  pr-4 text-gray-300 lg:block hidden" ></i>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && searchTerm.trim().length > 0 && (
        <div ref={searchRef} className="absolute left-0 top-14 right-0 z-50 lg:p-4 p-0 mt-2 bg-white dark:bg-gray-600 border-2 border-[#38031D]/10 rounded-xl shadow-lg max-h-[500px] overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center lg:p-8 p-2 text-center bg-[#38031D]/5 rounded-xl">
              <div className="relative mb-6">
                <Box className="lg:w-24 lg:h-24 text-[#38031D]/20 dark:text-white w-16 h-16" />
                <X className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-[#38031D]/40 opacity-70 dark:text-white" />
              </div>
              <h3 className="lg:text-2xl text-base font-bold text-[#38031D]/70 mb-3 dark:text-white">
                Oops! No Products Found
              </h3>
              <p className="max-w-xs mb-4 text-sm text-gray-600 dark:text-white">
                We couldn&apos;t find any products matching your search. Let&apos;s try something different.
              </p>
              <div className="w-full max-w-xs space-y-2">
                <div className="flex items-center bg-white border border-[#38031D]/10 rounded-lg lg:p-3 p-1 shadow-sm hover:bg-[#38031D]/5 dark:hover:bg-white transition">
                  <Search className="w-5 h-5 mr-3 text-[#38031D]/50" />
                  <span className="text-sm text-gray-600 ">Check your spelling</span>
                </div>
                <div className="flex items-center bg-white border border-[#38031D]/10 rounded-lg lg:p-3 p-1 shadow-sm hover:bg-[#38031D]/5 dark:hover:bg-white transition">
                  <Tag className="w-5 h-5 mr-3 text-[#38031D]/50" />
                  <span className="text-sm text-gray-600">Try broader categories</span>
                </div>
                <div className="flex items-center bg-white border border-[#38031D]/10 rounded-lg lg:p-3 p-1 shadow-sm hover:bg-[#38031D]/5 dark:hover:bg-white transition">
                  <ShoppingBag className="w-5 h-5 mr-3 text-[#38031D]/50" />
                  <span className="text-sm text-gray-600">Use generic terms</span>
                </div>
                <RequestForProducts searchQuery={searchTerm} />
              </div>
              <p className="mt-6 text-xs italic text-gray-500 dark:text-white">
                Need help? Contact our support team
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
                                {product.Category && product.Sub_Category
                                  ? `${product.Category}/${product.Sub_Category}`
                                  : product.Category || product.Sub_Category}
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
                <div className="flex items-center mb-3 pl-2 text-[#38031D]">
                  <TrendingUp className="w-5 h-5 mr-2 dark:text-white" />
                  <h3 className="text-sm font-semibold dark:text-white">
                    {exactMatches.length > 0 ? "Other Results" : "Search Results"}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {searchResults
                    .filter(product => !exactMatches.some(match => match._id === product._id))
                    .map((product) => (
                      <div key={product._id}
                        className="flex flex-col items-center p-3 rounded-lg cursor-pointer group hover:bg-[#38031D]/5 dark:hover:bg-gray-500 transition-all duration-300"
                        onClick={() => handleResultClick(product)}
                      >
                        <div className="mb-2 overflow-hidden transition-shadow rounded-md shadow-sm group-hover:shadow-md">
                          <img src={getProductImage(product.Images)} alt={product.Product_Name} className="object-cover w-24 h-24 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-medium text-gray-800 dark:text-white line-clamp-2 group-hover:text-[#38031D] dark:group-hover:text-white transition-colors">
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
    </div>
  );
};

export default SearchBar;