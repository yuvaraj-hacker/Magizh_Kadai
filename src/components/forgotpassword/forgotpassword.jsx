import { useState } from 'react'
import Forgotpasswordform from '../../shared/Components/forms/forgotpasswordform'
import { apisendotpforgotpassword, apiupdatepassword, apiverifyotpforgotpassword } from '../../shared/services/apiauthentication/apiregister';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Otpform from '../../shared/Components/forms/Otpform';
import Changepasswordform from '../../shared/Components/forms/changepasswordform';

const Forgotpassword = () => {
    const [formdata, setFormdata] = useState({});
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(''); 
    const navigate = useNavigate();

    const handlechange = (e) => setFormdata({ ...formdata, [e.target.name]: e.target.value });
    const handleOtpChange = (e) => setOtp({...otp,[e.target.name]: e.target.value});
  
    const handleregister = async (e) => {
        e.preventDefault();

        const res = await apisendotpforgotpassword(formdata);
        console.log(res);
        if (res.status === "OTP Sent") {
            toast.success(res.status);
            setOtpSent('OTP form');
        } else if (res.status === "Email not exists") {
            toast.error(res.status);
        } else {
            toast.error("Try again later!");
        }
    };

    const userregister = async (e) => {
        e.preventDefault();
        var res = await apiverifyotpforgotpassword({ Email: formdata.Email, OTP: `${otp['otp1']}${otp['otp2']}${otp['otp3']}${otp['otp4']}` });
        console.log(res)
        if (res.status === "Sucessfully otp verified") {
            toast.success(res.status);
            setOtpSent('Password form');
        } else {
            toast.error("Invalid OTP");
        }
    };
     
    const updatepassword = async (e)=>{
        e.preventDefault();
      const res = await apiupdatepassword(formdata)
      if (res.status === "Sucessfully Password changed") {
        toast.success(res.status);
       navigate('/')
    } 
    }


 const Passwordform = ()=>{
    switch(otpSent){
       case 'OTP form':
        return   <Otpform otp={otp} setOtp={setOtp} userregister={userregister} handleOtpChange={handleOtpChange} />
      case 'Password form':  
        return   <Changepasswordform  updatepassword={updatepassword} handlechange={handlechange}/>
     default:
        return    <Forgotpasswordform handlechange={handlechange} handleregister={handleregister} />
    }
 }

    return (
        <div>
            { 
            Passwordform()
             }
        </div>
    )
}

export default Forgotpassword
