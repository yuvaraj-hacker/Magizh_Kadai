import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea } from "@nextui-org/react";
import { Star, X, Upload } from 'lucide-react';
function OrderReviewModal({ 
    order, 
    onRatingChange = () => {}, 
    onReviewTextChange = () => {}, 
    onImageUpload = () => {}, 
    onSubmit = () => {}, 
    orderReviews = {}, 
    orderReviewImages = {},
    submitting = false

}) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleRatingChange = (selectedRating) => {
    setRating(selectedRating);
    onRatingChange(order.Order_id, selectedRating);
  };

  const handleSubmit = () => {
    onSubmit(order);
    setIsOpen(false);
  };

  const removeImage = (index) => {
    const newImages = [...(orderReviewImages[order.Order_id] || [])];
    newImages.splice(index, 1);
    onImageUpload(order.Order_id, { target: { files: newImages } });
  };

  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <Star key={star}
        className={`w-8 h-8 cursor-pointer transition-colors duration-200 ${
          (hoverRating || rating) >= star 
            ? 'text-yellow-500 fill-yellow-500' 
            : 'text-gray-300'
        }`}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        onClick={() => handleRatingChange(star)}
      />
    ));
  };

  const getRatingDescription = () => {
    switch(rating) {
      case 1: return "Very Dissatisfied";
      case 2: return "Dissatisfied";
      case 3: return "Neutral";
      case 4: return "Satisfied";
      case 5: return "Very Satisfied";
      default: return "";
    }
  };

  return (
    <>
      <Button color="primary" variant="solid" 
        // fullWidth 
        onPress={() => setIsOpen(true)} className="bg-[#540045] text-white hover:bg-[#6a0057] w-fit"
      >
        Review Order
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="lg" placement="center" backdrop="blur" className='dark:bg-gray-700'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-[#540045] dark:text-white">
                  Review Your Order
                </h2>
                <p className="text-sm text-gray-500 dark:text-white">
                  Share your experience with Order #{order.Order_id}
                </p>
              </ModalHeader>
              
              <ModalBody>
                {/* Star Rating Section */}
                <div className="flex flex-col items-center space-y-4">
                  <h3 className="text-lg font-semibold">Overall Experience</h3>
                  <div className="flex space-x-2">
                    {renderStars()}
                  </div>
                  {rating > 0 && (
                    <p className="text-sm text-gray-600 dark:text-white">
                      {getRatingDescription()}
                    </p>
                  )}
                </div>

                {/* Review Text Area */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Share Your Thoughts
                  </label>
                  <Textarea placeholder="Write your review here (optional)" minRows={3} value={orderReviews[order.Order_id]?.text || ''}
                    onValueChange={(text) => onReviewTextChange(order.Order_id, text)}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    Add Photos (Optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    <Button color="secondary" variant="bordered" startContent={<Upload />} className='dark:text-white' >
                      <input type="file" multiple accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer " onChange={(e) => onImageUpload(order.Order_id, e)}/>
                      Upload Images
                    </Button>
                  </div>
                  
                  {/* Image Preview */}
                  {orderReviewImages[order.Order_id] && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {Array.from(orderReviewImages[order.Order_id]).map((file, index) => (
                        <div key={index} className="relative">
                          <img src={URL.createObjectURL(file)} alt={`Preview ${index}`} className="object-cover w-20 h-20 rounded-lg"/>
                          <Button isIconOnly size="sm" color="danger" variant="solid" className="absolute rounded-full -top-2 -right-2" onPress={() => removeImage(index)} >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ModalBody>
              
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSubmit} disabled={submitting || rating === 0} className="bg-[#540045] text-white hover:bg-[#6a0057]"
                >
                  {submitting ? 'Submitting...' : 'Submit Review'}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default OrderReviewModal;