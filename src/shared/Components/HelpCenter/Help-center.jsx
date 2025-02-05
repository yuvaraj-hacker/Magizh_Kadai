import { useState } from 'react';
import useAuth from '../../services/store/useAuth';
import Faqsection from './FAQ-section';
import toast from 'react-hot-toast';
import { apisavefeedback } from '../../services/apiFeedback/apifeedback';

export default function HelpCenter() {
  const { isLoggedIn, userdetails } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFeedbackType, setSelectedFeedbackType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedbackTypeChange = (e) => {
    const feedbackType = e.target.value;
    if (feedbackType) {
      setSelectedFeedbackType(feedbackType);
      setIsFormOpen(true);
    }
  };

  const renderFeedbackForm = () => {
    const formTitles = {
      General: 'General',
      'Website & Technical': 'Website & Technical',
      'Order & Items': 'Order & Items',
    };

    const handleSaveFeedback = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const formData = {
        Name: e.target.elements.name.value,
        Email: e.target.elements.email.value,
        Message: e.target.elements.message.value,
        FeedbackType: selectedFeedbackType,
      };

      try {
        const response = await apisavefeedback(formData);
        if (response && response.status === 'Feedback Successfully Send') {
          toast.success('Feedback submitted successfully!');
          setIsFormOpen(false);
        } else {
          toast.error('Failed to submit feedback. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        toast.error('An error occurred. Please try again later.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50" onClick={() => setIsFormOpen(false)}>
        <div className="relative w-full max-w-md p-6 space-y-6 bg-white rounded-lg shadow-xl dark:bg-gray-600" onClick={(e) => e.stopPropagation()} >
          <button onClick={() => setIsFormOpen(false)} className="absolute text-gray-500 top-4 right-4 hover:text-gray-700 focus:outline-none dark:text-white" aria-label="Close feedback form">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>

          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {formTitles[selectedFeedbackType]}
          </h2>
          <form className="space-y-4" onSubmit={handleSaveFeedback}>
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white" >Name</label>
              <input type="text" id="name" name="name"
                defaultValue={
                  isLoggedIn
                    ? `${userdetails.First_Name} ${userdetails.Last_Name}`
                    : ''
                }
                readOnly={isLoggedIn}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" name="email" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Email</label>
              <input type="email" id="email" defaultValue={isLoggedIn ? userdetails.Email : ''} readOnly={isLoggedIn}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-500 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="message" name="message" className="block mb-1 text-sm font-medium text-gray-700 dark:text-white">Message</label>
              <textarea id="message" rows={4} required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-500 dark:text-white"
              ></textarea>
            </div>
            <button type="submit" disabled={isSubmitting}
              className={`w-full px-4 py-2 text-white transition-colors bg-${
                isSubmitting ? 'gray-500' : '[#CA2E43]'
              } rounded-md focus:outline-none focus:ring-2`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className='dark:bg-black md:py-10 py-5'>
      <div className="max-w-[80rem] mx-auto  px-3">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="p-6 bg-white border shadow-md dark:shadow-slate-600 dark:border-gray-500 dark:bg-gray-600 rounded-xl">
            <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Customer Service
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@magizhkadai.com</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3 text-gray-600 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 916-507-4320</span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-white">
                Support Hours: Mon-Fri, 10 AM - 9 PM EST
              </p>
            </div>
          </div>

          <div className="p-6 bg-white border shadow-md dark:bg-gray-600 dark:shadow-slate-600 dark:border-gray-500 rounded-xl">
            <h2 className="flex items-center mb-4 text-xl font-semibold text-gray-800 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              Feedback
            </h2>
            <select onChange={handleFeedbackTypeChange} className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" >
              <option value="">Select Feedback Type</option>
              <option value="General">General</option>
              <option value="Website & Technical">Website & Technical</option>
              <option value="Order & Items">Order & Items</option>
            </select>
            {isFormOpen && renderFeedbackForm()}
          </div>
        </div>
        <div className="pt-5">
          <Faqsection />
        </div>
      </div>
    </div>
  );
}
