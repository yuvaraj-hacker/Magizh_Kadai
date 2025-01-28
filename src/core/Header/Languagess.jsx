import { useEffect, useRef, useState } from 'react'
import DeliveryDate from '../../shared/Components/Header/DeliveryDate';
import LocationModal from '../../shared/Components/LocationPopup/LocationPopupModel';


const getWeekDates = (startDate) => {
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        weekDates.push(date);
    }
    return weekDates;
};

export default function Languagess() {
    const [Toggle, setToggle] = useState(false);
    // const [togsearch, setTogsearch] = useState(false);
    const [currentLang, setCurrentLang] = useState('English');
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const [datevisible, setDatevisible] = useState(false);

    const [translateInitialized, setTranslateInitialized] = useState(false);

    const [location, setLocation] = useState(localStorage.getItem('selectedLocation') || '');
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const today = new Date(); // for date
    const thisWeekDates = getWeekDates(today);
    const nextWeekStartDate = new Date(today);
    nextWeekStartDate.setDate(today.getDate() + 7);
    const nextWeekDates = getWeekDates(nextWeekStartDate);
    const storedDate = localStorage.getItem('selectedDate');
    const [selectedDate, setSelectedDate] = useState(storedDate ? new Date(storedDate) : today);

    const userDropdownRef = useRef(null);
    const langDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setShowUserDropdown(false);
            }
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
                setShowLangDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close dropdowns on route change
    useEffect(() => {
        setShowUserDropdown(false);
        setShowLangDropdown(false);
    }, [location]);

    useEffect(() => {
        // Check if location is set; if not, open the modal
        if (!location) {
            setIsLocationModalOpen(true);
        }
    }, [location]);

    const languages = [
        { name: 'English', code: 'en' },
        { name: 'Spanish', code: 'es' },
        { name: 'French', code: 'fr' },
        { name: 'German', code: 'de' },
        { name: 'Hindi', code: 'hi' },
        { name: 'Arabic', code: 'ar' },
        { name: 'Tamil', code: 'ta' },

    ];

  
    const handleLocationChange = (newLocation) => {
        setLocation(newLocation);
    };

    useEffect(() => {
        // Wait for Google Translate to initialize
        const checkTranslateInit = setInterval(() => {
            if (window.google?.translate?.TranslateElement) {
                setTranslateInitialized(true);
                clearInterval(checkTranslateInit);
            }
        }, 100);

        return () => clearInterval(checkTranslateInit);
    }, []);

    const handleLanguageClick = (lang) => {
        setCurrentLang(lang.name);
        setShowLangDropdown(false);

        if (translateInitialized) {
            const select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = lang.code;
                select.dispatchEvent(new Event('change'));
            }
        }
    };

  

    useEffect(() => {
        if (selectedDate) {
            localStorage.setItem('selectedDate', selectedDate);
        }
    }, [selectedDate]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const isSelected = (date) => {
        return selectedDate.toDateString() === date.toDateString();
    };
   
    return (
        <>
            <div className={`${Toggle ? ' ' : 'lg:hidden block '}  text-white lg:bg-transparent  z-50 lg:hover:*:bg-transparent  flex-nowrap gap-4   items-center  top-16 w-full flex   lg:text-white font-medium lg:static absolute   px-2 bg-primary  lg:p-0 *:py-1 lg:*:py-0 lg:border-none`}>
                <div className='relative' ref={langDropdownRef}>
                    <div
                        className='relative inline-flex items-center gap-1 text-xs cursor-pointer whitespace-nowrap'
                        onClick={() => setShowLangDropdown(!showLangDropdown)}  >
                        <i className="pt-1 fi fi-ss-language"></i>
                        {currentLang}
                        <i className="pt-1 fi fi-bs-angle-small-down"></i>
                    </div>

                    {showLangDropdown && (
                        <div className='absolute left-0 z-50 text-sm bg-white rounded-lg shadow-lg top-full'>
                            {languages.map((lang) => (
                                <div key={lang.code} className='px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-100' onClick={() => handleLanguageClick(lang)} >
                                    {lang.name}
                                </div>
                            ))}
                        </div>
                    )}

                    <div id="google_translate_element" className="hidden"></div>
                </div>

                <div className='relative inline-flex items-center gap-1 text-xs cursor-pointer whitespace-nowrap' onClick={() => setIsLocationModalOpen(true)}>
                    <i className="fi fi-sr-marker"></i>{location || 'No location selected'}
                </div>
                <div onClick={() => setDatevisible(true)} className='inline-flex items-center w-full gap-1 text-xs cursor-pointer whitespace-nowrap'>
                    <i className="fi fi-sr-calendar-lines"></i>{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </div>
            </div>
            <DeliveryDate datevisible={datevisible} setDatevisible={setDatevisible} thisWeekDates={thisWeekDates} handleDateClick={handleDateClick} isSelected={isSelected} nextWeekDates={nextWeekDates} />

            <LocationModal isOpen={isLocationModalOpen} setIsOpen={() => setIsLocationModalOpen(false)} onLocationChange={handleLocationChange} />
        </>
    )
}
