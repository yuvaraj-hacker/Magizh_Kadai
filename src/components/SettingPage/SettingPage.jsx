import { useCallback, useEffect, useState } from 'react'
import Setting from '../../shared/Components/Settings/Setting'
import useAuth from '../../shared/services/store/useAuth';
import toast from 'react-hot-toast';
import { apigetallShipping } from '../../shared/services/apishipping/apishipping';
import { apigetallCustomers } from '../../shared/services/APIOrder/apiorder';

function SettingPage() {

    const { userdetails } = useAuth();
    const [reason, setReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [address, setAddress] = useState({});
    const [user, setUser] = useState({});
    let isMounted = true;
    const getShippingDetails = useCallback(async () => {
        try {
            const response = await apigetallShipping({});
            if (response?.[0]) {
                setAddress(response[0]);
            }
        } catch (error) {
            console.error("Error fetching shipping details:", error);
            toast.error("Failed to fetch shipping details");
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            getShippingDetails();
        }
        return () => (isMounted = false);
    }, [getShippingDetails]);


    // const getallcustomers = useCallback(async () => {
    //     try {
    //         const params = userdetails?.Email
    //         const response = await apigetallCustomers(params);
    //         if (response?.resdata[0]) {
    //             setUser(response.resdata[0]);
    //         }
    //     } catch (error) {
    //         console.error("Error fetching user details:", error);
    //         toast.error("Failed to fetch user details");
    //     }
    // }, []);

    // useEffect(() => {
    //     if (isMounted) {
    //         getallcustomers();
    //     }
    //     return () => (isMounted = false);
    // }, [getallcustomers]);
    const getallcustomers = useCallback(async () => {
        try {
            const response = await apigetallCustomers({ email: userdetails?.Email });
            console.log(response)
            setUser(response.resdata[0]);
          
        } catch (error) {
            console.error("Error fetching user emails:", error);
            // toast.error("Failed to fetch user emails");
        }
    }, [userdetails]);

    useEffect(() => {
        if (isMounted) {
            getallcustomers();
        }
        return () => (isMounted = false);
    }, [getallcustomers]);


    const handleReasonChange = (e) => {
        setReason(e.target.value);
    };
    const handleCustomReasonChange = (e) => {
        setCustomReason(e.target.value);
    };
    const [modalOpen, setModalOpen] = useState(null);
    const [name, setName] = useState({});
    const handleNameChange = (e) => {
        setName({ ...name, fullName: e.target.value });
    };
    const saveName = (e) => {
        e.preventDefault();
        closeModal();
    };
    const openModal = (modalType) => setModalOpen(modalType);
    const closeModal = () => setModalOpen(null);
    const [mobileNumber, setMobileNumber] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState({ mobile: '', code: '' });
    const handleMobileChange = (e) => {
        setMobileNumber(e.target.value);
        if (e.target.value.trim() !== '') {
            setError((prev) => ({ ...prev, mobile: '' }));
        }
    };
    const handleCodeChange = (e) => {
        setCode(e.target.value);
        if (e.target.value.trim() !== '') {
            setError((prev) => ({ ...prev, code: '' }));
        }
    };
    const handleSaveClick = () => {
        setIsEditing(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Form Submitted', address);
            closeModal();
        } else {
            console.log('Form validation failed');
        }
    };
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };
    const validateForm = () => {
        return address.FirstName && address.LastName && address.mobileNumber;
    };
    const [password, setPassword] = useState({ newPassword: '', confirmPassword: '' });
    const [err, setErr] = useState('');
    const handlePasswordChange = (e) => {
        const { placeholder, value } = e.target;
        setPassword((prev) => ({
            ...prev,
            [placeholder === 'New Password' ? 'newPassword' : 'confirmPassword']: value,
        }));
    };
    const savePassword = (e) => {
        e.preventDefault();
        setErr('');
        closeModal();
    };
    return (
        <>
            <section>
                <Setting reason={reason}
                    error={error}
                    user={user}
                    customReason={customReason}
                    setIsEditing={setIsEditing}
                    isEditing={isEditing}
                    modalOpen={modalOpen}
                    name={name}
                    mobileNumber={mobileNumber}
                    code={code}
                    err={err}
                    address={address}
                    password={password}
                    handleSaveClick={handleSaveClick}
                    handleNameChange={handleNameChange}
                    handleCustomReasonChange={handleCustomReasonChange}
                    handleReasonChange={handleReasonChange}
                    saveName={saveName}
                    handleMobileChange={handleMobileChange}
                    openModal={openModal}
                    closeModal={closeModal}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    validateForm={validateForm}
                    savePassword={savePassword}
                    handleCodeChange={handleCodeChange}
                    handlePasswordChange={handlePasswordChange}
                    userdetails={userdetails} />
            </section>
        </>
    )
}
export default SettingPage
