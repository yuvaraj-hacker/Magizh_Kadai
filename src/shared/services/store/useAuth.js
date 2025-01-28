import {create} from 'zustand';
const tokenname="Kirana-Bazaar";
const useAuth = create((set) => ({
  isLoggedIn: !!localStorage.getItem(tokenname),
  userdetails: JSON.parse(localStorage.getItem('userDetails')) || null,

  // googleregister: (token) => {
  //   localStorage.setItem(tokenname, token);
  //   const userDetails = JSON.parse(window.atob(token.split('.')[1]));
  //   console.log('Decoded User Details:', userDetails); // Log to check the decoded user details
  //   localStorage.setItem('userDetails', JSON.stringify(userDetails));
  //   set({ isLoggedIn: true, userdetails: userDetails });
  // },

  // register: (token) => {
  //   localStorage.setItem(tokenname, token);
  //   const userDetails = JSON.parse(window.atob(token.split('.')[1]));
  //   console.log('Decoded User Details:', userDetails); // Log to check the decoded user details
  //   localStorage.setItem('userDetails', JSON.stringify(userDetails));
  //   set({ isLoggedIn: true, userdetails: userDetails });
  // },

  loginauth: (token) => {
    localStorage.setItem(tokenname, token);
    const userDetails = JSON.parse(window.atob(token.split('.')[1]));
    //console.log('Decoded User Details:', userDetails);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    set({ isLoggedIn: true, userdetails: userDetails });
  },
  
  login: (token) => {
    localStorage.setItem(tokenname, token);
    set({ isLoggedIn: true, token });
  },
  logout: () => {
    localStorage.removeItem(tokenname);
    localStorage.removeItem('userDetails');
    localStorage.removeItem('TotalCartItems');
    set({ isLoggedIn: false, userdetails: null });
  },

  userDetails: () => {
    const token =  localStorage.getItem(tokenname);
    if (token) {
      return JSON.parse(window.atob(token.split('.')[1]));
    } else {
      return null;
    }
  },
}));


export default useAuth;