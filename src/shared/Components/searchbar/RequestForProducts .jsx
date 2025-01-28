import { useState } from 'react';
import useAuth from '../../services/store/useAuth';
import { Aperture } from 'lucide-react';
import { savesearchquery } from '../../services/apiproducts/apiproduct';
import toast from 'react-hot-toast';
import RegisterContinueGoogle from '../Register-ContiGoogle/RegisterContiGoogle';

const RequestForProducts = ({ searchQuery }) => {
  const { userdetails ,isLoggedIn} = useAuth(); 
 const [visible, setVisible] = useState(false);
  const logSearchQuery = async () => {
    if (!searchQuery) {
      console.error('No search query to log');
      return;
    }
  
    try {
        if (!isLoggedIn) {
            setVisible(true); 
          } else {
      const response = await savesearchquery(searchQuery, userdetails?.Email);
      console.log(response)
      if (response?.Message) {
        toast.success(response.Message);
      }
    }
    } catch (error) {
      console.error('Failed to log search query and email:', error);
    }
  };

  return (
    <div onClick={logSearchQuery} 
      className="flex items-center bg-white border border-[#38031D]/10 rounded-lg lg:p-3 p-1 shadow-sm hover:bg-[#38031D]/5 dark:hover:bg-white transition cursor-pointer">
      <Aperture className="w-5 h-5 mr-3 text-[#38031D]/50" />
      <span className="text-sm text-gray-600">Request For the Products</span>

      <RegisterContinueGoogle visible={visible} setVisible={setVisible} />
    </div>

    
  );
  
};

export default RequestForProducts;
