import { useCallback, useEffect, useState } from 'react'
import Setting from '../../shared/Components/Settings/Setting'
import useAuth from '../../shared/services/store/useAuth';
import toast from 'react-hot-toast';
import { apigetallShipping, updateShipping } from '../../shared/services/apishipping/apishipping';
import { apigetallCustomers, updateCustomers } from '../../shared/services/APIOrder/apiorder';

function SettingPage() {

    const { userdetails } = useAuth();
    const [reason, setReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    // const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({});
    const [firstName, setFirstName] = useState(user?.First_Name || '');
    const [lastName, setLastName] = useState(user?.Last_Name || '');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState({});
    const [addresss, setFirstAddress] = useState(address?.Address || '');
    const [isEditAddress, setIsEditAddress] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    let isMounted = true;
    const getShippingDetails = useCallback(async () => {
        try {
            const response = await apigetallShipping({});
            if (response?.[0]) {
                setAddress(response[0]);
                setFirstAddress(response[0].Address || '');
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




    const handleEditClick = () => {
        setIsEditing(true); // Enable editing when the edit icon is clicked
    };

    const handleSaveChanges = async () => {
        try {
            setLoading(true);
            await handleUpdate();
            setIsEditing(false); // Disable editing after saving changes
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await updateCustomers({ Email: user.Email, First_Name: firstName, Last_Name: lastName });
            await getallcustomers();
            toast.success('Profile Updated Successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            throw new Error('Failed to update profile');
        }
    };




    const handleEditAddress = () => {
        setIsEditAddress(true); // Enable editing when the edit icon is clicked
    };

    const handleSaveChangeAddress = async () => {
        try {
            setIsLoading(true);
            await handleUpdateAddress();
            setIsEditAddress(false); // Disable editing after saving changes
        } catch (error) {
            console.error('Error updating Address:', error);
            toast.error('Failed to update Address');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateAddress = async () => {
        try {
            const res = await updateShipping({ _id: address._id, Address: addresss });
            await getShippingDetails(); // Refresh after update
            toast.success('Address Updated Successfully');
        } catch (error) {
            console.error('Error updating Address:', error);
            throw new Error('Failed to update Address');
        }
    };


    return (
        <>
            <section>
                <Setting reason={reason} setLastName={setLastName} handleEditAddress={handleEditAddress} handleSaveChangeAddress={handleSaveChangeAddress} isLoading={isLoading} isEditAddress={isEditAddress} setFirstAddress={setFirstAddress} handleEditClick={handleEditClick} handleSaveChanges={handleSaveChanges} loading={loading} setFirstName={setFirstName} error={error} user={user} getallcustomers={getallcustomers} customReason={customReason} setIsEditing={setIsEditing}
                    isEditing={isEditing} modalOpen={modalOpen} name={name} mobileNumber={mobileNumber} code={code} err={err} address={address} password={password} handleSaveClick={handleSaveClick}
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
