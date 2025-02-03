import { Toaster } from 'react-hot-toast';
import Approuter from './Router/Approuter';
// import LocationModal from './shared/Components/LocationPopup/LocationPopupModel';
import useAuth from './shared/services/store/useAuth';

function App() {
  const { userdetails } = useAuth();

  return (
    <>
      <Approuter />
      {/* <LocationModal/> */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* {userdetails?.Role !== 'Admin' && (
        <div className="fixed z-50 lg:bottom-8 right-3 bottom-20">
          <a
            href="https://wa.me/+19165074320?text=Hello%20Kiranaa%20Bazaar,%20I%20want%20to%20enquire%20about%20your%20services"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/whatsapp3.png"
              alt="WhatsApp"
              className="object-cover w-12 h-12 lg:w-20 lg:h-20"
            />
          </a>
        </div>
      )} */}
    </>
  );
}

export default App;
