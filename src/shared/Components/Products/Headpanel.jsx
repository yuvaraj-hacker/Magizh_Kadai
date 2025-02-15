
import { SubCatSwiper } from '../Swiper/SubCatSwiper'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LoadingSkeleton = () => {
  return (
    <div className="relative w-[25%] px-5 pb-0 mx-auto lg:p-10 lg:pb-0">
      <div className="fixed z-0 -top-1 -right-[65px] w-[140px] lg:-top-[60px] lg:-right-[140px] lg:w-[280px] animate-spin animate-duration-[20s] bg-gray-200 rounded-full"></div>
      <div className="py-5">
        <div className="w-3/4 h-10 mb-5 bg-gray-300 rounded-md lg:h-14 animate-pulse"></div>
      </div>
    </div>

  );
};


function Headpanel(props) {

  const { selectedCategory, categories } = props;

  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [categoryParam, setCategoryParam] = useState(0);

  useEffect(() => {
    if (!categories || categories.length === 0) return;
    const params = new URLSearchParams(location.search);
    const categoryFromParam = params.get("category");
    const subcategoryFromParam = params.get("subcategory");
    setCategoryParam(categoryFromParam)
    if (!categoryFromParam || !subcategoryFromParam) {
      setActiveIndex(null);
      return;
    }
    const matchedCategory = categories.find(
      (category) =>
        category.Category_Name &&
        category.Category_Name.trim().toLowerCase() ===
        decodeURIComponent(categoryFromParam).trim().toLowerCase()
    );
    if (!matchedCategory) {
      setActiveIndex(null);
      return;
    }
    const subcategoryIndex = (matchedCategory.Subcategories || []).findIndex(
      subcategory =>
        subcategory.name?.trim().toLowerCase() ===
        decodeURIComponent(subcategoryFromParam).trim().toLowerCase()
    );
    setActiveIndex(subcategoryIndex !== -1 ? subcategoryIndex : null);
  }, [location.search, categories, selectedCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!selectedCategory || selectedCategory.length === 0) {
    return <LoadingSkeleton />;
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <section>
     {  categoryParam &&  <div className='relative w-full px-5 pb-0 mx-auto lg:p-10 lg:pb-0'>
        <div><img src={flower} alt="Hero design" className="fixed  top-7 -right-[65px] w-[130px] lg:-top-[60px]  md:top[20px] lg:-right-[140px]  z-40 xl:w-[280px] md:w-[160px] lg:w-[250px] animate-spin animate-duration-[20s] " /></div>
        <h1 className='text-[#eb6623] text-3xl lg:text-5xl pb-5 font-agbalumo'>
          {selectedCategory || 'Select a Category'}
        </h1>
        {categories.length > 0 &&  (
          <SubCatSwiper categories={categories} selectedCategory={selectedCategory} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
        )}
      </div>}
    </section>
  );
}

export default Headpanel;