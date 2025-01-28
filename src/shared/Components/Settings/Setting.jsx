import { Link } from 'react-router-dom';
import { Settings, User, Mail, Phone, Shield, Check } from 'lucide-react';

function Setting(props) {
    const { user } = props;

    const getGuestDisplayInfo = () => {
        if (user?.Role === 'Guest') {
            return {
                name: 'Guest',
                profileBg: 'from-yellow-500 to-yellow-600',
                verificationStatus: 'Guest Account'
            };
        }
        return {
            name: user?.First_Name || '',
            profileBg: 'from-orange-500 to-orange-600',
            verificationStatus: null
        };
    };

    const { name: displayName, profileBg, verificationStatus } = getGuestDisplayInfo();

    return (
        <div className="dark:bg-black">
            <div className="container max-w-4xl px-4 py-12 mx-auto">
                {/* Header */}
                <div className="flex items-center mb-10 space-x-4">
                    <Link 
                        to='/profile' 
                        className="p-2 transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 md:hidden"
                    >
                        <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </Link>
                    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#38031D] to-[#4e072a] dark:text-white">
                        Account Settings
                    </h1>
                </div>

                {/* Profile Card */}
                <div className="relative overflow-hidden transition-colors duration-300 bg-white shadow-xl rounded-2xl dark:bg-gray-700">
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 opacity-10"></div>

                    <div className="relative z-10 flex flex-col items-center px-6 pt-12 pb-8 md:flex-row md:space-x-8">
                        <div
                            className={`flex items-center justify-center w-32 h-32 mb-6 md:mb-0 text-5xl font-bold text-white rounded-full bg-gradient-to-r ${profileBg} shadow-lg`}
                        >
                            {displayName?.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h2 className="flex items-center justify-center text-2xl font-bold text-gray-800 transition-colors duration-300 dark:text-gray-100 md:justify-start">
                                <User className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
                                {displayName}
                            </h2>

                            <div className="mt-4 space-y-2">
                                <p className="flex items-center justify-center text-gray-600 transition-colors duration-300 dark:text-gray-200 md:justify-start">
                                    <Mail className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-300" />
                                    {user?.Email || 'No email provided'}
                                </p>
                                <p className="flex items-center justify-center text-gray-600 transition-colors duration-300 dark:text-gray-200 md:justify-start">
                                    <Phone className="w-5 h-5 mr-2 text-green-500 dark:text-green-300" />
                                    {user?.Mobilenumber || 'No phone number'}
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-2 mt-4 md:justify-start">
                                {verificationStatus ? (
                                    <span className="flex items-center px-3 py-1 text-sm font-medium text-yellow-800 transition-colors duration-300 bg-yellow-100 rounded-full dark:bg-yellow-700 dark:text-yellow-200">
                                        <Shield className="w-4 h-4 mr-1" />
                                        {verificationStatus}
                                    </span>
                                ) : (
                                    <>
                                        <span className="flex items-center px-3 py-1 text-sm font-medium text-green-800 transition-colors duration-300 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-600">
                                            <Check className="w-4 h-4 mr-1" />
                                            Phone Verified
                                        </span>
                                        <span className="flex items-center px-3 py-1 text-sm font-medium text-green-800 transition-colors duration-300 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-600">
                                            <Check className="w-4 h-4 mr-1" />
                                            Email Verified
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;