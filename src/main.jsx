import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { DarkModeProvider } from './shared/services/DarkMode/DarkModeContext.jsx';
import { SidebarProvider } from './Router/SidebarProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <DarkModeProvider>
      <SidebarProvider>
      <GoogleOAuthProvider clientId="487802395249-ued587ou52mb0gl4o1n55a7brjs66dh3.apps.googleusercontent.com">
        <App/>
      </GoogleOAuthProvider>
      </SidebarProvider>
    </DarkModeProvider>
  </React.StrictMode>
)
