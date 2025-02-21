import { useState } from "react";
import useAuth from "../../shared/services/store/useAuth";
import useCart from "../../shared/services/store/useCart";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function HeaderFunction() {

  const [wishlistData, setWishlistData] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate()

  const { logout, userdetails, isLoggedIn } = useAuth();
  const { deleteAllItems } = useCart();
  const [Toggle, setToggle] = useState(false);

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Spanish', code: 'es' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Arabic', code: 'ar' },
    { name: 'Tamil', code: 'ta' },
    { name: 'Telugu', code: 'te' },
    { name: 'Kannada', code: 'ka' },
  ];

  const ScrollToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  const handleLogout = async () => {
    await logout();
    deleteAllItems()
    setWishlistData([]);
    navigate('/');
  };

  const getDisplayLetter = () => {
    if (userdetails?.Role === 'Customer' || 'Admin') {
      return userdetails?.First_Name?.charAt(0).toUpperCase();
    }
  };

  const ToggleFn = () => {
    setToggle(!Toggle)
  }

  const openform = () => {
    if (isLoggedIn) {
      setShowUserDropdown(!showUserDropdown);
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <Header languages={languages} ScrollToTop={ScrollToTop} handleLogout={handleLogout} wishlistData={wishlistData} setWishlistData={setWishlistData} getDisplayLetter={getDisplayLetter} ToggleFn={ToggleFn} openform={openform} visible={visible} setVisible={setVisible} showUserDropdown={showUserDropdown} setShowUserDropdown={setShowUserDropdown} />
    </>
  )
}