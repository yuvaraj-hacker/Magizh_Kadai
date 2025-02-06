import React, { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();

export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
    const [sideOpen, setSideOpen] = useState(false);

    const toggleSidebar = () => {
        setSideOpen(prev => !prev);
    };

    return (
        <SidebarContext.Provider value={{ sideOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};
