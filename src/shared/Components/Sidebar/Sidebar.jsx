import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getallcategory } from '../../../admin/shared/services/apicategory/apicategory'
import apiurl from '../../services/apiendpoint/apiendpoint'
// import { ChevronRight } from 'lucide-react'
import './Sidebar.css'
import useAuth from '../../services/store/useAuth'
import { apigetallcategory } from '../../services/apicategory/apicategory'

export default function Sidebar({ setTogSidecat, TogSidecat }) {
  const [categories, setCategories] = useState([])
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [showSubcategories, setShowSubcategories] = useState(false)
  const [selectedSubcategoryData, setSelectedSubcategoryData] = useState(null)
  const [subcategoryPosition, setSubcategoryPosition] = useState({ top: 0, left: 0 })
  const [selectedCategory, setSelectedCategory] = useState(null)
  const categoryRefs = useRef({});
  const subcategoryBoxRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const profileBackRoutes = ['/myorder', '/saveditem', '/setting']
  const isBackPage = profileBackRoutes.includes(location.pathname)
  // const profileSidebarRoutes = ['/profile', '/myorder', '/saveditem', '/setting']
  const profileSidebarRoutes = []
  const isProfileSidebarPage = profileSidebarRoutes.includes(location.pathname)
  const { userdetails, logout } = useAuth()
  const [category, setCategory] = useState([]);


  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getAllCategories = useCallback(async () => {
    try {
      const res = await getallcategory();
      if (res?.resdata) {
        const sortedCategories = res.resdata.sort((a, b) => parseInt(a.Order_show_format) - parseInt(b.Order_show_format));
        setCategories(sortedCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getAllCategories();
    }
    return () => {
      isMounted = false;
    };
  }, [getAllCategories]);


  const allCategories = useCallback(async () => {
    try {
      const res = await apigetallcategory();
      setCategory(res.resdata);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }, []);

  useEffect(() => {
    allCategories();
  }, [allCategories]);





  const handleCategoryHover = (category, event) => {
    if (category.Subcategories?.length > 0) {
      const categoryElement = event.currentTarget;
      const rect = categoryElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const subcategoryBoxHeight = (category.Subcategories.length * 45) + 40;

      let topPosition = rect.top;

      if (topPosition + subcategoryBoxHeight > windowHeight) {
        topPosition = windowHeight - subcategoryBoxHeight;
      }

      topPosition = Math.max(10, Math.min(topPosition, windowHeight - subcategoryBoxHeight - 10));

      setHoveredCategory(category._id);
      setSelectedSubcategoryData(category);
      setShowSubcategories(true);
      setSubcategoryPosition({
        top: topPosition,
        left: rect.right
      });
    }
  };

  const handleMouseMove = (event) => {
    const categoryBox = document.querySelector('.categories-container')
    const subcategoryBox = subcategoryBoxRef.current

    if (categoryBox && subcategoryBox) {
      const isInBetween =
        event.clientX >= categoryBox.getBoundingClientRect().right &&
        event.clientX <= subcategoryBox.getBoundingClientRect().right

      if (isInBetween) {
        setShowSubcategories(true)
      }
    }
  }

  const handleMouseLeave = () => {
    // Add a slight delay to prevent immediate closing
    setTimeout(() => {
      setHoveredCategory(null)
      setShowSubcategories(false)
      setSelectedSubcategoryData(null)
    }, 200)
  }

  const handleCategoryClick = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null); // Close if clicked again
    } else {
      setSelectedCategory(categoryName);
    }
    if (categoryName === "All Categories") {
      navigate(`/products`);
    } else {
      navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    }
  };

  const handleSubcategoryClick = (categoryName, subcategoryName, e) => {
    e.preventDefault()
    navigate(`/products?category=${encodeURIComponent(categoryName)}&subcategory=${encodeURIComponent(subcategoryName)}`)
    setTogSidecat(false)
  }

  return (
    <>
      {isProfileSidebarPage ? (
        <section className=''>
          <div className={`fixed z-[54] inset-0 h-full bg-[#fff7f5] dark:bg-slate-800 shadow-lg ${isBackPage ? 'hidden lg:block md:w-60' : 'w-full lg:w-60'} `}>
            <div className="px-5 lg:mt-0 mt-28">
              <div className='hidden mb-10 lg:block lg:px-4 z-[56]'>
                <Link to='/'  ><img src="/images/Logo/Logo.png" alt="" className='mt-2 ' />
                </Link>
              </div>
              <div className="flex items-center mb-6 space-x-4">
                <div className="flex items-center justify-center w-12 h-12 text-2xl text-white bg-orange-500 rounded-full">
                  {userdetails?.First_Name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-lg font-semibold dark:text-white">{userdetails?.First_Name || "Your Name"}</p>
                  <p className="text-sm text-gray-500 dark:text-white">ID:{userdetails?._id?.slice(-8) || "Order ID"}</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link to='/myorder' className="flex ">
                  <div className={`flex justify-between items-center gap-3 w-full px-3 py-2 rounded-md ${location.pathname === '/myorder' ? 'bg-white text-gray-700' : ''
                    }`} >
                    <div className='flex items-center gap-3'>
                      <i className="mt-1 fi fi-rs-order-history"></i> My orders
                    </div>
                    <div><i className="fi fi-rr-angle-right"></i></div>
                  </div>
                </Link>
                {/* <Link to='/saveditem' className="flex ">
                  <div
                    className={`flex justify-between items-center gap-3 w-full px-3 py-2 rounded-md ${location.pathname === '/saveditem' ? 'bg-white text-gray-700' : ''
                      }`}
                  >
                    <div className='flex items-center gap-3'>
                      <i className="mt-1 fi fi-sr-bookmark"></i> Saved items
                    </div>
                    <div>
                      <i className="fi fi-rr-angle-right"></i>
                    </div>
                  </div>
                </Link> */}
              </div>
              <hr className="my-4" />
              <div className="space-y-1">
                <Link to='/setting'>
                  <div
                    className={`flex justify-between items-center gap-3 w-full px-3 py-2 rounded-md ${location.pathname === '/setting' ? 'bg-white text-gray-700' : ''}`} >
                    <div className='flex items-center gap-3'>
                      <i className="mt-1 fi fi-sr-settings"></i> Settings
                    </div>
                    <div><i className="fi fi-rr-angle-right "></i></div>
                  </div>
                </Link>
              </div>
              <hr className="my-4" />
              <div className="space-y-1">
                <Link to='/help-center'>
                  <div
                    className={`flex justify-between items-center gap-3 w-full px-3 py-2 rounded-md ${location.pathname === '/help-center' ? 'bg-white text-gray-700' : ''}`} >
                    <div className='flex items-center gap-3'>
                      <i className="fi fi-rs-interrogation"></i> Help Center
                    </div>
                    <div><i className="fi fi-rr-angle-right "></i></div>
                  </div>
                </Link>
              </div>
              <hr className="my-4" />
              <div className='flex justify-center gap-5 px-3 py-2 mx-auto text-gray-700 rounded-md cursor-pointer dark:text-white w-fit' onClick={handleLogout}>
                <button>Log out</button>
                <i className="fi fi-bs-sign-out-alt"></i>
              </div>
            </div>
          </div>
        </section >
      ) : (
        <section className='relative lg:hidden' onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}  >
          <div className={`${TogSidecat ? 'translate-y-0' : 'translate-y-full'} fixed bottom-0 left-0 lg:translate-y-0 duration-300 lg:block h-[80vh] lg:h-screen w-full lg:w-60 bg-white dark:bg-slate-800 shadow-lg z-[54] lg:z-50`}>
            {/* Sidebar Logo and Mobile Header */}
            <div className='hidden lg:block lg:px-8'>
              <Link to='/'><img src="/images/Logo/Logo.png" alt="" className='mt-2 z-[56]' /></Link>
            </div>
            <div className='flex items-center justify-between px-5 lg:hidden'>
              <div className='flex gap-3  items-center'>
                <img className='w-8' src="/images/Design/Magizh-design.png" alt="" />
                <div className='py-4 text-xl text-center lg:pb-16 font-bold text-secondary'>Categories</div>
              </div>
              <i onClick={() => setTogSidecat(false)} className="fi fi-sr-cross-circle text-2xl h-[24px] cursor-pointer"></i>
            </div>
            <hr className='lg:hidden' />

            <div className="border p-2 relative text-primary lg:hidden">
              <div className="flex flex-col gap-2 px-7">
                {categories.filter((category) => category.Category_Name !== "Everything" && category.Category_Name !== "All Categories").map((category) => (
                  <div key={category.Category_Name} className="p-2 relative">
                    <button onClick={() => handleCategoryClick(category.Category_Name)} className="flex items-center justify-between gap-1 w-full cursor-pointer" >
                      <p className="font-medium whitespace-nowrap">{category.Category_Name}</p>
                      <i className={`fi fi-rr-angle-small-${selectedCategory === category.Category_Name ? "up" : "down"} flex items-center`} />
                    </button>
                    {selectedCategory === category.Category_Name && category.Subcategories && (
                      <div className="mt-2 grid grid-cols-1 p-2 bg-gray-50 rounded-md border">
                        {category.Subcategories.map((sub) => (
                          <Link key={sub.name} to={`/products?category=${category.Category_Name}&subcategory=${sub.name}`} onClick={() => setTogSidecat(false)} className="px-3 py-1 rounded-md text-sm hover:underline hover:underline-offset-4 transition-all"  >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Subcategories Side Box */}
          {showSubcategories && selectedSubcategoryData && (
            <div ref={subcategoryBoxRef}
              className="subcategory-box hidden md:block fixed z-[55] w-64 bg-white dark:bg-slate-700 shadow-lg border-l rounded-lg border-gray-100 dark:border-slate-600  overflow-y-auto"
              style={{
                top: `${subcategoryPosition.top}px`,
                left: `${subcategoryPosition.left}px`
              }}
            >
              {/* <h3 className="text-lg font-semibold mb-4 text-[#2e1216] dark:text-white">
              {selectedSubcategoryData.Category_Name} Subcategories
            </h3> */}
              <div className="space-y-1">
                {selectedSubcategoryData.Subcategories.map((sub, index) => (
                  <Link to="#" key={index} onClick={(e) => handleSubcategoryClick(selectedSubcategoryData.Category_Name, sub.name, e)} className="block">
                    <div className="flex items-center p-2 hover:bg-[#ffd6b09b] transition-colors">
                      <div className="flex justify-center mr-3 min-w-12">
                        <img src={`${apiurl()}/${sub.image}`} alt={sub.name} className="object-cover w-8 h-8 rounded-md" />
                      </div>
                      <p className="text-sm  font-medium text-[#2e1216] dark:text-white">{sub.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )
      }
    </>
  )
}