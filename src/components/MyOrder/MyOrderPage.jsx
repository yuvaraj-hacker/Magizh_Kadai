// MyOrderPage.jsx
import { useCallback, useEffect, useRef, useState } from 'react'
import MyOrder from '../../shared/Components/MyOrderPage/MyOrder'
import useAuth from '../../shared/services/store/useAuth';
import { apidownloadPDF, apigetallOrder } from '../../shared/services/APIOrder/apiorder';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import { getOrderitemsbyid } from '../../admin/shared/services/apiorders/apiorders';
import OrderItems from '../../shared/Components/MyOrderPage/OrderItems';
import { apigetallReview, saveReview } from '../../shared/services/apiReview/apiReviews';
import ReorderItems from '../../shared/Components/MyOrderPage/ReorderItems';

function MyOrderPage() {
    const [orderDetails, setOrderDetails] = useState([]);
    const { userdetails } = useAuth();
    const [ViewProduct, setViewProduct] = useState(false);
    const [ViewProductData,setViewProductData]=useState([]);
    const [ViewProduct1, setViewProduct1] = useState(false);
    const [ViewProductData1,setViewProductData1]=useState([]);
    const [isLastOpen, setLastOpen] = useState(false);
    const [downloadingPDF, setDownloadingPDF] = useState({});
    const [activeStatus, setActiveStatus] = useState('All');
    const statuses = ['All', 'Pending', 'Dispatched', 'Delivered', 'Cancelled'];
    const number = 0;
    const dropdownRef = useRef(null);
    
    const toggleDropdown = () => { setLastOpen(prev => !prev); };
    
    const buttonRefs = useRef([]);
    
    const handleButtonClick = (status, index) => {
        setActiveStatus(status);
        buttonRefs.current[index].scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center',
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setLastOpen(false);
            }
        };
        if (isLastOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLastOpen]);

    let isMounted = true;

    const fetchOrderDetails = useCallback(async () => {
        try {
            const res = await apigetallOrder({ Email: userdetails?.Email });
            setOrderDetails(res.resdata);
        } catch (err) {
            console.error("Error fetching order details:", err);
        }
    }, [userdetails?.Email]);

    useEffect(() => {
        if (isMounted) {
            fetchOrderDetails();
        }
        return () => (isMounted = false);
    }, [fetchOrderDetails]);

    const downloadPDF = async (orderId) => {
        setDownloadingPDF(prev => ({ ...prev, [orderId]: true }));
        try {
            var resData = await apidownloadPDF(orderId);
            const pdfBlob = new Blob([resData], { type: 'application/pdf' });
            const pdfFileName = `${orderId}.pdf`;
            saveAs(pdfBlob, pdfFileName);
        } catch (error) {
            console.error("Error downloading PDF:", error);
            toast.error("Failed to download PDF");
        } finally {
            setDownloadingPDF(prev => ({ ...prev, [orderId]: false }));
        }
    }

    const viewProducts = async(Order_id) =>{
        var res = await getOrderitemsbyid(Order_id);
        setViewProductData(res);
        setViewProduct(true)
    }

    const viewReorderProducts = async(Order_id) =>{
        var res = await getOrderitemsbyid(Order_id);
        setViewProductData1(res);
        setViewProduct1(true)
    }

    // ---------------- order items function ------------------

    const [reviews, setReviews] = useState({});
    const [selectedImages, setSelectedImages] = useState({});
    const [activeReviews, setActiveReviews] = useState({});
    const [submitting, setSubmitting] = useState({});
    const [savedReviews, setSavedReviews] = useState({});
  
    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await apigetallReview({ Email: userdetails.Email });
            if (response && response.resdata && response.resdata.length > 0) {
              const reviewsMap = response.resdata.reduce((acc, review) => {
                acc[review.productId] = review;
                return acc;
              }, {});
              setSavedReviews(reviewsMap);
            }
          } catch (error) {
            console.error('Error fetching reviews:', error);
          }
        };
    
        if (userdetails?.Email) {
          fetchReviews();
        }
      }, [ViewProductData, userdetails?.Email]);
      
      const calculateTotal = (items) => {
        return items.reduce((total, item) => {
          return total + (item.Sale_Price * item.Quantity);
        }, 0);
      };
    
      const handleRatingChange = (productId, value) => {
        setReviews(prev => ({...prev, [productId]: { ...prev[productId], rating: value }
        }));
      };
    
      const handleReviewTextChange = (productId, text) => {
        setReviews(prev => ({...prev, [productId]: { ...prev[productId], text } }));
      };
    
      const handleImageUpload = (productId, event) => {
        const files = Array.from(event.target.files);
        setSelectedImages(prev => ({...prev,[productId]: files }));
      };
    
      const toggleReview = (productId) => {
        setActiveReviews(prev => ({...prev,[productId]: !prev[productId] }));
        
        if (activeReviews[productId]) {
          setReviews(prev => {
            const newReviews = { ...prev };
            delete newReviews[productId];
            return newReviews;
          });
          setSelectedImages(prev => {
            const newImages = { ...prev };
            delete newImages[productId];
            return newImages;
          });
        }
      };
    
      const submitReview = async (item) => {
        if (!reviews[item.productId]?.rating) {
          toast.error('Please provide a rating');
          return;
        }
        setSubmitting(prev => ({ ...prev, [item.productId]: true }));
    
        try {
          const formData = new FormData();
          formData.append('productId', item.productId);
          formData.append('orderId', item.Order_id);
          formData.append('Email', userdetails._id);
          formData.append('Star_Rating', reviews[item.productId].rating?.toString());
          formData.append('Review_Description', reviews[item.productId].text || '');
    
          if (selectedImages[item.productId]) {
            selectedImages[item.productId].forEach((file) => {
              formData.append('Images', file);
            });
          }
    
          const response = await saveReview(formData);
    
          if (response.resdata) {
            toast.success('Review submitted successfully');
            setSavedReviews(prev => ({...prev,[item.productId]: response.resdata }));
            toggleReview(item.productId);
          } else {
            toast.error(response.message || 'Failed to submit review');
          }
        } catch (error) {
          console.error('Error submitting review:', error);
          toast.error('Failed to submit review');
        } finally {
          setSubmitting(prev => ({ ...prev, [item.productId]: false }));
        }
      };

    return (
        <>
            <MyOrder isLastOpen={isLastOpen} handleButtonClick={handleButtonClick} toggleDropdown={toggleDropdown} activeStatus={activeStatus} number={number} statuses={statuses}
                buttonRefs={buttonRefs} dropdownRef={dropdownRef} orderDetails={orderDetails} downloadPDF={downloadPDF} downloadingPDF={downloadingPDF} viewProducts={viewProducts}
                viewReorderProducts={viewReorderProducts}
            />
            <OrderItems ViewProduct={ViewProduct} setViewProduct={setViewProduct} ViewProductData={ViewProductData} submitReview={submitReview} handleImageUpload={handleImageUpload}
            handleReviewTextChange={handleReviewTextChange} handleRatingChange={handleRatingChange} calculateTotal={calculateTotal} submitting={submitting} savedReviews={savedReviews}
            reviews={reviews} activeReviews={activeReviews} setSavedReviews={setSavedReviews} selectedImages={selectedImages} setSelectedImages={setSelectedImages} 
            toggleReview={toggleReview} />

            <ReorderItems setViewProduct1={setViewProduct1} ViewProduct1={ViewProduct1} ViewProductData1={ViewProductData1} />
        </>
    )
}

export default MyOrderPage