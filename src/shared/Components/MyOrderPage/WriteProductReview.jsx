import { InputTextarea } from "primereact/inputtextarea";
import { Rating } from "primereact/rating";
import apiurl from "../../services/apiendpoint/apiendpoint";
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { updateReview } from "../../services/apiReview/apiReviews";
import useAuth from "../../services/store/useAuth";

export default function WriteProductReview(props) {
    const { savedReviews, item, toggleReview, submitting, activeReviews, reviews, handleRatingChange, handleImageUpload, handleReviewTextChange, 
        selectedImages, setSelectedImages, submitReview, setSavedReviews } = props;
    
    const productReview = savedReviews[item.productId];
    const [isEditing, setIsEditing] = useState(false);
    const [editedReview, setEditedReview] = useState(null);
    const [editedImages, setEditedImages] = useState([]);
    const { userdetails } = useAuth();

    const handleEdit = () => {
        setIsEditing(true);
        setEditedReview({
            rating: parseInt(productReview.Star_Rating),
            text: productReview.Review_Description
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedReview(null);
        setEditedImages([]);
    };
    const handleEditedRatingChange = (value) => {
        setEditedReview(prev => ({ ...prev, rating: value }));
    };

    const handleEditedTextChange = (text) => {
        setEditedReview(prev => ({ ...prev, text }));
    };

    const handleEditedImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setEditedImages(files);
    };

    const removeEditedImage = (index) => {
        setEditedImages(prev => prev.filter((_, i) => i !== index));
    };

    const removeEditedImages = () => {
        setEditedImages([]);
    };
    
    const handleUpdateReview = async () => {
        if (!editedReview.rating) {
            toast.error('Please provide a rating');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('_id', productReview._id); 
            formData.append('productId', item.productId); 
            formData.append('orderId', item.Order_id); 
            formData.append('Email', userdetails._id); 
            formData.append('Star_Rating', editedReview.rating.toString()); 
            formData.append('Review_Description', editedReview.text || ''); 
            editedImages.forEach((file) => {
                formData.append('Images', file);
            });
            console.log('FormData contents:');
            for (let pair of formData.entries()) {
                if (pair[0] === 'Images') {
                    console.log(`${pair[0]}:`, pair[1].name);
                } else {
                    console.log(`${pair[0]}:`, pair[1]);
                }
            }
    
            const response = await updateReview({
                _id: productReview._id,
                formData,
            });
    
            if (response.resdata) {
                toast.success('Review updated successfully');
                setSavedReviews((prev) => ({
                    ...prev,
                    [item.productId]: response.resdata,
                }));
                setIsEditing(false);
            } else {
                toast.error(response.message || 'Failed to update review');
            }
        } catch (error) {
            console.error('Error updating review:', error);
            toast.error('Failed to update review');
        }
    };
    

    return (
        <>
            <div className="pl-16 mt-2">
                {!savedReviews[item.productId] ? (
                    <button onClick={() => toggleReview(item.productId)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        disabled={submitting[item.productId]}
                    >
                        {activeReviews[item.productId] ? (
                            <><span className="mr-2">×</span>Cancel Review</>
                        ) : (
                            <><span className="mr-2">★</span>Review Product</>
                        )}
                    </button>
                ) : !isEditing ? (
                    <button onClick={handleEdit}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-blue-300 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <span className="mr-2">✎</span>Edit Review
                    </button>
                ) : null}
            </div>

            {activeReviews[item.productId] && !savedReviews[item.productId] && (
                <div className="p-4 pl-16 mt-4 space-y-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                        <Rating value={reviews[item.productId]?.rating || 0} onChange={(e) => handleRatingChange(item.productId, e.value)} stars={5} cancel={false} />
                        <span className="text-sm text-gray-500">
                            {reviews[item.productId]?.rating ? `${reviews[item.productId].rating} out of 5` : 'Rate this product'}
                        </span>
                    </div>

                    <InputTextarea value={reviews[item.productId]?.text || ''} onChange={(e) => handleReviewTextChange(item.productId, e.target.value)} rows={3}  
                        autoResize className="w-full" placeholder="Write your review here..."
                    />

                    <div className="space-y-2">
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <input type="file" className="hidden" multiple accept="image/*" onChange={(e) => handleImageUpload(item.productId, e)} />
                            </label>
                        </div>

                        {selectedImages[item.productId] && selectedImages[item.productId].length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {Array.from(selectedImages[item.productId]).map((file, index) => (
                                    <div key={index} className="relative">
                                        <img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className="object-cover w-20 h-20 rounded" />
                                        <button
                                            onClick={() => {
                                                const newFiles = [...selectedImages[item.productId]];
                                                newFiles.splice(index, 1);
                                                setSelectedImages(prev => ({...prev, [item.productId]: newFiles }));
                                            }}
                                            className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button onClick={() => submitReview(item)} disabled={submitting[item.productId]}
                            className="inline-flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
                        >
                            {submitting[item.productId] ? 'Submitting...' : (
                                <><span className="mr-2">✓</span>Submit Review</>
                            )}
                        </button>
                        <button onClick={() => toggleReview(item.productId)} disabled={submitting[item.productId]}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                        >
                            <span className="mr-2">×</span>Cancel
                        </button>
                    </div>
                </div>
            )}

            {productReview && !isEditing && (
                <div className="p-4 pl-16 mt-4 space-y-4 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Rating value={parseInt(productReview.Star_Rating)} readOnly stars={5} cancel={false} />
                            <span className="text-sm text-gray-500">
                                {productReview.Star_Rating} out of 5
                            </span>
                        </div>
                        <span className="text-sm text-gray-500">
                            {new Date(productReview.createdAt).toLocaleDateString()}
                        </span>
                    </div>

                    {productReview.Review_Description && (
                        <p className="text-sm text-gray-600">{productReview.Review_Description}</p>
                    )}

                    {productReview.Images && productReview.Images.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {productReview.Images.map((image, index) => (
                                <img key={index} src={`${apiurl()}/${image}`} alt={`Review image ${index + 1}`} className="object-cover w-20 h-20 rounded" />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {isEditing && (
                <div className="p-4 pl-16 mt-4 space-y-4 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-2">
                        <Rating value={editedReview?.rating || 0} onChange={(e) => handleEditedRatingChange(e.value)} stars={5} cancel={false} />
                        <span className="text-sm text-gray-500">
                            {editedReview?.rating ? `${editedReview.rating} out of 5` : 'Rate this product'}
                        </span>
                    </div>

                    <InputTextarea value={editedReview?.text || ''} onChange={(e) => handleEditedTextChange(e.target.value)} rows={3}  
                        autoResize className="w-full" placeholder="Write your review here..."
                    />

                    <div className="space-y-2">
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                                <input type="file" className="hidden" multiple accept="image/*" onChange={handleEditedImageUpload} />
                            </label>
                        </div>

                        {editedImages.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {editedImages.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img 
                                            src={URL.createObjectURL(file)} 
                                            alt={`Review image ${index + 1}`} 
                                            className="object-cover w-20 h-20 rounded" 
                                        />
                                        <button
                                            onClick={() => removeEditedImage(index)}
                                            className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                {editedImages.length > 0 && (
                                    <button 
                                        onClick={removeEditedImages}
                                        className="inline-flex items-center px-3 py-1 text-sm text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50"
                                    >
                                        Clear Images
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <button onClick={handleUpdateReview}
                            className="inline-flex items-center justify-center flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <span className="mr-2">✓</span> Update Review
                        </button>
                        <button onClick={handleCancelEdit}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            <span className="mr-2">×</span> Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}